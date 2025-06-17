import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientChatContent } from './client-chat-content';

import { Message } from 'ollama/browser'

@Injectable({
  providedIn: 'root',
})
export class ollamaService {
  constructor(private httpClient: HttpClient) { }

  chat(chatMessage: Message): Observable<Message> {
    return this.httpClient.post<Message>('http://localhost:3000/api/chat', chatMessage);
  }

  
}
