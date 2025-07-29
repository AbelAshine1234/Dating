import React, { useState, useEffect, useRef } from "react";
import "./ChatRoom.css";

const initialMessages = [
  {
    sender: "them",
    text: "Hi there! 👋",
    timestamp: "10:02 AM",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    sender: "me",
    text: "Hey! How's your day going?",
    timestamp: "10:03 AM",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg"
  },
  {
    sender: "them",
    text: "Pretty chill so far. You?",
    timestamp: "10:04 AM",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const ChatRoom = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const chatEndRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim() && !image) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages([
      ...messages,
      {
        sender: "me",
        text: message.trim(),
        image: image ? URL.createObjectURL(image) : null,
        timestamp: timeString,
        avatar: "https://randomuser.me/api/portraits/men/66.jpg"
      }
    ]);
    setMessage("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <h3 className="chat-title">Chat with Liya</h3>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message-row ${msg.sender}`}>
            {msg.sender === "them" && (
              <img className="avatar" src={msg.avatar} alt="avatar" />
            )}
            <div className="message-bubble">
              {msg.image ? (
                <img className="message-image" src={msg.image} alt="sent pic" />
              ) : (
                <p className="message-text">{msg.text}</p>
              )}
              <span className="message-time">{msg.timestamp}</span>
            </div>
            {msg.sender === "me" && (
              <img className="avatar" src={msg.avatar} alt="avatar" />
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
          disabled={!!image}
        />
        <label htmlFor="image-upload" className="image-upload-label" title="Attach image">
          📎
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <button type="submit" disabled={!message.trim() && !image}>
          Send
        </button>
      </form>

      {image && (
        <div className="image-preview">
          <img src={URL.createObjectURL(image)} alt="preview" />
          <button onClick={() => setImage(null)} title="Remove image">✖</button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
