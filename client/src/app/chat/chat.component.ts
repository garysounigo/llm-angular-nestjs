import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ollamaService } from '../ollama.service';
import { LineBreakPipe } from '../line-break.pipe';
import { finalize } from 'rxjs';

//import { Message } from 'ollama/browser'
interface Message{
  role: 'user' | 'assistant' | 'system';
  content: string;
}

@Component({
  selector: 'corp-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    LineBreakPipe,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  inputContent: string = '';
  messages: Message[] = [];

  constructor(private ollamaService: ollamaService) {}

  sendMessage(content: string): void {
    const chatMessage: Message = {
      role: 'user',
      content
    };

    this.messages.push(chatMessage);
    
    this.ollamaService.chat(this.messages).pipe()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });
  }

}
