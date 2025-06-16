export interface ChatContent {
    agent?: 'user' | 'chatbot';
    role?: 'user' | 'system' | 'assistant';
    message: string;
}