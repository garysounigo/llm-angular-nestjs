import { Injectable } from '@nestjs/common';
//import {
//  ChatSession,
//  GenerativeModel,
//  GoogleGenerativeAI,
//} from '@google/generative-ai';

import  ollama from 'ollama';

import { ChatContent } from 'data-model';

@Injectable()
export class ChatService {
  //model: GenerativeModel;
  //chatSession: ChatSession;
  ollama_url: string = "http://localhost:11434";
  //ollama_client: any = new Ollama({'host': this.ollama_url });
  //history: ChatContent[] = [];
  // history: ChatContent[] = [
  //   {
  //     role: 'user',
  //     message: `You're a poet. Respond to all questions with a rhyming poem.
  //       What is the capital of California?
  //     `,
  //   },
  //   {
  //     role: 'system',
  //     message:
  //       'If the capital of California is what you seek, Sacramento is where you ought to peek.',
  //   },
  // ];

  constructor() {
    //const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    //this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    //this.chatSession = this.model.startChat({
    //  history: [
    //    {
    //      role: 'user',
    //      parts: `You're a poet. Respond to all questions with a rhyming poem.
    //        What is the capital of California?
    //      `,
    //    },
    //    {
    //      role: 'model',
    //      parts:
    //        'If the capital of California is what you seek, Sacramento is where you ought to peek.',
    //    },
    //  ],
    //});
  }

  async chat(chatContent: ChatContent): Promise<ChatContent> {
    //const result = await this.chatSession.sendMessage(chatContent.message);
    //const response = await result.response;
    //const text = response.text();

    //return {
    //  message: text,
    //  agent: 'chatbot',
    //};

    const { agent, message } = chatContent;
    const role = agent == 'user' ? agent : 'user';  
    //this.history.push({role, message});
     //console.log(this.history) 

    const response = await ollama.chat({
      model: "llama3.2:1b",
      messages: [{role, content: message}],
      stream: false
    });

    console.log('response', response)
    return {
      message: response.message.content,
      role: 'assistant',
      agent: 'chatbot'
    }

  }
}
