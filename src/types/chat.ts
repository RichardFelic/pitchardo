export type MessageType = 'bot' | 'user';

export interface Image {
  src?: string;
  alt: string;
  type: 'profile' | 'project' | 'qr' | 'base64';
  base64?: string;
}

export interface ChatMessage {
  type: MessageType;
  content: string;
  images?: Image[];
}