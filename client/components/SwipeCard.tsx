import React from 'react';
import { User } from '../types';

interface SwipeCardProps {
  user: User;
  isTop: boolean;
  style: React.CSSProperties;
  overlay?: { content: string; color: string } | null;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ user, isTop, style, overlay }) => {
  return (
    <div
      className={`absolute w-full h-full rounded-2xl shadow-2xl overflow-hidden bg-gray-300 dark:bg-gray-700 ${!isTop ? 'swipe-card-transition' : ''}`}
      style={style}
    >
      <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-3xl font-bold text-white font-heading">{user.name}, {user.age}</h3>
        {user.occupation && <p className="text-lg text-gray-200">{user.occupation}</p>}
        {user.location && <p className="text-md text-gray-300">{user.location}</p>}
        {user.marriageGoals && <p className="text-md text-gray-200 mt-2 italic">"{user.marriageGoals}"</p>}
      </div>
      {overlay && (
         <div className={`absolute top-6 right-6 text-2xl font-bold border-4 p-2 rounded-lg transition-opacity duration-300 opacity-100`}
           style={{ color: overlay.color, borderColor: overlay.color }}>
          {overlay.content}
         </div>
       )}
    </div>
  );
};
