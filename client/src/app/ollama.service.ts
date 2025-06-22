import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//import { Message } from 'ollama/browser'

interface Message{
  role: 'user' | 'assistant' | 'system';
  content: string;
}
@Injectable({
  providedIn: 'root',
})
export class ollamaService {
  constructor(private httpClient: HttpClient) { }

  chat(chatMessages: Message[]): Observable<Message> {
    return this.httpClient.post<Message>('http://localhost:3000/api/chat', chatMessages);
  }

  
}
