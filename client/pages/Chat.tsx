import React, { useState, useRef, useEffect } from 'react';
import { sampleChatPreviews, sampleChatRooms, currentUser, sampleUsers } from '../data/sampleData';
import { ChatPreview, ChatRoomData, User, Message } from '../types';
import { 
    PhoneIcon, 
    VideoIcon, 
    SmileIcon, 
    SendIcon, 
    ArrowLeftIcon,
    RandomIcon,
    SearchIcon
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
            isActive ? 'bg-neon-purple/20 dark:bg-neon-purple/30 border-l-4 border-neon-purple' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
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

const ConversationView: React.FC<{ chatRoom: ChatRoomData | null; onSendMessage: (message: string) => void }> = ({ chatRoom, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatRoom?.messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() && chatRoom) {
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

    if (!chatRoom) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Select a chat</h3>
                    <p className="text-gray-500 dark:text-gray-500">Choose a conversation from the list to start messaging</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
            {/* Chat Header */}
            <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                    <img
                        src={chatRoom.user.image}
                        alt={chatRoom.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="font-bold font-heading text-gray-800 dark:text-white">
                            {chatRoom.user.name}
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

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-800">
                {chatRoom.messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                                message.senderId === currentUser.id
                                    ? 'bg-neon-purple text-white'
                                    : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm'
                            }`}
                        >
                            <p>{message.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <SmileIcon />
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                    />
                    <button 
                        onClick={handleSendMessage}
                        className="p-2 bg-neon-purple text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export const Chat: React.FC = () => {
    const [activeChatId, setActiveChatId] = useState<number | null>(sampleChatPreviews[0]?.id || null);
    const [randomChatEnabled, setRandomChatEnabled] = useState(false);
    const [chatWindows, setChatWindows] = useState<EnhancedChatWindow[]>([]);
    const [randomInvitations, setRandomInvitations] = useState<RandomChatInvitation[]>([]);

    const [isMainChatOpen, setIsMainChatOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const activeChatRoom = sampleChatRooms.find(cr => cr.id === activeChatId);
    const filteredChats = sampleChatPreviews.filter(chat =>
        chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate position for new chat windows - LinkedIn style positioning
    const calculateChatWindowPosition = (isMinimized: boolean = false) => {
        if (isMinimized) {
            // For minimized chats: position in left lower corner, side by side
            const minimizedCount = chatWindows.filter(cw => cw.isMinimized).length;
            const minimizedWidth = 250; // Width of minimized chat
            const spacing = 10; // Space between minimized chats
            
            return {
                x: 20 + (minimizedCount * (minimizedWidth + spacing)),
                y: window.innerHeight - 100 // 100px from bottom
            };
        } else {
            // For expanded chats: position in center-right area
            const expandedCount = chatWindows.filter(cw => !cw.isMinimized).length;
            return {
                x: window.innerWidth - 400 - (expandedCount * 20), // 400px from right edge
                y: 100 + (expandedCount * 20) // 100px from top
            };
        }
    };

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

    // Handle window resize to reposition chat windows
    useEffect(() => {
        const handleResize = () => {
            setChatWindows(prev => {
                const updated = [...prev];
                
                // Reposition minimized chats
                const minimizedChats = updated.filter(cw => cw.isMinimized);
                minimizedChats.forEach((chat, index) => {
                    chat.position = {
                        x: 20 + (index * (250 + 10)),
                        y: window.innerHeight - 100
                    };
                });
                
                // Reposition expanded chats
                const expandedChats = updated.filter(cw => !cw.isMinimized);
                expandedChats.forEach((chat, index) => {
                    chat.position = {
                        x: window.innerWidth - 400 - (index * 20),
                        y: 100 + (index * 20)
                    };
                });
                
                return updated;
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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
    };

    const openChatWindow = (user: User, messages?: Message[]) => {
        const newWindow: EnhancedChatWindow = {
            id: `chat-${Date.now()}-${Math.random()}`,
            type: 'chat',
            user,
            messages: messages || [],
            isMinimized: false,
            position: calculateChatWindowPosition(false), // Default to expanded position
            isDragging: false
        };
        
        setChatWindows(prev => [...prev, newWindow]);
    };

    const handleMinimize = (id: string) => {
        setChatWindows(prev => {
            const updated = prev.map(cw => 
                cw.id === id ? { ...cw, isMinimized: true, position: calculateChatWindowPosition(true) } : cw
            );
            
            // Reposition all minimized chats to be side by side
            const minimizedChats = updated.filter(cw => cw.isMinimized);
            minimizedChats.forEach((chat, index) => {
                chat.position = {
                    x: 20 + (index * (250 + 10)), // 250px width + 10px spacing
                    y: window.innerHeight - 100
                };
            });
            
            return updated;
        });
    };

    const handleMaximize = (id: string) => {
        setChatWindows(prev => {
            const updated = prev.map(cw => 
                cw.id === id ? { ...cw, isMinimized: false, position: calculateChatWindowPosition(false) } : cw
            );
            
            // Reposition remaining minimized chats
            const minimizedChats = updated.filter(cw => cw.isMinimized);
            minimizedChats.forEach((chat, index) => {
                chat.position = {
                    x: 20 + (index * (250 + 10)),
                    y: window.innerHeight - 100
                };
            });
            
            return updated;
        });
    };

    const handleClose = (id: string) => {
        setChatWindows(prev => {
            const remaining = prev.filter(cw => cw.id !== id);
            
            // Reposition remaining minimized chats
            const minimizedChats = remaining.filter(cw => cw.isMinimized);
            minimizedChats.forEach((chat, index) => {
                chat.position = {
                    x: 20 + (index * (250 + 10)),
                    y: window.innerHeight - 100
                };
            });
            
            return remaining;
        });
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

    return (
        <div className="flex-grow flex flex-col bg-white dark:bg-gray-900 animate-fade-in">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-3xl font-bold font-heading text-gray-800 dark:text-white">Messages</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Connect with your matches</p>
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

            {/* Main Chat Interface - Split Layout */}
            <div className="flex-1 flex border-t border-gray-200 dark:border-gray-700">
                {/* Left Side - Chat List */}
                <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    {/* Search Bar */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search chats..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-all duration-200"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon />
                            </div>
                        </div>
                    </div>

                    {/* Chat List */}
                    <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 300px)' }}>
                        <div className="space-y-1 p-2">
                            {filteredChats.map((chat) => (
                                <ChatListItem
                                    key={chat.id}
                                    chat={chat}
                                    isActive={chat.id === activeChatId}
                                    onClick={() => handleSelectChat(chat.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Conversation */}
                <div className="flex-1">
                    <ConversationView 
                        chatRoom={activeChatRoom || null}
                        onSendMessage={handleSendMessage}
                    />
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
