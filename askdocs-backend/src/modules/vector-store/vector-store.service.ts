import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';

@Injectable()
export class VectorStoreService implements OnModuleInit {
  private pinecone: Pinecone;
  private embeddings: OpenAIEmbeddings;
  private indexName: string;

  constructor() {
    this.indexName = process.env.PINECONE_INDEX || 'askdocs';
    
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'text-embedding-3-small',
    });
  }

  async onModuleInit() {
    await this.ensureIndexExists();
  }

  private async ensureIndexExists() {
    try {
      const indexes = await this.pinecone.listIndexes();
      const indexExists = indexes.indexes?.some(idx => idx.name === this.indexName);
      
      if (!indexExists) {
        console.log(`Criando índice Pinecone: ${this.indexName}`);
        await this.pinecone.createIndex({
          name: this.indexName,
          dimension: 1536, // Dimensão do text-embedding-3-small
          metric: 'cosine',
          spec: {
            serverless: {
              cloud: 'aws',
              region: 'us-east-1',
            },
          },
        });
        
        // Aguarda alguns segundos para o índice ser criado
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log(`✅ Índice ${this.indexName} criado com sucesso!`);
      } else {
        console.log(`✅ Índice ${this.indexName} já existe`);
      }
    } catch (error) {
      console.error('Erro ao verificar/criar índice:', error);
    }
  }

  async upsertChunks(chunks: string[], metadata: any) {
    const index = this.pinecone.index(this.indexName);
    
    const vectors = await Promise.all(
      chunks.map(async (text, i) => {
        const embedding = await this.embeddings.embedQuery(text);
        return {
          id: `${metadata.fileId}-${i}`,
          values: embedding,
          metadata: {
            text,
            fileName: metadata.fileName,
            chunkIndex: i,
            fileId: metadata.fileId,
          },
        };
      })
    );

    await index.upsert(vectors);
    return { upsertedCount: vectors.length };
  }

  async search(query: string, topK = 3) {
    const index = this.pinecone.index(this.indexName);
    const queryEmbedding = await this.embeddings.embedQuery(query);
    
    const result = await index.query({
      vector: queryEmbedding,
      topK,
      includeMetadata: true,
    });

    return result.matches?.map(match => ({
      text: match.metadata?.text as string,
      score: match.score,
      fileName: match.metadata?.fileName as string,
    })) || [];
  }

  async deleteByFileId(fileId: string) {
    const index = this.pinecone.index(this.indexName);
    
    // Busca todos os vetores com o fileId e deleta
    const queryEmbedding = await this.embeddings.embedQuery('test');
    const result = await index.query({
      vector: queryEmbedding,
      topK: 100,
      includeMetadata: true,
      filter: { fileId: { $eq: fileId } },
    });

    const idsToDelete = result.matches?.map(match => match.id) || [];
    
    if (idsToDelete.length > 0) {
      await index.deleteMany(idsToDelete);
    }

    return { deletedCount: idsToDelete.length };
  }
}