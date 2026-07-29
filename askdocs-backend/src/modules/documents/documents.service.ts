import { Injectable, BadRequestException } from '@nestjs/common';
import { VectorStoreService } from '../vector-store/vector-store.service';
import * as pdf from 'pdf-parse';
import * as fs from 'fs';

interface ChunkResult {
  chunks: string[];
  fileId: string;
  fileName: string;
}

@Injectable()
export class DocumentsService {
  constructor(private vectorStore: VectorStoreService) {}

  async processFile(file: Express.Multer.File): Promise<ChunkResult> {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const fileName = file.originalname;
    
    let text: string;

    // Extrai texto baseado na extensão
    if (fileName.endsWith('.pdf')) {
      text = await this.extractTextFromPdf(file.buffer);
    } else if (fileName.endsWith('.txt')) {
      text = file.buffer.toString('utf-8');
    } else {
      throw new BadRequestException('Formato de arquivo não suportado. Use .pdf ou .txt');
    }

    // Divide em chunks de 500 caracteres
    const chunks = this.chunkText(text, 500);

    return {
      chunks,
      fileId,
      fileName,
    };
  }

  async ingestDocument(chunks: string[], fileId: string, fileName: string) {
    const metadata = {
      fileId,
      fileName,
      uploadedAt: new Date().toISOString(),
    };

    const result = await this.vectorStore.upsertChunks(chunks, metadata);
    
    return {
      message: 'Documento processado com sucesso',
      fileId,
      fileName,
      chunksCount: chunks.length,
      vectorsUpserted: result.upsertedCount,
    };
  }

  private async extractTextFromPdf(buffer: Buffer): Promise<string> {
    try {
      const data = await pdf(buffer);
      return data.text;
    } catch (error) {
      throw new BadRequestException('Erro ao extrair texto do PDF');
    }
  }

  private chunkText(text: string, chunkSize: number): string[] {
    const chunks: string[] = [];
    const words = text.split(/\s+/);
    
    let currentChunk = '';
    
    for (const word of words) {
      if ((currentChunk + ' ' + word).trim().length <= chunkSize) {
        currentChunk = (currentChunk + ' ' + word).trim();
      } else {
        if (currentChunk) {
          chunks.push(currentChunk);
        }
        currentChunk = word;
      }
    }
    
    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  }
}