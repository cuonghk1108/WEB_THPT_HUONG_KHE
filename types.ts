
export interface NavItem {
  label: string;
  path: string;
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string; // Added field for full HTML content
  date: string;
  imageUrl: string;
  category: string;
}

export interface DocumentItem {
  id: number;
  title: string;
  number: string;
  date: string;
  type: 'PDF' | 'DOC';
  size: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: any;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GlobalImages {
  logo: string;
  homeHero: string;
  principal: string;
  introHistory: string;
}

export interface Teacher {
  id: number;
  name: string;
  position: string;
  subject: string;
  email: string;
  imageUrl: string;
  department: string;
}

export interface Club {
  id: number;
  name: string;
  description: string;
  members: number;
  imageUrl: string;
  schedule: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
}
