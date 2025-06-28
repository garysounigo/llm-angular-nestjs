import { Controller, Post, Sse, Body, Query } from '@nestjs/common';
import { Observable, concat, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatService } from './chat.service';
import { v4 as uuidv4 } from 'uuid';

interface ChatRequest {
    message: string;
}

interface MessageEvent {
    data: string;
}

interface Message {
    id: string;
    content: string;
}

@Controller('chat')
export class ChatController {
    private messages: Message[] = [];
    constructor(private readonly chatService: ChatService) { }

    @Post()
    receiveMessage(@Body() body: ChatRequest) {
        const messageId = uuidv4();
        const message = {
            id: messageId,
            content: body.message,
        };
        this.messages.push(message);
        return { messageId };
    }

    @Sse('stream')
    streamChat(@Query('messageId') messageId: string): Observable<MessageEvent> {
        const stream = this.chatService.streamOllama(
            this.messages.find((message) => message.id === messageId).content
        );
        return concat(
            from(stream).pipe(map((chunk) => ({ data: chunk } as MessageEvent))),
            of({ data: '[DONE]' } as MessageEvent)
        );
    }
}