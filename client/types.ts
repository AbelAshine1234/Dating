export interface User {
  id: number;
  name: string;
  age: number;
  occupation?: string;
  location?: string;
  marriageGoals?: string;
  image: string;
  religion?: string;
  caste?: string;
}

export enum NotificationType {
  Match = 'match',
  Call = 'call',
  Message = 'message'
}

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  user?: User;
}

export type Theme = 'light' | 'dark';

export interface ChatPreview {
  id: number;
  user: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
}

export interface ChatRoomData {
    id: number;
    user: User;
    messages: Message[];
}