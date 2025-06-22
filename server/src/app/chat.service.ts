import { Injectable } from '@nestjs/common';

import  ollama from 'ollama';
import { Message } from 'ollama';


@Injectable()
export class ChatService {

  constructor() {}

  async chat(chatMessages: Message[], chatClient: any = ollama): Promise<Message> {

    const response = await chatClient.chat({
      model: "llama3.2:1b",
      messages: chatMessages,
      stream: false
    });

    return response.message

  }
}
