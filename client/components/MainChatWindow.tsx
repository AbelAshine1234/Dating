import React, { useState, useEffect } from 'react';
import { User, Message } from '../types';
import { sampleUsers, currentUser } from '../data/sampleData';
import { MessageIcon, PhoneIcon, VideoIcon, CloseIcon, MinimizeIcon } from '../constants';

export interface MainChatWindowProps {
    isOpen: boolean;
    onMinimize: () => void;
    onClose: () => void;
    onOpenChat: (user: User) => void;
    onStartRandomChat: () => void;
}

export const MainChatWindow: React.FC<MainChatWindowProps> = ({
    isOpen,
    onMinimize,
    onClose,
    onOpenChat,
    onStartRandomChat
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [randomChatEnabled, setRandomChatEnabled] = useState(false);

    // Sample chat previews - in real app this would come from backend
    const chatPreviews = [
        {
            id: '1',
            user: sampleUsers[0],
            lastMessage: 'Hey, how are you doing?',
            timestamp: '2 min ago',
            unreadCount: 1
        },
        {
            id: '2',
            user: sampleUsers[1],
            lastMessage: 'Thanks for the match!',
            timestamp: '1 hour ago',
            unreadCount: 0
        },
        {
            id: '3',
            user: sampleUsers[2],
            lastMessage: 'Would you like to grab coffee sometime?',
            timestamp: '3 hours ago',
            unreadCount: 2
        }
    ];

    const filteredChats = chatPreviews.filter(chat =>
        chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 transition-all duration-300 ease-in-out transform origin-bottom-right">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
                <h3 className="font-medium text-gray-800 dark:text-white">Messages</h3>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={onMinimize}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                        <MinimizeIcon />
                    </button>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                        <CloseIcon />
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search chats..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 pl-10 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-all duration-200"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Random Chat Toggle */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={randomChatEnabled}
                        onChange={(e) => {
                            setRandomChatEnabled(e.target.checked);
                            if (e.target.checked) {
                                onStartRandomChat();
                            }
                        }}
                        className="w-4 h-4 text-neon-purple bg-gray-100 border-gray-300 rounded focus:ring-neon-purple focus:ring-2"
                    />
                    <span className="text-sm font-medium text-gray-800 dark:text-white">Enable Random Chat</span>
                </label>
                {randomChatEnabled && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-7">
                        You'll receive random chat invitations from other users
                    </p>
                )}
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto" style={{ height: '200px' }}>
                {filteredChats.length > 0 ? (
                    <div className="space-y-1">
                        {filteredChats.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => onOpenChat(chat.user)}
                                className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors rounded-lg mx-2"
                            >
                                <img
                                    src={chat.user.image}
                                    alt={chat.user.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                            {chat.user.name}
                                        </h4>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {chat.timestamp}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                        {chat.lastMessage}
                                    </p>
                                </div>
                                {chat.unreadCount > 0 && (
                                    <div className="flex-shrink-0">
                                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-neon-purple rounded-full">
                                            {chat.unreadCount}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {searchTerm ? 'No chats found matching your search.' : 'No chats yet. Start swiping to make connections!'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
