import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatModal from '../Chat/Chat';
import Footer from '../Footer/Footer';
import './ChatRoom.css';

// Sample contact list with conversation data, unread count, and online status
const initialContacts = [
  {
    id: 1,
    name: 'Liya',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    lastMessage: 'Pretty chill so far. You?',
    timestamp: '2025-08-14T07:37:00Z',
    unreadCount: 2,
    isOnline: true,
    messages: [
      { type: 'received', message: 'Hi there! 👋', timestamp: '10:02 AM' },
      { type: 'sent', message: "Hey! How's your day going?", timestamp: '10:03 AM' },
      { type: 'received', message: 'Pretty chill so far. You?', timestamp: '10:04 AM' },
    ],
  },
  {
    id: 2,
    name: 'Alex',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Wanna grab coffee later?',
    timestamp: '2025-08-14T07:22:00Z',
    unreadCount: 0,
    isOnline: false,
    messages: [
      { type: 'received', message: 'Yo, what’s up?', timestamp: '9:43 AM' },
      { type: 'sent', message: 'Just chilling, you?', timestamp: '9:44 AM' },
      { type: 'received', message: 'Wanna grab coffee later?', timestamp: '9:45 AM' },
    ],
  },
  {
    id: 3,
    name: 'Emma',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Loved our chat yesterday!',
    timestamp: '2025-08-14T06:50:00Z',
    unreadCount: 1,
    isOnline: true,
    messages: [
      { type: 'sent', message: 'Had fun talking!', timestamp: 'Yesterday, 8:00 PM' },
      { type: 'received', message: 'Loved our chat yesterday!', timestamp: '6:50 AM' },
    ],
  },
];

const ChatRoom = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sendMessage, setSendMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState({ text: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // Format timestamp to relative time
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffMs = now - messageDate;
    const diffMin = Math.round(diffMs / 60000); // Minutes
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin} min ago`;
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)} hr ago`;
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Filter contacts based on search query
  const filteredContacts = contacts
    .filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const toggleModal = (contact) => {
    if (contact) {
      // Mark messages as read when opening chat
      setContacts((prevContacts) =>
        prevContacts.map((c) =>
          c.id === contact.id ? { ...c, unreadCount: 0 } : c
        )
      );
    }
    setSelectedContact(contact);
    setIsModalVisible(!!contact);
  };

  const handleSendMessage = (message) => {
    if (!selectedContact || !message.trim()) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === selectedContact.id
          ? {
              ...contact,
              messages: [
                ...contact.messages,
                { type: 'sent', message, timestamp: timeString },
              ],
              lastMessage: message,
              timestamp: now.toISOString(),
              unreadCount: 0,
            }
          : contact
      )
    );
    setSendMessage('');

    // Simulate a received message for demo
    setTimeout(() => {
      const mockMessage = `Hey, got your message, ${selectedContact.name}!`;
      const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === selectedContact.id
            ? {
                ...contact,
                messages: [
                  ...contact.messages,
                  { type: 'received', message: mockMessage, timestamp: newTime },
                ],
                lastMessage: mockMessage,
                timestamp: new Date().toISOString(),
                unreadCount: isModalVisible ? 0 : contact.unreadCount + 1,
              }
            : contact
        )
      );
      setReceivedMessage({ text: mockMessage });
    }, 1000);
  };

  return (
    <>
      <div className="chat-room-container">
        <h3 className="chat-room-title">Messages</h3>
        <input
          type="text"
          placeholder="Search contacts..."
          className="chat-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="contact-list">
          {filteredContacts.length ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="contact-item"
                onClick={() => toggleModal(contact)}
                aria-label={`Chat with ${contact.name}`}
              >
                <div className="contact-avatar-container">
                  <img
                    src={contact.avatar}
                    alt={`${contact.name}'s avatar`}
                    className="contact-avatar"
                  />
                  {contact.isOnline && <span className="online-indicator"></span>}
                </div>
                <div className="contact-info">
                  <h4 className="contact-name">{contact.name}</h4>
                  <p className="contact-last-message">{contact.lastMessage}</p>
                </div>
                <div className="contact-meta">
                  <span className="contact-timestamp">
                    {formatTimestamp(contact.timestamp)}
                  </span>
                  {contact.unreadCount > 0 && (
                    <span className="unread-badge">{contact.unreadCount}</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="no-contacts">No contacts found</p>
          )}
        </div>
      </div>

      {selectedContact && (
        <ChatModal
          isVisible={isModalVisible}
          toggleModal={() => toggleModal(null)}
          chatMessages={selectedContact.messages}
          sendMessage={sendMessage}
          setSendMessage={setSendMessage}
          onSearch={handleSendMessage}
          receivedMessage={receivedMessage}
        />
      )}

      <Footer />
    </>
  );
};

export default ChatRoom;