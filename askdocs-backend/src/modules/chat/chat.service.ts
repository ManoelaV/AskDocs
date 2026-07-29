import { Injectable } from '@nestjs/common';
import { VectorStoreService } from '../vector-store/vector-store.service';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor(private vectorStore: VectorStoreService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async ask(question: string): Promise<string> {
    try {
      // 1. Busca semântica (RAG - Retrieval)
      const retrievedDocs = await this.vectorStore.search(question, 3);
      
      if (retrievedDocs.length === 0) {
        return 'Desculpe, não encontrei informações relevantes nos documentos para responder sua pergunta.';
      }

      // 2. Otimização do Prompt (Augmented)
      const context = retrievedDocs.map(doc => doc.text).join('\n---\n');
      const systemPrompt = `
        Você é um assistente útil e preciso. Responda a pergunta usando APENAS o contexto abaixo.
        Se a resposta não estiver no contexto, diga que não sabe.
        Seja objetivo e direto.
        
        Contexto:
        ${context}
      `;

      // 3. Geração (Generation)
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.3, // Deixa a resposta mais objetiva
        max_tokens: 500,
      });

      return response.choices[0]?.message?.content || 'Desculpe, não consegui gerar uma resposta.';
    } catch (error) {
      console.error('Erro no ChatService:', error);
      throw new Error('Erro ao processar sua pergunta. Tente novamente.');
    }
  }
}