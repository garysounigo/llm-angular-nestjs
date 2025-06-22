import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import Multer from 'multer';


import { ChatService } from './chat.service';

import { Ollama, Message } from 'ollama'

@Controller()
export class AppController {

  ollama_url: string = "http://localhost:11434";
  ollama_client: any = new Ollama({'host': this.ollama_url });
  
  constructor(private readonly chatService: ChatService) {  }

  @Post('chat')
  chat(@Body() chatMessages: Message[]) {
    return this.chatService.chat(chatMessages, this.ollama_client);
  }
  
  // @Post('vision')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: {message: string}) {
  //   return this.visionService.vision(body.message, file);
  // }
}
