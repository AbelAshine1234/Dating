import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sampleUsers, currentUser } from '../data/sampleData';
import { User, NotificationType, Message } from '../types';
import { SwipeCard } from '../components/SwipeCard';
import { NotificationContext } from '../context/NotificationContext';
import { HeartIcon, XIcon, RefreshCwIcon, MessageIcon, PhoneIcon, VideoIcon } from '../constants';
import { ChatWindow, ChatWindowData, RandomChatInvitation } from '../components/ChatWindow';
import { MainChatWindow } from '../components/MainChatWindow';
import { DefaultChatButton } from '../components/DefaultChatButton';

const MarriageRegistrationPanel: React.FC = () => (
    <div className="w-full md:w-1/3 lg:w-1/4 p-8 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl shadow-2xl h-full flex flex-col justify-center items-center text-center border border-white/20">
        <h3 className="text-3xl font-bold font-heading text-gray-800 dark:text-white">Ready for Forever?</h3>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
            Our marriage path is for serious applicants. Complete your detailed profile to begin connecting with others who share your goals.
        </p>
        <Link
            to="/marriage-registration"
            className="mt-8 w-full py-3 bg-gradient-to-r from-neon-purple to-indigo-500 text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-lg hover:shadow-neon-purple/50"
        >
            Start Registration
        </Link>
    </div>
);

export const MarriageSwipe: React.FC = () => {
    const [users, setUsers] = useState<User[]>(sampleUsers.filter(u => u.marriageGoals));
    const [swipedClasses, setSwipedClasses] = useState<string>('');
    const notificationContext = useContext(NotificationContext);
    const navigate = useNavigate();

    // Chat system state
    const [chatWindows, setChatWindows] = useState<ChatWindowData[]>([]);
    const [randomInvitations, setRandomInvitations] = useState<RandomChatInvitation[]>([]);
    const [randomChatEnabled, setRandomChatEnabled] = useState(false);
    const [isMainChatOpen, setIsMainChatOpen] = useState(false);

    const removeTopCard = useCallback((direction: 'left' | 'right') => {
        const swipedUser = users[users.length - 1];
        if (direction === 'right' && notificationContext) {
            notificationContext.addNotification(
                NotificationType.Match,
                "Potential Match",
                `You expressed interest in ${swipedUser.name}.`,
                swipedUser
            );
        }
        setUsers(prev => prev.slice(0, -1));
        setSwipedClasses('');
    }, [users, notificationContext]);

    const handleSwipe = (direction: 'left' | 'right') => {
        if (users.length === 0) return;
        setSwipedClasses(direction === 'right' ? 'angled-swipe-right' : 'angled-swipe-left');
        setTimeout(() => removeTopCard(direction), 600);
    };

    const resetDeck = () => {
        setUsers(sampleUsers.filter(u => u.marriageGoals));
    };

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

    // Chat window management functions
    const openChatWindow = (user: User, messages?: Message[]) => {
        const newWindow: ChatWindowData = {
            id: `chat-${Date.now()}-${Math.random()}`,
            type: 'chat',
            user,
            messages: messages || [],
            isMinimized: false
        };
        
        setChatWindows(prev => [...prev, newWindow]);
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

    const handleSendMessage = (message: string) => {
        // This would typically send to backend
        console.log('Sending message:', message);
    };

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
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 p-4 md:p-8 bg-purple-50 dark:bg-gray-900 animate-fade-in">
            {/* Random Chat Toggle */}
            <div className="absolute top-4 left-4 z-20">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={randomChatEnabled}
                        onChange={(e) => setRandomChatEnabled(e.target.checked)}
                        className="w-5 h-5 text-neon-purple bg-gray-100 border-gray-300 rounded focus:ring-neon-purple focus:ring-2"
                    />
                    <span className="text-sm font-medium text-gray-800 dark:text-white">Random Chat</span>
                </label>
            </div>
            
            <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md h-[70vh] max-h-[650px]">
                    {users.length > 0 ? (
                        users.map((user, index) => {
                            const isTop = index === users.length - 1;
                            const cardStyle: React.CSSProperties = {
                                zIndex: index,
                                transform: `translateY(${(users.length - 1 - index) * -12}px) scale(${1 - (users.length - 1 - index) * 0.04})`,
                                opacity: 1 - (users.length - 1 - index) * 0.1,
                            };
                            return (
                                <div
                                    key={user.id}
                                    className={`absolute w-full h-full swipe-card-transition ${isTop ? swipedClasses : ''}`}
                                    style={cardStyle}
                                >
                                    <SwipeCard user={user} isTop={isTop} style={{}} />
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold font-heading text-gray-700 dark:text-gray-300">End of Profiles</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">You've seen everyone for now. Check back soon!</p>
                            <button onClick={resetDeck} className="mt-4 p-4 bg-neon-purple rounded-full text-white hover:scale-110 transition-transform">
                                <RefreshCwIcon />
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center space-x-4 md:space-x-8 mt-6 z-10">
                    <button onClick={() => handleSwipe('left')} className="p-5 rounded-full bg-white dark:bg-gray-700 shadow-lg text-gray-600 dark:text-gray-300 hover:scale-110 hover:text-red-500 transition-all duration-300">
                        <XIcon />
                    </button>
                    <button onClick={() => navigate('/chat')} className="p-5 rounded-full bg-white dark:bg-gray-700 shadow-lg text-blue-500 hover:scale-110 hover:text-blue-600 transition-all duration-300">
                        <MessageIcon />
                    </button>
                    <button onClick={() => handleSwipe('right')} className="p-7 rounded-full bg-gradient-to-br from-neon-purple to-indigo-600 shadow-xl text-white hover:scale-110 transition-transform duration-300">
                        <HeartIcon />
                    </button>
                </div>
            </div>
            <MarriageRegistrationPanel />

            {/* Random Chat Invitation Modals */}
            {randomInvitations.map(invitation => (
                <div key={invitation.id} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
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

            {/* Chat Windows - Fixed to bottom-right */}
            {chatWindows.map((chatWindow, index) => (
                <ChatWindow
                    key={chatWindow.id}
                    chatWindow={chatWindow}
                    onMinimize={handleMinimize}
                    onMaximize={handleMaximize}
                    onClose={handleClose}
                    onSendMessage={handleSendMessage}
                    isFixed={true}
                    position={{ 
                        x: chatWindow.isMinimized ? 20 + (index * 270) : 20 + (index * 370), 
                        y: 0 
                    }}
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
