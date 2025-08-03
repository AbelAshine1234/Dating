import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

// Import background image
import bgImage from "./assets/background2.jpg";

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
import Home from "./components/Home/Home.jsx";

// Wrapper for protected routes
const ProtectedApp = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="home" element={<Home />} />
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

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        color: "#333",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: 400,
          width: "100%",
          padding: 30,
          borderRadius: 16,
          backgroundColor: "rgba(255, 255, 255, 0.25)", // Transparent white
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#8b0000", marginBottom: 20, fontWeight: "600" }}>
          Welcome Back ❤️
        </h2>
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <input
            type="email"
            placeholder="Email"
            required
            style={{
              padding: 12,
              fontSize: 16,
              borderRadius: 10,
              border: "1px solid #ccc",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              color: "#333",
              fontFamily: "inherit",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            style={{
              padding: 12,
              fontSize: 16,
              borderRadius: 10,
              border: "1px solid #ccc",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              color: "#333",
              fontFamily: "inherit",
            }}
          />
          <button
            type="submit"
            style={{
              padding: 12,
              fontSize: 16,
              borderRadius: 10,
              backgroundColor: "#8b0000",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              transition: "opacity 0.3s ease",
            }}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: 16, fontSize: 14 }}>
          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#8b0000",
              textDecoration: "underline",
              fontWeight: "500",
            }}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<ProtectedApp />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
