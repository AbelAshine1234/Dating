
import React, { useContext, useEffect, useState } from 'react';
import { NotificationContext } from '../context/NotificationContext';
import { Notification, NotificationType } from '../types';
import { HeartIcon, PhoneIcon, MessageIcon } from '../constants';

const NotificationCard: React.FC<{ notification: Notification; onDismiss: (id: number) => void }> = ({ notification, onDismiss }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
        }, 5000); // 5 seconds to dismiss

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isExiting) {
            const timer = setTimeout(() => {
                onDismiss(notification.id);
            }, 500); // matches animation duration
            return () => clearTimeout(timer);
        }
    }, [isExiting, onDismiss, notification.id]);

    const getIcon = () => {
        switch (notification.type) {
            case NotificationType.Match:
                return <HeartIcon />;
            case NotificationType.Call:
                return <PhoneIcon />;
            case NotificationType.Message:
                return <MessageIcon />;
            default:
                return null;
        }
    };
    
    const getAccentColor = () => {
         switch (notification.type) {
            case NotificationType.Match:
                return 'border-neon-magenta text-neon-magenta';
            case NotificationType.Call:
                return 'border-green-400 text-green-400';
            case NotificationType.Message:
                return 'border-blue-400 text-blue-400';
            default:
                return 'border-neon-purple text-neon-purple';
        }
    }

    return (
        <div className={`relative flex items-start gap-4 p-4 mb-4 max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border-l-4 ${getAccentColor()} ${isExiting ? 'animate-slide-out' : 'animate-slide-in'}`}>
            {notification.user?.image && (
                <img src={notification.user.image} alt={notification.user.name} className="w-12 h-12 rounded-full object-cover" />
            )}
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-lg">{getIcon()}</span>
                    <h4 className="font-bold font-heading text-gray-800 dark:text-white">{notification.title}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
            </div>
             <button onClick={() => setIsExiting(true)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                &times;
             </button>
        </div>
    );
}

export const FloatingNotificationContainer: React.FC = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    return null;
  }
  
  const { notifications, removeNotification } = context;

  return (
    <div className="fixed top-24 right-4 z-50">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} onDismiss={removeNotification} />
      ))}
    </div>
  );
};
