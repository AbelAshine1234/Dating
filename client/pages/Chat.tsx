import React, { useState, useRef, useEffect } from 'react';
import { sampleChatPreviews, sampleChatRooms, currentUser, sampleUsers } from '../data/sampleData';
import { ChatPreview, ChatRoomData, User, Message } from '../types';
import { 
    PhoneIcon, 
    VideoIcon, 
    SmileIcon, 
    SendIcon, 
    ArrowLeftIcon,
    RandomIcon
} from '../constants';
import { ChatWindow, ChatWindowData, RandomChatInvitation } from '../components/ChatWindow';
import { MainChatWindow } from '../components/MainChatWindow';
import { DefaultChatButton } from '../components/DefaultChatButton';

// Enhanced chat window interface for draggable functionality
interface EnhancedChatWindow extends ChatWindowData {
    position: { x: number; y: number };
    isDragging: boolean;
}

const ChatListItem: React.FC<{ chat: ChatPreview; isActive: boolean; onClick: () => void }> = ({ chat, isActive, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center p-3 cursor-pointer rounded-lg transition-colors duration-200 ${
            isActive ? 'bg-neon-purple/20 dark:bg-neon-purple/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
    >
        <div className="relative mr-4">
            <img src={chat.user.image} alt={chat.user.name} className="w-14 h-14 rounded-full object-cover" />
            {chat.isOnline && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-800"></span>}
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <h4 className="font-bold font-heading text-gray-800 dark:text-white">{chat.user.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{chat.timestamp}</p>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate w-40">{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                    <span className="bg-neon-magenta text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {chat.unreadCount}
                    </span>
                )}
            </div>
        </div>
    </div>
);

export const Chat: React.FC = () => {
    const [activeChatId, setActiveChatId] = useState<number | null>(sampleChatPreviews[0]?.id || null);
    const [isChatRoomVisible, setChatRoomVisible] = useState(false);
    const [randomChatEnabled, setRandomChatEnabled] = useState(false);
    const [chatWindows, setChatWindows] = useState<EnhancedChatWindow[]>([]);
    const [randomInvitations, setRandomInvitations] = useState<RandomChatInvitation[]>([]);
    const [nextWindowPosition, setNextWindowPosition] = useState({ x: 20, y: 20 });
    const [isMainChatOpen, setIsMainChatOpen] = useState(false);
    
    const activeChatRoom = sampleChatRooms.find(cr => cr.id === activeChatId);

    // Add custom styles for animations
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes scaleIn {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .animate-fade-in {
                animation: fadeIn 0.3s ease-out;
            }
            .animate-scale-in {
                animation: scaleIn 0.3s ease-out;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Generate random chat invitations
    useEffect(() => {
        if (randomChatEnabled) {
            const interval = setInterval(() => {
                if (randomInvitations.length < 3) { // Limit to 3 pending invitations
                    const availableUsers = sampleUsers.filter(user => 
                        user.id !== currentUser.id && 
                        !randomInvitations.some(inv => inv.user.id === user.id) &&
                        !chatWindows.some(cw => cw.user?.id === user.id)
                    );
                    
                    if (availableUsers.length > 0) {
                        const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
                        const newInvitation: RandomChatInvitation = {
                            id: `inv-${Date.now()}-${Math.random()}`,
                            user: randomUser,
                            status: 'pending'
                        };
                        setRandomInvitations(prev => [...prev, newInvitation]);
                    }
                }
            }, 5000); // Generate invitation every 5 seconds

            return () => clearInterval(interval);
        }
    }, [randomChatEnabled, randomInvitations.length, chatWindows]);

    const handleSelectChat = (id: number) => {
        setActiveChatId(id);
        setChatRoomVisible(true);
        
        // Open chat window
        const chatRoom = sampleChatRooms.find(cr => cr.id === id);
        if (chatRoom) {
            openChatWindow(chatRoom.user, chatRoom.messages);
        }
    };

    const handleBackToList = () => {
        setChatRoomVisible(false);
    };

    const openChatWindow = (user: User, messages?: Message[]) => {
        const newWindow: EnhancedChatWindow = {
            id: `chat-${Date.now()}-${Math.random()}`,
            type: 'chat',
            user,
            messages: messages || [],
            isMinimized: false,
            position: nextWindowPosition,
            isDragging: false
        };
        
        setChatWindows(prev => [...prev, newWindow]);
        setNextWindowPosition(prev => ({ 
            x: prev.x + 20, 
            y: prev.y + 20 
        }));
    };

    const handleMinimize = (id: string) => {
        setChatWindows(prev => 
            prev.map(cw => 
                cw.id === id ? { ...cw, isMinimized: true } : cw
            )
        );
    };

    const handleMaximize = (id: string) => {
        setChatWindows(prev => 
            prev.map(cw => 
                cw.id === id ? { ...cw, isMinimized: false } : cw
            )
        );
    };

    const handleClose = (id: string) => {
        setChatWindows(prev => prev.filter(cw => cw.id !== id));
    };

    const handlePositionChange = (id: string, position: { x: number; y: number }) => {
        setChatWindows(prev => 
            prev.map(cw => 
                cw.id === id ? { ...cw, position } : cw
            )
        );
    };

    const handleSendMessage = (message: string) => {
        // This would typically send to backend
        console.log('Sending message:', message);
    };

    const handleAcceptInvitation = (invitationId: string) => {
        const invitation = randomInvitations.find(inv => inv.id === invitationId);
        if (invitation) {
            // Open chat window for accepted invitation
            openChatWindow(invitation.user);
            
            // Remove invitation
            setRandomInvitations(prev => prev.filter(inv => inv.id !== invitationId));
        }
    };

    const handleDeclineInvitation = (invitationId: string) => {
        setRandomInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    };

    // Main chat window functions
    const handleOpenMainChat = () => {
        setIsMainChatOpen(true);
    };

    const handleCloseMainChat = () => {
        setIsMainChatOpen(false);
    };

    const handleMinimizeMainChat = () => {
        setIsMainChatOpen(false);
    };

    const handleOpenChat = (user: User) => {
        openChatWindow(user);
        setIsMainChatOpen(false);
    };

    const handleStartRandomChat = () => {
        setRandomChatEnabled(true);
        setIsMainChatOpen(false);
    };

    if (isChatRoomVisible && activeChatRoom) {
        return (
            <div className="flex-grow flex flex-col bg-white dark:bg-gray-900 animate-fade-in">
                {/* Chat Room Header */}
                <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <button
                        onClick={handleBackToList}
                        className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <ArrowLeftIcon />
                    </button>
                    <div className="flex items-center space-x-3">
                        <img
                            src={activeChatRoom.user.image}
                            alt={activeChatRoom.user.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="font-bold font-heading text-gray-800 dark:text-white">
                                {activeChatRoom.user.name}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Online
                            </p>
                        </div>
                    </div>
                    <div className="ml-auto flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <PhoneIcon />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <VideoIcon />
                        </button>
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {activeChatRoom.messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs px-4 py-2 rounded-lg ${
                                    message.senderId === currentUser.id
                                        ? 'bg-neon-purple text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                }`}
                            >
                                <p>{message.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex items-center space-x-3">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <SmileIcon />
                        </button>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                        />
                        <button className="p-2 bg-neon-purple text-white rounded-lg hover:bg-purple-600 transition-colors">
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-grow flex flex-col bg-white dark:bg-gray-900 animate-fade-in">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-3xl font-bold font-heading text-gray-800 dark:text-white">Messages</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Connect with your matches</p>
            </div>

            {/* Search Bar */}
            <div className="px-6 mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-all duration-200"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Random Chat Toggle */}
            <div className="px-6 mb-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={randomChatEnabled}
                        onChange={(e) => setRandomChatEnabled(e.target.checked)}
                        className="w-5 h-5 text-neon-purple bg-gray-100 border-gray-300 rounded focus:ring-neon-purple focus:ring-2"
                    />
                    <span className="text-sm font-medium text-gray-800 dark:text-white">Random Chat</span>
                    <RandomIcon />
                </label>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto px-6">
                <div className="space-y-2">
                    {sampleChatPreviews.map((chat) => (
                        <ChatListItem
                            key={chat.id}
                            chat={chat}
                            isActive={chat.id === activeChatId}
                            onClick={() => handleSelectChat(chat.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Random Chat Invitation Modals */}
            {randomInvitations.map(invitation => (
                <div key={invitation.id} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
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
                                    <RandomIcon />
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
                                    onClick={() => handleAcceptInvitation(invitation.id)}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    <span>Accept</span>
                                </button>
                                <button
                                    onClick={() => handleDeclineInvitation(invitation.id)}
                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <span>Decline</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Chat Windows - Draggable */}
            {chatWindows.map((chatWindow, index) => (
                <ChatWindow
                    key={chatWindow.id}
                    chatWindow={chatWindow}
                    onMinimize={handleMinimize}
                    onMaximize={handleMaximize}
                    onClose={handleClose}
                    onSendMessage={handleSendMessage}
                    isFixed={false}
                    position={chatWindow.position}
                />
            ))}

            {/* Main Chat Window */}
            <MainChatWindow
                isOpen={isMainChatOpen}
                onMinimize={handleMinimizeMainChat}
                onClose={handleCloseMainChat}
                onOpenChat={handleOpenChat}
                onStartRandomChat={handleStartRandomChat}
            />

            {/* Default Chat Button - Always visible */}
            <DefaultChatButton
                onClick={handleOpenMainChat}
                hasUnreadMessages={randomInvitations.length > 0}
            />
        </div>
    );
};
