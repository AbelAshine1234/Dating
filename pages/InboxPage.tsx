import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockConversations, mockUsers } from '../data/mocks';
import { Conversation, Message, User } from '../types';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import VideoCallModal from '../components/ui/VideoCallModal';
import PhoneCallModal from '../components/ui/PhoneCallModal';
import { BeatLoader } from 'react-spinners';
import { FaPaperclip, FaSmile, FaVideo, FaCheckDouble, FaSearch, FaPhone, FaArrowLeft } from 'react-icons/fa';

const InboxPage: React.FC = () => {
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();
    const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    
    // State for modals and interactions
    const [isConnecting, setIsConnecting] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
    const [isPhoneCallOpen, setIsPhoneCallOpen] = useState(false);
    const [callUser, setCallUser] = useState<User | null>(null);

    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedConversation?.messages]);

    const handleRandomChat = () => {
        setIsConnecting(true);
        setTimeout(() => {
            const randomUser = mockUsers.find(u => !conversations.some(c => c.userId === u.id) && u.id !== currentUser?.id) || mockUsers.find(u => u.id !== currentUser?.id);
            if (!randomUser) { setIsConnecting(false); return; }
            const newConversation: Conversation = {
                userId: randomUser.id, userName: randomUser.name, avatar: randomUser.photoUrl,
                lastMessage: "You are now connected!", timestamp: "Just now", unreadCount: 0,
                messages: [{ id: 1, senderId: randomUser.id, text: "Hi! We just connected randomly.", timestamp: "Just now" }]
            };
            setConversations(prev => [newConversation, ...prev]);
            setSelectedConversation(newConversation);
            setIsConnecting(false);
        }, 2000);
    };

    const handleSendMessage = () => {
        if (message.trim() === '' || !selectedConversation) return;
        
        const newMessage: Message = { id: Date.now(), senderId: 'me', text: message, timestamp: 'Just now', read: false };
        const updatedMessages = [...selectedConversation.messages, newMessage];
        const updatedConversation = { ...selectedConversation, messages: updatedMessages, lastMessage: message };
        
        updateConversation(updatedConversation);
        setMessage('');

        setIsTyping(true);
        setTimeout(() => {
            const replyMessage: Message = { id: Date.now() + 1, senderId: selectedConversation.userId, text: "Thanks for your message!", timestamp: 'Just now' };
            const finalMessages = [...updatedMessages, replyMessage];
            const finalConversation = { ...updatedConversation, messages: finalMessages, lastMessage: replyMessage.text };
            updateConversation(finalConversation);
            setIsTyping(false);
        }, 2000);
    };
    
    const updateConversation = (updatedConvo: Conversation) => {
        setSelectedConversation(updatedConvo);
        setConversations(conversations.map(c => c.userId === updatedConvo.userId ? updatedConvo : c));
    }
    
    const handleInitiateCall = (type: 'video' | 'phone') => {
        if (!currentUser?.isPremium) {
            setShowUpgradeModal(true); return;
        }
        if (selectedConversation) {
            const targetUser = mockUsers.find(u => u.id === selectedConversation.userId);
            if (targetUser) {
                setCallUser(targetUser);
                if (type === 'video') setIsVideoCallOpen(true);
                else setIsPhoneCallOpen(true);
            }
        }
    };
    
    const filteredMessages = selectedConversation?.messages.filter(m => m.text.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="container mx-auto p-0 sm:p-4 h-[calc(100vh-120px)] flex flex-col">
            {/* Modals */}
             <Modal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} title="Upgrade to Premium">
                <p className="mb-6 text-gray-600">You need to be a Premium member to make calls. Upgrade now to connect face-to-face!</p>
                <Button className="w-full" onClick={() => { setShowUpgradeModal(false); navigate('/payment'); }}>Upgrade Now</Button>
            </Modal>
            {isVideoCallOpen && callUser && currentUser && ( <VideoCallModal isOpen={isVideoCallOpen} onClose={() => setIsVideoCallOpen(false)} user={callUser} caller={currentUser} /> )}
            {isPhoneCallOpen && callUser && currentUser && ( <PhoneCallModal isOpen={isPhoneCallOpen} onClose={() => setIsPhoneCallOpen(false)} user={callUser} /> )}

            <div className="flex w-full bg-white rounded-lg shadow-lg overflow-hidden flex-grow relative">
                {/* Conversation List */}
                <aside className={`w-full md:w-1/3 border-r flex-col ${selectedConversation && 'hidden md:flex'}`}>
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold">Inbox</h2>
                        <Button onClick={handleRandomChat} className="w-full mt-4" disabled={isConnecting}>
                            {isConnecting ? <BeatLoader size={8} color="white" /> : 'Random Chat'}
                        </Button>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        {conversations.map(convo => (
                            <div key={convo.userId} onClick={() => setSelectedConversation(convo)} className={`p-4 flex items-center cursor-pointer hover:bg-gray-100 ${selectedConversation?.userId === convo.userId ? 'bg-red-50' : ''}`}>
                                <img src={convo.avatar} alt={convo.userName} className="w-12 h-12 rounded-full mr-4" />
                                <div className="flex-grow"><h3 className="font-semibold">{convo.userName}</h3><p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p></div>
                                {convo.unreadCount > 0 && <span className="bg-[#e42525] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-2">{convo.unreadCount}</span>}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Chat Window */}
                <main className={`w-full md:w-2/3 flex-col ${!selectedConversation && 'hidden md:flex'}`}>
                    {selectedConversation ? (
                        <>
                            <div className="p-4 border-b flex items-center justify-between">
                                <div className="flex items-center">
                                    <button onClick={() => setSelectedConversation(null)} className="md:hidden mr-3 text-gray-600"><FaArrowLeft size={20} /></button>
                                    <img src={selectedConversation.avatar} alt={selectedConversation.userName} className="w-10 h-10 rounded-full mr-3" />
                                    <h3 className="font-bold text-lg">{selectedConversation.userName}</h3>
                                </div>
                                <div className="flex items-center space-x-2 sm:space-x-4">
                                    <div className="relative hidden sm:block">
                                        <input type="text" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full p-2 pl-8 border rounded-full text-sm"/>
                                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                                    </div>
                                    <button onClick={() => handleInitiateCall('phone')} className="text-gray-500 hover:text-[#e42525] p-2 rounded-full transition-colors"><FaPhone size={18} /></button>
                                    <button onClick={() => handleInitiateCall('video')} className="text-gray-500 hover:text-[#e42525] p-2 rounded-full transition-colors"><FaVideo size={20} /></button>
                                </div>
                            </div>
                            <div className="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-4">
                                {filteredMessages?.map(msg => (
                                    <div key={msg.id} className={`flex items-end gap-2 ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`p-3 rounded-lg max-w-xs sm:max-w-sm ${msg.senderId === 'me' ? 'bg-[#e42525] text-white' : 'bg-gray-200'}`}>
                                            <p>{msg.text}</p>
                                            <div className={`text-xs mt-1 flex items-center justify-end gap-1 ${msg.senderId === 'me' ? 'text-red-100' : 'text-gray-500'}`}>
                                                <span>{msg.timestamp}</span>
                                                {msg.senderId === 'me' && <FaCheckDouble className={msg.read ? 'text-blue-300' : 'text-gray-300'} />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && <div className="text-gray-500 text-sm"><em>{selectedConversation.userName} is typing...</em></div>}
                                <div ref={chatEndRef} />
                            </div>
                            <div className="p-4 border-t bg-white">
                                <div className="flex items-center">
                                    <input type="text" placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500"/>
                                    <button className="p-3 border-y border-r text-gray-600 hover:bg-gray-100"><FaSmile /></button>
                                    <button className="p-3 border-y text-gray-600 hover:bg-gray-100"><FaPaperclip /></button>
                                    <Button onClick={handleSendMessage} className="rounded-l-none">Send</Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="hidden md:flex items-center justify-center h-full text-gray-500"><p>Select a conversation to start chatting.</p></div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default InboxPage;
