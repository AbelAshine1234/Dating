import React from 'react';
import { MessageIcon } from '../constants';

interface DefaultChatButtonProps {
    onClick: () => void;
    hasUnreadMessages?: boolean;
}

export const DefaultChatButton: React.FC<DefaultChatButtonProps> = ({ 
    onClick, 
    hasUnreadMessages = false 
}) => {
    return (
        <div className="fixed bottom-4 right-4 z-40">
            <button
                onClick={onClick}
                className="relative w-14 h-14 bg-neon-purple hover:bg-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center text-white"
            >
                <MessageIcon />
                {hasUnreadMessages && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
                )}
            </button>
        </div>
    );
};
