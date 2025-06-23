import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private sse: EventSource | null = null;

    connect(onMessage: (msg: string) => void, messageId: string) {
        this.sse = new EventSource(
            `http://localhost:3000/api/chat/stream?messageId=${messageId}`
        );

        this.sse.onmessage = (event) => {
            if (event.data === '[DONE]') {
                // your protocol to mark end of stream
                this.sse?.close();
            } else {
                onMessage(event.data);
            }
        };

        this.sse.onerror = (err) => {
            console.error('SSE error:', err);
            this.disconnect();
        };
    }

    disconnect() {
        if (this.sse) {
            this.sse.close();
            this.sse = null;
        }
    }

    async sendMessage(message: string): Promise<string> {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        const { messageId } = data;
        return messageId;
    }
}