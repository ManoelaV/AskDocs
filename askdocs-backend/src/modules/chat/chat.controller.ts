import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async askQuestion(@Body('question') question: string) {
    if (!question) {
      throw new Error('Pergunta é obrigatória');
    }

    const answer = await this.chatService.ask(question);
    
    return {
      question,
      answer,
      timestamp: new Date().toISOString(),
    };
  }
}