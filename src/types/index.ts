export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  modelUsed?: string;
  tokens?: {
    prompt?: number;
    completion?: number;
    total?: number;
  };
  isStreaming?: boolean;
  image?: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
  systemPrompt?: string;
  pinned?: boolean;
  model: string;
}

export type AIProvider = 'gemini' | 'vidya' | 'openai' | 'claude' | 'local' | 'built-in';

export interface AIModel {
  id: string;
  name: string;
  code: string;
  provider: AIProvider;
  description: string;
  badge: string;
  speed: string;
  contextWindow: string;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  soundEnabled: boolean;
  glyphLighting: boolean;
  nothingDotMode: boolean;
  selectedModel: string;
  temperature: number;
  streamSpeed: 'fast' | 'natural' | 'instant';
  apiProvider: 'gemini' | 'built-in' | 'openai';
  apiKey: string;
  apiEndpoint?: string;
  systemPrompt: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'admission' | 'academics' | 'facilities' | 'contact' | 'policy';
  command: string;
  description: string;
  prompt: string;
  icon: string;
}
