import React, { useState, useContext, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleUsers, filterData } from '../data/sampleData';
import { User, NotificationType } from '../types';
import { SwipeCard } from '../components/SwipeCard';
import { NotificationContext } from '../context/NotificationContext';
import { HeartIcon, XIcon, PhoneIcon, VideoIcon, MessageIcon, RefreshCwIcon, FilterIcon } from '../constants';

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
  
  const currentUser = users.length > 0 ? users[users.length - 1] : null;

  const handleReligionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedReligion(e.target.value);
      setSelectedCaste(''); // Reset caste when religion changes
  }

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 bg-gray-200 dark:bg-gray-900 overflow-hidden relative animate-fade-in">
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-end">
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
    </div>
  );
};