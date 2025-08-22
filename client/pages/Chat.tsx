import React, { useState, useRef, useEffect } from 'react';
import { sampleChatPreviews, sampleChatRooms, currentUser, sampleUsers } from '../data/sampleData';
import { ChatPreview, ChatRoomData, User, Message } from '../types';
import { 
    PhoneIcon, 
    VideoIcon, 
    SmileIcon, 
    SendIcon, 
    ArrowLeftIcon,
    MinimizeIcon,
    MaximizeIcon,
    CloseIcon,
    RandomIcon,
    CheckIcon,
    XCircleIcon,
    MessageIcon
} from '../constants';

// Types for enhanced chat functionality
interface ChatWindow {
    id: string;
    type: 'chat' | 'random-invitation';
    user?: User;
    isMinimized: boolean;
    position: { x: number; y: number };
    isDragging: boolean;
    messages?: Message[];
}

interface RandomChatInvitation {
    id: string;
    user: User;
    status: 'pending' | 'accepted' | 'declined';
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

// LinkedIn-style Chat Window Component
const ChatWindow: React.FC<{
    chatWindow: ChatWindow;
    onMinimize: (id: string) => void;
    onMaximize: (id: string) => void;
    onClose: (id: string) => void;
    onPositionChange: (id: string, position: { x: number; y: number }) => void;
    onSendMessage?: (message: string) => void;
}> = ({ chatWindow, onMinimize, onMaximize, onClose, onPositionChange, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatWindow.messages]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.chat-header')) {
            setIsDragging(true);
            const rect = e.currentTarget.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            onPositionChange(chatWindow.id, { x: newX, y: newY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, dragOffset]);

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
                className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer z-50 transition-all duration-300 ease-in-out hover:shadow-xl"
                style={{ left: chatWindow.position.x, top: chatWindow.position.y }}
                onClick={() => onMaximize(chatWindow.id)}
            >
                <div className="flex items-center p-3 space-x-2">
                    <img 
                        src={chatWindow.user?.image || '/default-avatar.png'} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {chatWindow.user?.name || 'Chat'}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose(chatWindow.id);
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <CloseIcon />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 transition-all duration-300 ease-in-out hover:shadow-2xl"
            style={{ 
                left: chatWindow.position.x, 
                top: chatWindow.position.y,
                width: '350px',
                height: '500px'
            }}
            onMouseDown={handleMouseDown}
        >
            {/* Header */}
            <div className="chat-header flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-t-lg cursor-move hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
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
                        <div className="flex space-x-2 justify-center">
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
                    </div>
                ) : (
                    <div className="space-y-3">
                        {chatWindow.messages?.map(msg => (
                            <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                                    msg.senderId === currentUser.id 
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

// Random Chat Invitation Modal
const RandomChatInvitationModal: React.FC<{
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

export const Chat: React.FC = () => {
    const [activeChatId, setActiveChatId] = useState<number | null>(sampleChatPreviews[0]?.id || null);
    const [isChatRoomVisible, setChatRoomVisible] = useState(false);
    const [randomChatEnabled, setRandomChatEnabled] = useState(false);
    const [chatWindows, setChatWindows] = useState<ChatWindow[]>([]);
    const [randomInvitations, setRandomInvitations] = useState<RandomChatInvitation[]>([]);
    const [nextWindowPosition, setNextWindowPosition] = useState({ x: 20, y: 20 });
    
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
        const newWindow: ChatWindow = {
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
            x: prev.x + 30,
            y: prev.y + 30
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

    return (
        <div className="flex-grow container mx-auto p-4 md:p-8 animate-fade-in">
            <div className="h-[80vh] bg-white/50 dark:bg-dark-bg/50 backdrop-blur-lg rounded-2xl shadow-2xl flex overflow-hidden">
                <aside className={`w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-y-auto p-2 flex-col ${isChatRoomVisible ? 'hidden' : 'flex'} md:flex`}>
                    <h2 className="p-4 text-2xl font-bold font-heading text-gray-800 dark:text-white">Chats</h2>
                    
                    {/* Random Chat Toggle */}
                    <div className="px-4 mb-4">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={randomChatEnabled}
                                onChange={(e) => setRandomChatEnabled(e.target.checked)}
                                className="w-5 h-5 text-neon-purple bg-gray-100 border-gray-300 rounded focus:ring-neon-purple focus:ring-2"
                            />
                            <div className="flex items-center space-x-2">
                                <RandomIcon />
                                <span className="font-medium text-gray-800 dark:text-white">Random Chat</span>
                            </div>
                        </label>
                        {randomChatEnabled && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                Finding random matches for you...
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        {sampleChatPreviews.map(chat => (
                            <ChatListItem
                                key={chat.id}
                                chat={chat}
                                isActive={activeChatId === chat.id}
                                onClick={() => handleSelectChat(chat.id)}
                            />
                        ))}
                    </div>
                </aside>
                
                <section className={`flex-1 ${!isChatRoomVisible && !activeChatRoom ? 'hidden' : ''} md:block`}>
                    {activeChatRoom ? (
                        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-r-2xl">
                            <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <button onClick={handleBackToList} className="md:hidden mr-2 p-2 text-gray-500 hover:text-neon-purple">
                                        <ArrowLeftIcon />
                                    </button>
                                    <img src={activeChatRoom.user.image} alt={activeChatRoom.user.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                                    <div>
                                        <h3 className="font-bold font-heading text-lg text-gray-800 dark:text-white">{activeChatRoom.user.name}</h3>
                                        <p className="text-sm text-green-500">Online</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button className="p-2 text-gray-500 hover:text-neon-purple dark:hover:text-neon-purple transition-colors"><PhoneIcon /></button>
                                    <button className="p-2 text-gray-500 hover:text-neon-purple dark:hover:text-neon-purple transition-colors"><VideoIcon /></button>
                                </div>
                            </header>
                            <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800/50">
                                <div className="space-y-4">
                                    {activeChatRoom.messages.map(msg => (
                                        <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.senderId === currentUser.id ? 'bg-neon-purple text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                                <p>{msg.text}</p>
                                                <p className={`text-xs mt-1 ${msg.senderId === currentUser.id ? 'text-purple-200' : 'text-gray-500 dark:text-gray-400'} text-right`}>{msg.timestamp}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </main>
                            <footer className="p-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
                                    <button className="text-gray-500 hover:text-neon-magenta"><SmileIcon /></button>
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="flex-1 bg-transparent px-4 border-none focus:ring-0 text-gray-800 dark:text-gray-200 placeholder-gray-500"
                                    />
                                    <button className="text-neon-purple hover:scale-110 transition-transform"><SendIcon /></button>
                                </div>
                            </footer>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                            <div>
                                <h3 className="text-2xl font-heading">Select a chat</h3>
                                <p>Start a conversation with one of your matches.</p>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            {/* Random Chat Invitation Modals */}
            {randomInvitations.map(invitation => (
                <RandomChatInvitationModal
                    key={invitation.id}
                    invitation={invitation}
                    onAccept={handleAcceptInvitation}
                    onDecline={handleDeclineInvitation}
                />
            ))}

            {/* Chat Windows */}
            {chatWindows.map(chatWindow => (
                <ChatWindow
                    key={chatWindow.id}
                    chatWindow={chatWindow}
                    onMinimize={handleMinimize}
                    onMaximize={handleMaximize}
                    onClose={handleClose}
                    onPositionChange={handlePositionChange}
                    onSendMessage={handleSendMessage}
                />
            ))}
        </div>
    );
};
