export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface HistoryItem {
  id: string;
  prompt: string;
  svgCode: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  svgs: HistoryItem[]; // All SVGs generated in this conversation
  lastModified: number;
}

export interface GenerationResult {
  svgCode: string | null;
  textResponse: string;
}

export interface IconStyle {
  id: string;
  name: string;
  description: string;
  previewSvg: string;
}