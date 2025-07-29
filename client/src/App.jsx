import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Subscription from "./components/Subscription/Subscription";
import SwipeDating from "./components/SwipeDating/SwipeDating.jsx";
import Calling from "./components/Calling/Calling";
import MarriageSwipe from "./components/MarriageSwipe/MarriageSwipe.jsx";
import MarriageRegistration from "./components/MarriageRegisteration/MarriageRegisteration";
import ProfileManagement from "./components/ProfileManagement/ProfileManagement.jsx";
import ChatRoom from "./components/ChatRoom/ChatRoom.jsx";

// Wrapper for protected routes (fake auth simulation)
const ProtectedApp = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="dating" element={<SwipeDating />} />
        <Route path="marriage" element={<MarriageSwipe />} />
        <Route path="marriage/register" element={<MarriageRegistration />} />
        <Route path="profile" element={<ProfileManagement />} />
        <Route path="chat" element={<ChatRoom />} />
        <Route path="subscription" element={<Subscription />} />
        <Route path="video-chat" element={<Subscription />} />
        <Route path="video-chat/call" element={<Calling />} />
        <Route path="*" element={<Navigate to="dating" replace />} />
      </Routes>
    </>
  );
};

const LoginWrapper = () => {
  const navigate = useNavigate();

  // Just a UI-only login handler: clicking login redirects to main app
  const handleLogin = (e) => {
    e.preventDefault();
    // Here you would do actual login logic, then navigate
    navigate("/dating");
  };

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", padding: 20, textAlign: "center", fontFamily: "Segoe UI, sans-serif" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input type="email" placeholder="Email" required style={{ padding: 10, fontSize: 16, borderRadius: 8, border: "1px solid #ccc" }} />
        <input type="password" placeholder="Password" required style={{ padding: 10, fontSize: 16, borderRadius: 8, border: "1px solid #ccc" }} />
        <button type="submit" style={{ padding: 12, fontSize: 16, borderRadius: 8, backgroundColor: "#e60073", color: "white", border: "none", cursor: "pointer" }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: 16 }}>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Start at /login */}
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/register" element={<Register />} />

        {/* Protected app routes */}
        <Route path="/*" element={<ProtectedApp />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
