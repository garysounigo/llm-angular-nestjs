import { Component, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LineBreakPipe } from '../line-break.pipe';
import { ChatService } from '../chat.service';

export interface ChatMessage {
  input: string;
  response?: string;
  submitted: boolean;
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
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnDestroy {
  chats: ChatMessage[] = [{ input: '', submitted: false }];

  constructor(private chatService: ChatService, private zone: NgZone) { }

  ngOnDestroy() {
    this.chatService.disconnect();
  }

  async send(chat: ChatMessage) {
    chat.submitted = true;

    const messageId = await this.chatService.sendMessage(chat.input);
    this.chatService.connect((msg) => {
      this.zone.run(() => {
        if (!chat.response) chat.response = '';
        chat.response += msg;
      });
    }, messageId);

    // Add next input
    this.chats.push({ input: '', submitted: false });
  }
}