import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAppDispatch, useAuth } from "./store/hooks";
import { loginSuccess, logout } from "./store/slices/authSlice";

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
import ReduxExample from "./components/ReduxExample/ReduxExample.jsx";

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
        <Route path="x" element={<ReduxExample />} />
        <Route path="video-chat/call" element={<Calling />} />
        <Route path="*" element={<Navigate to="dating" replace />} />
      </Routes>
    </>
  );
};

const App = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Check if user is authenticated on app load
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        dispatch(loginSuccess({
          user: userData,
          token: token
        }));
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(logout());
      }
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        color: "#333",
      }}>
        <div style={{
          padding: 30,
          borderRadius: 16,
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
          textAlign: "center",
        }}>
          <h2 style={{ color: "#8b0000", marginBottom: 20, fontWeight: "600" }}>
            Loading... ❤️
          </h2>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/home" replace /> : <Register />} />
        <Route path="/*" element={isAuthenticated ? <ProtectedApp /> : <Navigate to="/login" replace />} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
