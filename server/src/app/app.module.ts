import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { ChatService } from './chat.service';
import { TextService } from './text.service';
import { VisionService } from './vision.service';
import ollama from 'ollama';
import { ChatController } from './chat.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, ChatController],
  providers: [
    ChatService,
    TextService,
    VisionService,
    {
      provide: 'OLLAMA_CLIENT',
      useValue: ollama,
    },
  ],
})
export class AppModule { }