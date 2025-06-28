import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,

} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import Multer from 'multer';
import { ChatService } from './chat.service';
import { VisionService } from './vision.service';

@Controller()
export class AppController {
  constructor(
    private readonly chatService: ChatService,
    private readonly visionService: VisionService
  ) { }

  @Post('vision')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { message: string }
  ) {
    return this.visionService.vision(body.message, file);
  }
}