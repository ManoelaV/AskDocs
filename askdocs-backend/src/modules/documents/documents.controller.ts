import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    // Processa o arquivo (extrai texto e cria chunks)
    const { chunks, fileId, fileName } = await this.documentsService.processFile(file);

    // Salva no Pinecone
    const result = await this.documentsService.ingestDocument(chunks, fileId, fileName);

    return result;
  }

  @Post('ingest-external')
  async ingestExternal(@UploadedFile() file: Express.Multer.File) {
    // Endpoint para o n8n enviar dados externos
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    const { chunks, fileId, fileName } = await this.documentsService.processFile(file);
    const result = await this.documentsService.ingestDocument(chunks, fileId, fileName);

    return result;
  }
}