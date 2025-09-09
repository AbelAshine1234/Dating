export enum ProfileMode {
  Marriage = 'marriage',
  Dating = 'dating',
}

export interface User {
  id: number;
  name: string;
  age: number;
  photoUrl: string;
  videoPlaceholderUrl?: string;
  phonePlaceholderUrl?: string;
  religion?: string;
  caste?: string;
  interests?: string[];
  location: string;
  isPremium: boolean;
  isVerified: boolean;
  bio: string;
  familyDetails?: {
    type: 'Joint' | 'Nuclear';
    fatherOccupation: string;
    description: string;
  };
  lifestyle?: {
    diet: 'Vegetarian' | 'Non-Vegetarian' | 'Eggetarian';
    smoking: boolean;
    drinking: boolean;
  };
  hobbies?: string[];
}

export interface Message {
  id: number;
  senderId: number | 'me';
  text: string;
  timestamp: string;
  read?: boolean;
}

export interface Conversation {
    userId: number;
    userName: string;
    avatar: string;
    lastMessage: string;
    timestamp:string;
    unreadCount: number;
    messages: Message[];
}

export interface SuccessStory {
    id: number;
    names: string;
    imageUrl: string;
    story: string;
    fullStory: string;
}