import { Injectable } from '@nestjs/common';
import ollama from 'ollama';
import { join } from 'path';
import { Worker } from 'worker_threads';

@Injectable()
export class ChatService {
  async *streamOllama(message: string): AsyncGenerator<string> {
    const responseStream = await ollama.chat({
      model: 'llama3.2:1b',
      messages: [{ role: 'user', content: message }],
      stream: true,
    });

    // `responseStream` is an async iterator yielding chunks (adjust based on Ollama's actual API)
    for await (const chunk of responseStream) {
      // Extract chunk text from response object
      // (Adjust property names based on actual returned structure)
      const textChunk = chunk.message.content || '';

      if (textChunk) {
        yield textChunk;
      }
    }
  }
}

/*@Injectable()
export class ChatService {
  async *streamOllama(message: string): AsyncGenerator<string> {
    const worker = new Worker(
      'C:/Users/adrien.wulfran/Documents/llm-angular-nestjs/server/src/worker.js',
      {
        workerData: { message },
      }
    );

    const messages: string[] = [];

    const messageQueue: string[] = [];
    let done = false;

    worker.on('message', (data) => {
      messageQueue.push(data);
    });

    worker.on('exit', () => {
      done = true;
    });

    while (!done || messageQueue.length > 0) {
      while (messageQueue.length > 0) {
        yield messageQueue.shift()!;
      }
      // wait briefly to avoid tight loop
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
}*/

