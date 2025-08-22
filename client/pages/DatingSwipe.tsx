import React, { useState, useContext, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleUsers, filterData, currentUser } from '../data/sampleData';
import { User, NotificationType, Message } from '../types';
import { SwipeCard } from '../components/SwipeCard';
import { NotificationContext } from '../context/NotificationContext';
import { HeartIcon, XIcon, PhoneIcon, VideoIcon, MessageIcon, RefreshCwIcon, FilterIcon } from '../constants';
import { ChatWindow, ChatWindowData, RandomChatInvitation } from '../components/ChatWindow';
import { MainChatWindow } from '../components/MainChatWindow';
import { DefaultChatButton } from '../components/DefaultChatButton';

const ActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; className: string }> = ({ onClick, children, className }) => (
  <button onClick={onClick} className={`p-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 ${className}`}>
    {children}
  </button>
);

const SignUpForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const navigate = useNavigate();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/profile-completion');
    };
    
    return (
    <div className="absolute bottom-24 right-4 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-8 bg-white/20 dark:bg-black/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-80 z-20 animate-fade-in border border-white/20">
        <button onClick={onClose} className="absolute top-2 right-3 text-white text-2xl">&times;</button>
        <h3 className="text-2xl font-bold font-heading text-white mb-4 text-center">Sign Up Now!</h3>
        <form onSubmit={handleSignup} className="space-y-3">
            <input type="text" placeholder="Name" required className="w-full bg-white/30 text-white placeholder-gray-300 p-2 rounded-md border-0 focus:ring-2 focus:ring-neon-magenta" />
            <input type="email" placeholder="Email" required className="w-full bg-white/30 text-white placeholder-gray-300 p-2 rounded-md border-0 focus:ring-2 focus:ring-neon-magenta" />
            <input type="password" placeholder="Password" required className="w-full bg-white/30 text-white placeholder-gray-300 p-2 rounded-md border-0 focus:ring-2 focus:ring-neon-magenta" />
            <div className="flex gap-2">
                <select required className="w-full bg-white/30 text-white p-2 rounded-md border-0 focus:ring-2 focus:ring-neon-magenta appearance-none text-center custom-select">
                    <option value="" className="text-gray-500">Gender</option>
                    <option value="male" className="text-black">Male</option>
                    <option value="female" className="text-black">Female</option>
                    <option value="other" className="text-black">Other</option>
                </select>
                <input type="number" placeholder="Age" required className="w-full bg-white/30 text-white placeholder-gray-300 p-2 rounded-md border-0 focus:ring-2 focus:ring-neon-magenta" />
            </div>
            <button type="submit" className="w-full py-2 bg-gradient-to-r from-neon-magenta to-neon-purple text-white font-bold rounded-md hover:scale-105 transition-transform">
                Create Account
            </button>
        </form>
    </div>
)};

