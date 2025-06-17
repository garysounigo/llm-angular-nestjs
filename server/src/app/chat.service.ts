import { Injectable } from '@nestjs/common';


import  ollama from 'ollama';
import { Message } from 'ollama';


@Injectable()
export class ChatService {

  history: Message[] = [
    {
      role: 'user',
      content: `You're a poet. Respond to all questions with a rhyming poem.
        What is the capital of California?
      `,
    },
    {
      role: 'system',
      content:
        'If the capital of California is what you seek, Sacramento is where you ought to peek.',
    },
  ];

  constructor() {
  }

  async chat(chatMessage: Message, chatClient: any = ollama): Promise<Message> {

 
    this.history.push(chatMessage);

    const response = await chatClient.chat({
      model: "llama3.2:1b",
      messages: this.history,
      stream: false
    });

    return response.message

  }
}
