import React, { useState, useRef, useEffect } from 'react';
import { sampleChatPreviews, sampleChatRooms, currentUser } from '../data/sampleData';
import { ChatPreview, ChatRoomData } from '../types';
import { PhoneIcon, VideoIcon, SmileIcon, SendIcon, ArrowLeftIcon } from '../constants';

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

const ChatRoom: React.FC<{ chatRoom: ChatRoomData; onBack: () => void }> = ({ chatRoom, onBack }) => {
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatRoom.messages]);

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-r-2xl">
            <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <button onClick={onBack} className="md:hidden mr-2 p-2 text-gray-500 hover:text-neon-purple">
                        <ArrowLeftIcon />
                    </button>
                    <img src={chatRoom.user.image} alt={chatRoom.user.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                        <h3 className="font-bold font-heading text-lg text-gray-800 dark:text-white">{chatRoom.user.name}</h3>
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
                    {chatRoom.messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.senderId === currentUser.id ? 'bg-neon-purple text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                <p>{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.senderId === currentUser.id ? 'text-purple-200' : 'text-gray-500 dark:text-gray-400'} text-right`}>{msg.timestamp}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </main>
            <footer className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
                    <button className="text-gray-500 hover:text-neon-magenta"><SmileIcon /></button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent px-4 border-none focus:ring-0 text-gray-800 dark:text-gray-200 placeholder-gray-500"
                    />
                    <button className="text-neon-purple hover:scale-110 transition-transform"><SendIcon /></button>
                </div>
            </footer>
        </div>
    );
}

export const Chat: React.FC = () => {
    const [activeChatId, setActiveChatId] = useState<number | null>(sampleChatPreviews[0]?.id || null);
    const [isChatRoomVisible, setChatRoomVisible] = useState(false);
    const activeChatRoom = sampleChatRooms.find(cr => cr.id === activeChatId);

    const handleSelectChat = (id: number) => {
        setActiveChatId(id);
        setChatRoomVisible(true);
    };

    const handleBackToList = () => {
        setChatRoomVisible(false);
    }

    return (
        <div className="flex-grow container mx-auto p-4 md:p-8 animate-fade-in">
            <div className="h-[80vh] bg-white/50 dark:bg-dark-bg/50 backdrop-blur-lg rounded-2xl shadow-2xl flex overflow-hidden">
                <aside className={`w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-y-auto p-2 flex-col ${isChatRoomVisible ? 'hidden' : 'flex'} md:flex`}>
                    <h2 className="p-4 text-2xl font-bold font-heading text-gray-800 dark:text-white">Chats</h2>
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
                        <ChatRoom chatRoom={activeChatRoom} onBack={handleBackToList} />
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
        </div>
    );
};
