import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../store/hooks";
import { chatAPI, userAPI } from "../../services/api";
import BrowseUsers from "../BrowseUsers/BrowseUsers";
import "./ChatRoom.css";
import Footer from "../Footer/Footer";

const ChatRoom = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(true);
  const [showBrowseUsers, setShowBrowseUsers] = useState(false);
  const chatEndRef = useRef(null);

  // Load users on component mount
  useEffect(() => {
    if (user) {
      loadAllUsers();
    }
  }, [user]);

  // Load messages when a user is selected
  useEffect(() => {
    if (selectedUser) {
      loadMessages(selectedUser.id);
    }
  }, [selectedUser]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadAllUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers();
      // Filter out the current user from the list
      const filteredUsers = response.filter(u => u.id !== user.id);
      setUsers(filteredUsers);
    } catch (error) {
      setError("Failed to load users");
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (otherUserId) => {
    try {
      setLoading(true);
      const response = await chatAPI.getConversation(otherUserId);
      setMessages(response.messages || []);
      setError("");
    } catch (error) {
      setError("Failed to load messages");
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!selectedUser) {
      setError("Please select a user to chat with");
      return;
    }

    try {
      setLoading(true);
      const response = await chatAPI.sendMessage(selectedUser.id, message.trim());
      
      // Add the new message to the messages array
      setMessages(prev => [...prev, response.chat]);
      setMessage("");
      setError("");
    } catch (error) {
      setError("Failed to send message");
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setShowUserList(false);
    setShowBrowseUsers(false);
    setError("");
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  const handleBrowseUsers = () => {
    setShowBrowseUsers(true);
    setShowUserList(false);
    setSelectedUser(null);
    setMessages([]);
  };

  const handleBackFromBrowse = () => {
    setShowBrowseUsers(false);
    setShowUserList(true);
  };

  const handleGetAllUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers();
      // Filter out the current user from the list
      const filteredUsers = response.filter(u => u.id !== user.id);
      setUsers(filteredUsers);
      setError("");
    } catch (error) {
      setError("Failed to load all users");
      console.error("Error loading all users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="chat-container">
        <div className="no-auth-message">
          <h2>Please log in to access chat</h2>
          <p>You need to be logged in to use the chat feature.</p>
        </div>
      </div>
    );
  }

  // Show BrowseUsers component
  if (showBrowseUsers) {
    return (
      <>
        <BrowseUsers 
          onUserSelect={selectUser}
          onBack={handleBackFromBrowse}
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="chat-container">
        {/* User List Sidebar */}
        {showUserList && (
          <div className="chat-sidebar">
            <div className="sidebar-header">
              <h3>💬 Chat with Users</h3>
              <p>Select a user to start chatting</p>
            </div>
            
            <div className="browse-users-button-container">
              <button 
                className="browse-all-users-btn"
                onClick={handleBrowseUsers}
              >
                🔍 Browse All Users
              </button>
              <button 
                className="get-all-users-btn"
                onClick={handleGetAllUsers}
                disabled={loading}
              >
                {loading ? "Loading..." : "🔄 Get All Users"}
              </button>
            </div>
            
            {loading && users.length === 0 ? (
              <div className="loading-message">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="no-users-message">
                <p>No users found</p>
                <button onClick={loadAllUsers} className="refresh-btn">
                  Refresh Users
                </button>
              </div>
            ) : (
              <div className="user-list">
                {users.map((otherUser) => (
                  <div 
                    key={otherUser.id}
                    className={`user-item ${selectedUser?.id === otherUser.id ? 'active' : ''}`}
                    onClick={() => selectUser(otherUser)}
                  >
                    <div className="user-avatar">
                      <img 
                        src={`https://randomuser.me/api/portraits/${otherUser.gender === 'female' ? 'women' : 'men'}/${otherUser.id % 70}.jpg`} 
                        alt={otherUser.fullName} 
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${otherUser.fullName}&background=random`;
                        }}
                      />
                    </div>
                    <div className="user-info">
                      <h4>{otherUser.fullName}</h4>
                      <p>{otherUser.occupation || 'No occupation listed'}</p>
                      <small>{otherUser.gender} • {otherUser.lookingFor}</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chat Main Area */}
        <div className="chat-main">
          {selectedUser ? (
            <>
              <div className="chat-header">
                <button 
                  className="back-btn"
                  onClick={() => {
                    setShowUserList(true);
                    setSelectedUser(null);
                    setMessages([]);
                  }}
                >
                  ← Back to Users
                </button>
                <div className="chat-user-info">
                  <img 
                    src={`https://randomuser.me/api/portraits/${selectedUser.gender === 'female' ? 'women' : 'men'}/${selectedUser.id % 70}.jpg`} 
                    alt={selectedUser.fullName}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${selectedUser.fullName}&background=random`;
                    }}
                  />
                  <div>
                    <h3>{selectedUser.fullName}</h3>
                    <p>{selectedUser.occupation || 'No occupation listed'}</p>
                  </div>
                </div>
              </div>
              
              <div className="chat-box">
                {loading && messages.length === 0 ? (
                  <div className="loading">Loading messages...</div>
                ) : messages.length === 0 ? (
                  <div className="no-messages">
                    <h3>No messages yet</h3>
                    <p>Start the conversation by sending a message!</p>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <div key={i} className={`message-row ${msg.senderId === user.id ? 'me' : 'them'}`}>
                      {msg.senderId !== user.id && (
                        <img 
                          className="avatar" 
                          src={`https://randomuser.me/api/portraits/${selectedUser.gender === 'female' ? 'women' : 'men'}/${selectedUser.id % 70}.jpg`} 
                          alt="avatar"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${selectedUser.fullName}&background=random`;
                          }}
                        />
                      )}
                      <div className="message-bubble">
                        <p className="message-text">{msg.message}</p>
                        <span className="message-time">{formatTime(msg.createdAt)}</span>
                      </div>
                      {msg.senderId === user.id && (
                        <img 
                          className="avatar" 
                          src={`https://randomuser.me/api/portraits/${user.gender === 'female' ? 'women' : 'men'}/${user.id % 70}.jpg`} 
                          alt="avatar"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${user.fullName}&background=random`;
                          }}
                        />
                      )}
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>

              {error && <div className="error-message">{error}</div>}

              <form className="chat-input" onSubmit={handleSend}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={loading}
                />
                <button type="submit" disabled={loading || !message.trim()}>
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="welcome-message">
                <h2>Welcome to Chat! 💬</h2>
                <p>Select a user from the list or browse all users to start a conversation</p>
                <div className="chat-features">
                  <div className="feature">
                    <span>👥</span>
                    <p>Browse all users</p>
                  </div>
                  <div className="feature">
                    <span>💬</span>
                    <p>Send messages</p>
                  </div>
                  <div className="feature">
                    <span>📱</span>
                    <p>Real-time chat</p>
                  </div>
                </div>
                <button 
                  className="browse-all-users-btn-large"
                  onClick={handleBrowseUsers}
                >
                  🔍 Browse All Users
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ChatRoom;
