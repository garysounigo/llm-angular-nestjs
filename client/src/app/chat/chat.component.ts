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

  loading: boolean[] = [false,false];
  loading_index = 1;

  constructor(private ollamaService: ollamaService) {}

  sendMessage(content: string): void {
    this.loading[this.loading_index] = true;
    const chatMessage: Message = {
      role: 'user',
      content
    };

    //stock message that we will pass to the chat 
    var messages = this.messages.push(chatMessage);

    //add an empty message: for mimicking the server start to responding
    this.messages.push({
      role: 'assistant',
      content: ''
    })
     
    //reset inputContent
    this.inputContent = '';

    //call ollama chat  
    this.ollamaService.chat(this.messages).pipe(
      finalize(() => {
        this.loading[this.loading_index] = false;
        this.loading.push(false);
        this.loading_index += 2
      }))
      .subscribe((message: Message) => {
        //this.messages.push(message);
        //dont push the reponse, but replace it at the place of the empty message; so the last elements of message
        this.messages.splice(-1,1,message); //remplace a partir de -1, 1 valeur, que l'on remplace par message

      });
  }

}
