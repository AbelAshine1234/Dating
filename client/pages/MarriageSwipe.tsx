import React, { useState, useCallback, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sampleUsers } from '../data/sampleData';
import { User, NotificationType } from '../types';
import { SwipeCard } from '../components/SwipeCard';
import { NotificationContext } from '../context/NotificationContext';
import { HeartIcon, XIcon, RefreshCwIcon, MessageIcon } from '../constants';

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

    return (
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-8 p-4 md:p-8 bg-purple-50 dark:bg-gray-900 animate-fade-in">
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
        </div>
    );
};
