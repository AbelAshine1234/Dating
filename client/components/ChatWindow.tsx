import React, { useState, useRef, useEffect } from 'react';
import { User, Message } from '../types';
import { 
    PhoneIcon, 
    VideoIcon, 
    SmileIcon, 
    SendIcon, 
    MinimizeIcon,
    MaximizeIcon,
    CloseIcon,
    MessageIcon,
    CheckIcon,
    XCircleIcon
} from '../constants';

// Types for enhanced chat functionality
export interface ChatWindowData {
    id: string;
    type: 'chat' | 'random-invitation';
    user?: User;
    isMinimized: boolean;
    messages?: Message[];
}

export interface RandomChatInvitation {
    id: string;
    user: User;
    status: 'pending' | 'accepted' | 'declined';
}

interface ChatWindowProps {
    chatWindow: ChatWindowData;
    onMinimize: (id: string) => void;
    onMaximize: (id: string) => void;
    onClose: (id: string) => void;
    onSendMessage?: (message: string) => void;
    onAcceptInvitation?: (invitationId: string) => void;
    onDeclineInvitation?: (invitationId: string) => void;
    isFixed?: boolean;
    position?: { x: number; y: number };
}

// LinkedIn-style Chat Window Component
export const ChatWindow: React.FC<ChatWindowProps> = ({ 
    chatWindow, 
    onMinimize, 
    onMaximize, 
    onClose, 
    onSendMessage,
    onAcceptInvitation,
    onDeclineInvitation,
    isFixed = false,
    position = { x: 0, y: 0 }
}) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatWindow.messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() && onSendMessage) {
            onSendMessage(newMessage);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (chatWindow.isMinimized) {
        return (
            <div
                className={`${isFixed ? 'fixed' : 'absolute'} bottom-4 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer z-50 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105`}
                style={{ 
                    left: isFixed ? position.x : position.x, 
                    right: isFixed ? 'auto' : 'auto',
                    top: isFixed ? 'auto' : position.y,
                    width: '250px',
                    height: '50px'
                }}
                onClick={() => onMaximize(chatWindow.id)}
            >
                <div className="flex items-center justify-between px-4 h-full">
                    <div className="flex items-center space-x-3">
                        <img 
                            src={chatWindow.user?.image || '/default-avatar.png'} 
                            alt="Profile" 
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-800 dark:text-white truncate">
                            {chatWindow.user?.name || 'Chat'}
                        </span>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose(chatWindow.id);
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <CloseIcon />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`${isFixed ? 'fixed' : 'absolute'} bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 transition-all duration-300 ease-in-out hover:shadow-2xl transform origin-bottom-right`}
            style={{ 
                left: isFixed ? position.x : position.x, 
                right: isFixed ? 'auto' : 'auto',
                bottom: isFixed ? '80px' : position.y,
                width: '350px',
                height: '500px'
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-t-lg cursor-move hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div className="flex items-center space-x-2">
                    <img 
                        src={chatWindow.user?.image || '/default-avatar.png'} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800 dark:text-white">
                        {chatWindow.user?.name || 'Chat'}
                    </span>
                </div>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => onMinimize(chatWindow.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                        <MinimizeIcon />
                    </button>
                    <button
                        onClick={() => onClose(chatWindow.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                        <CloseIcon />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto" style={{ height: '380px' }}>
                {chatWindow.type === 'random-invitation' ? (
                    <div className="text-center py-8">
                        <img 
                            src={chatWindow.user?.image} 
                            alt="Profile" 
                            className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            {chatWindow.user?.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {chatWindow.user?.occupation} • {chatWindow.user?.age} years old
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                            {chatWindow.user?.marriageGoals || 'Looking for a meaningful connection'}
                        </p>
                        <div className="flex space-x-2 justify-center mb-4">
                            <button className="flex items-center space-x-2 px-4 py-2 bg-neon-purple text-white rounded-lg hover:bg-purple-600 transition-colors">
                                <MessageIcon />
                                <span>Chat</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                                <PhoneIcon />
                                <span>Call</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                <VideoIcon />
                                <span>Video</span>
                            </button>
                        </div>
                        {onAcceptInvitation && onDeclineInvitation && (
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => onAcceptInvitation(chatWindow.id)}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    <CheckIcon />
                                    <span>Accept</span>
                                </button>
                                <button
                                    onClick={() => onDeclineInvitation(chatWindow.id)}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <XCircleIcon />
                                    <span>Decline</span>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {chatWindow.messages?.map(msg => (
                            <div key={msg.id} className={`flex ${msg.senderId === 99 ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                                    msg.senderId === 99 
                                        ? 'bg-neon-purple text-white' 
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                }`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input */}
            {chatWindow.type === 'chat' && (
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="px-3 py-2 bg-neon-purple text-white rounded-lg hover:bg-purple-600 transition-colors"
                        >
                            <SendIcon />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Random Chat Invitation Modal Component
export const RandomChatInvitationModal: React.FC<{
    invitation: RandomChatInvitation;
    onAccept: (invitationId: string) => void;
    onDecline: (invitationId: string) => void;
}> = ({ invitation, onAccept, onDecline }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl animate-scale-in">
                <div className="text-center">
                    <img 
                        src={invitation.user.image} 
                        alt={invitation.user.name} 
                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        {invitation.user.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                        {invitation.user.occupation} • {invitation.user.age} years old
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                        {invitation.user.marriageGoals || 'Looking for a meaningful connection'}
                    </p>
                    
                    <div className="flex space-x-3 justify-center mb-4">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-neon-purple text-white rounded-lg hover:bg-purple-600 transition-colors">
                            <MessageIcon />
                            <span>Chat</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                            <PhoneIcon />
                            <span>Call</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            <VideoIcon />
                            <span>Video</span>
                        </button>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => onAccept(invitation.id)}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            <CheckIcon />
                            <span>Accept</span>
                        </button>
                        <button
                            onClick={() => onDecline(invitation.id)}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            <XCircleIcon />
                            <span>Decline</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
