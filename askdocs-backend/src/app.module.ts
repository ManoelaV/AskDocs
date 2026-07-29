import { Module } from '@nestjs/common';
import { DocumentsModule } from './modules/documents/documents.module';
import { ChatModule } from './modules/chat/chat.module';
import { VectorStoreModule } from './modules/vector-store/vector-store.module';

@Module({
  imports: [DocumentsModule, ChatModule, VectorStoreModule],
})
export class AppModule {}