import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpCode,
  Header,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import Multer from 'multer';

import { ChatService } from './chat.service';

import { Message } from 'ollama';
import { VisionService } from './vision.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly chatService: ChatService,
    private readonly visionService: VisionService
  ) { }

  /*@Post('chat')
  chat(@Body() chatMessages: Message[]) {
    return this.chatService.chat(chatMessages);
  }*/

  @Post('vision')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { message: string }
  ) {
    return this.visionService.vision(body.message, file);
  }
}