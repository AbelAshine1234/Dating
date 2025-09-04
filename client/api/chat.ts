import { API_BASE_URL } from './config';

export interface ChatMessage {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  createdAt: string;
  read?: boolean;
}

export async function getConversation(token: string, otherUserId: number): Promise<ChatMessage[]> {
  const res = await fetch(`${API_BASE_URL}/api/chats/conversation/${otherUserId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    let msg = 'Failed to load conversation';
    try { const data = await res.json(); if (data?.error) msg = data.error; } catch {}
    throw new Error(msg);
  }
  const data = await res.json();
  return data.messages || [];
}

export async function sendMessage(token: string, receiverId: number, message: string) {
  const res = await fetch(`${API_BASE_URL}/api/chats/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ receiverId, message }),
  });
  if (!res.ok) {
    let msg = 'Failed to send message';
    try { const data = await res.json(); if (data?.error) msg = data.error; } catch {}
    throw new Error(msg);
  }
  return await res.json();
}

export async function getUserChats(token: string, userId: number) {
  const res = await fetch(`${API_BASE_URL}/api/chats/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    let msg = 'Failed to load chats';
    try { const data = await res.json(); if (data?.error) msg = data.error; } catch {}
    throw new Error(msg);
  }
  return await res.json();
}


