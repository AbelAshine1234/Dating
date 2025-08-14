'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Phone, Video, MoreHorizontal, Send, Smile, Image, Mic } from 'lucide-react';
import { sampleChats, sampleMessages } from '@/data/sampleChats';

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState(sampleChats);
  const [messages, setMessages] = useState<any>(sampleMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]);

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      id: 'm' + Date.now(),
      content: message,
      timestamp: new Date(),
      senderId: 'user1'
    };

    setMessages((prev: any) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }));

    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const currentChat = chats.find(chat => chat.id === selectedChat);
  const currentMessages = selectedChat ? messages[selectedChat] || [] : [];

  return (
    <div className="h-screen bg-black flex">
      {/* Chat List */}
      <div className={`w-full md:w-1/3 border-r border-gray-800 ${selectedChat ? 'hidden md:block' : 'block'}`}>
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold neon-glow">Messages</h1>
        </div>
        
        <div className="overflow-y-auto h-full pb-20">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 flex items-center space-x-4 hover:bg-gray-800/50 transition-colors ${
                selectedChat === chat.id ? 'bg-neon/10 border-r-2 border-neon' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={chat.photo}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {chat.isOnline && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></div>
                )}
              </div>
              
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{chat.name}</span>
                  <span className="text-xs text-gray-400">
                    {formatTime(chat.lastMessage.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">{chat.lastMessage.content}</p>
              </div>
              
              {chat.unreadCount > 0 && (
                <div className="bg-magenta text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unreadCount}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {selectedChat && currentChat ? (
        <div className={`flex-1 flex flex-col ${selectedChat ? 'block' : 'hidden md:block'}`}>
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/50">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedChat(null)}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              
              <img
                src={currentChat.photo}
                alt={currentChat.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              
              <div>
                <h2 className="font-semibold">{currentChat.name}</h2>
                <p className="text-xs text-gray-400">
                  {currentChat.isOnline ? 'Online now' : 'Last seen recently'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-800 rounded-full">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-full">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((msg: any, index: number) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === 'user1' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.senderId === 'user1'
                      ? 'bg-neon text-black'
                      : 'bg-gray-800 text-white'
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.senderId === 'user1' ? 'text-black/70' : 'text-gray-400'
                  }`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-800 bg-gray-900/50">
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-800 rounded-full">
                <Image className="w-5 h-5 text-gray-400" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="w-full px-4 py-3 bg-gray-800 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon/50"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-700 rounded-full">
                  <Smile className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <button className="p-2 hover:bg-gray-800 rounded-full">
                <Mic className="w-5 h-5 text-gray-400" />
              </button>
              
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className={`p-3 rounded-full transition-colors ${
                  message.trim()
                    ? 'bg-neon text-black hover:bg-neon/80'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center bg-gray-900/20">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Select a chat</h2>
            <p className="text-gray-400">Choose a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}