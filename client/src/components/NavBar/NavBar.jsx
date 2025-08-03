import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => (   
   <nav className="nav-bar">
      <div className="nav-brand">❤️ DateMatch</div>
      <div className="nav-links">
        <Link to="/dating">Dating</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/video-chat">Video Chat</Link>
        <Link to="/marriage">Marriage</Link>
        <Link to="/marriage/register">Marriage Registration</Link>
      </div>
    </nav>
);

export default NavBar; 