export const DatingSwipe: React.FC = () => {
  const [showSignUp, setShowSignUp] = useState(true);
  const [swipedClasses, setSwipedClasses] = useState('');
  const [overlay, setOverlay] = useState<{content: string, color: string} | null>(null);
  
  const [selectedReligion, setSelectedReligion] = useState('');
  const [selectedCaste, setSelectedCaste] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Chat system state
  const [chatWindows, setChatWindows] = useState<ChatWindowData[]>([]);
  const [randomInvitations, setRandomInvitations] = useState<RandomChatInvitation[]>([]);
  const [randomChatEnabled, setRandomChatEnabled] = useState(false);
  const [isMainChatOpen, setIsMainChatOpen] = useState(false);

  const filteredUsers = useMemo(() => {
    let users = sampleUsers;
    if (selectedReligion && selectedReligion !== 'all') {
      users = users.filter(u => u.religion === selectedReligion);
    }
    if (selectedCaste && selectedCaste !== 'all') {
      users = users.filter(u => u.caste === selectedCaste);
    }
    return users;
  }, [selectedReligion, selectedCaste]);
  
  const [users, setUsers] = useState<User[]>(filteredUsers.slice(0, 5));
  
  const notificationContext = useContext(NotificationContext);
  const navigate = useNavigate();

  const removeTopCard = useCallback((direction: 'left' | 'right') => {
    const swipedUser = users[users.length - 1];
    if (direction === 'right') {
        notificationContext?.addNotification(NotificationType.Match, "It's a Match!", `You and ${swipedUser.name} liked each other.`, swipedUser);
    }
    setUsers(prev => prev.slice(0, -1));
    setSwipedClasses('');
    setOverlay(null);
  }, [users, notificationContext]);
  
  const handleSwipe = (direction: 'left' | 'right') => {
      if (users.length === 0) return;
      const overlayContent = direction === 'right' ? { content: 'LIKE', color: '#34D399' } : { content: 'NOPE', color: '#F87171' };
      setOverlay(overlayContent);
      setSwipedClasses(direction === 'right' ? 'angled-swipe-right' : 'angled-swipe-left');
      setTimeout(() => removeTopCard(direction), 600);
  }

  const resetDeck = useCallback(() => {
    setUsers(filteredUsers.slice(0, 5));
  }, [filteredUsers]);

  React.useEffect(() => {
    resetDeck();
  }, [filteredUsers, resetDeck]);

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
  
  const currentUser = users.length > 0 ? users[users.length - 1] : null;

  const handleReligionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedReligion(e.target.value);
      setSelectedCaste(''); // Reset caste when religion changes
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 bg-gray-200 dark:bg-gray-900 overflow-hidden relative animate-fade-in">
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
            {/* Random Chat Toggle */}
            <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={randomChatEnabled}
                        onChange={(e) => setRandomChatEnabled(e.target.checked)}
                        className="w-5 h-5 text-neon-purple bg-gray-100 border-gray-300 rounded focus:ring-neon-purple focus:ring-2"
                    />
                    <span className="text-sm font-medium text-white">Random Chat</span>
                </label>
            </div>
            
            {/* Filter Button */}
            <button onClick={() => setShowFilters(!showFilters)} className="p-2 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-md text-neon-purple">
                <FilterIcon />
            </button>
        </div>

        {showFilters && (
            <div className="absolute top-16 right-4 z-20 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md p-4 rounded-lg shadow-lg w-72 animate-fade-in">
                <h4 className="font-heading font-bold mb-2">Filters</h4>
                <div className="space-y-3">
                    <select value={selectedReligion} onChange={handleReligionChange} className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:ring-2 focus:ring-neon-purple">
                        <option value="">All Religions</option>
                        {Object.keys(filterData).map(r => <option key={r} value={r} className="capitalize">{r}</option>)}
                    </select>
                    <select value={selectedCaste} onChange={e => setSelectedCaste(e.target.value)} disabled={!selectedReligion || selectedReligion === 'all'} className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:ring-2 focus:ring-neon-purple disabled:opacity-50">
                        <option value="">All Castes</option>
                        {selectedReligion && filterData[selectedReligion as keyof typeof filterData]?.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
        )}

        <div className="relative w-full max-w-sm h-[70vh] max-h-[600px] flex items-center justify-center">
        {users.length > 0 ? (
          users.map((user, index) => {
            const isTop = index === users.length - 1;
            const style = {
              transform: `translateY(${(users.length - 1 - index) * -10}px) scale(${1 - (users.length - 1 - index) * 0.05})`,
              opacity: 1 - (users.length - 1 - index) * 0.1,
              zIndex: index,
            };

            return (
              <div
                key={user.id}
                className={`absolute w-full h-full swipe-card-transition ${isTop ? swipedClasses : ''}`}
                style={isTop ? { zIndex: index } : style}
              >
                <SwipeCard user={user} isTop={isTop} style={{}} overlay={isTop ? overlay : null}/>
              </div>
            );
          })
        ) : (
          <div className="text-center p-8 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl">
            <h2 className="text-2xl font-bold font-heading text-gray-700 dark:text-gray-300">No more matches!</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Adjust your filters or check back later.</p>
            <button onClick={resetDeck} className="mt-4 p-4 bg-neon-purple rounded-full text-white hover:scale-110 transition-transform">
                <RefreshCwIcon/>
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center space-x-2 md:space-x-4 mt-6 z-10">
        <ActionButton onClick={() => handleSwipe('left')} className="bg-white shadow-lg text-red-500 hover:bg-red-100"><XIcon /></ActionButton>
        <ActionButton onClick={() => navigate('/chat')} className="bg-white shadow-lg text-blue-500 hover:bg-blue-100"><MessageIcon /></ActionButton>
        <ActionButton onClick={() => currentUser && navigate(`/call/${currentUser.id}?type=voice`)} className="bg-white shadow-lg text-green-500 hover:bg-green-100"><PhoneIcon /></ActionButton>
        <ActionButton onClick={() => handleSwipe('right')} className="bg-gradient-to-r from-neon-magenta to-neon-purple shadow-xl text-white"><HeartIcon /></ActionButton>
        <ActionButton onClick={() => currentUser && navigate(`/call/${currentUser.id}?type=video`)} className="bg-white shadow-lg text-purple-500 hover:bg-purple-100"><VideoIcon /></ActionButton>
      </div>
      
      {showSignUp && <SignUpForm onClose={() => setShowSignUp(false)} />}

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