'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'emoji' | 'image';
}

interface Chat {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  isOnline: boolean;
}

interface ChatContextType {
  chats: Chat[];
  messages: { [chatId: string]: Message[] };
  activeChat: string | null;
  setActiveChat: (chatId: string | null) => void;
  sendMessage: (chatId: string, content: string, type?: 'text' | 'emoji') => void;
  markAsRead: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<{ [chatId: string]: Message[] }>({});
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const sendMessage = (chatId: string, content: string, type: 'text' | 'emoji' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'currentUser', // In real app, this would be from auth context
      receiverId: 'otherUser',
      content,
      timestamp: new Date(),
      type
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }));

    // Update chat's last message
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, lastMessage: newMessage }
        : chat
    ));
  };

  const markAsRead = (chatId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, unreadCount: 0 }
        : chat
    ));
  };

  const value = {
    chats,
    messages,
    activeChat,
    setActiveChat,
    sendMessage,
    markAsRead
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}