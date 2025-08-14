import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAuth } from "../../store/hooks";
import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";
import { authAPI } from "../../services/api";
import backgroundImg from "../../assets/background2.jpg";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch(loginStart());
    
    try {
      const data = await authAPI.login(formData);
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      dispatch(loginSuccess({
        user: data.user,
        token: data.token,
      }));
      
      navigate('/home');
    } catch (error) {
      dispatch(loginFailure(error.message || 'Login failed'));
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
      `}</style>

      <div
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 400,
            width: "100%",
            padding: 30,
            borderRadius: 16,
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
            textAlign: "center",
            animation: "fadeIn 1s ease-in-out",
            color: "#333",
          }}
        >
          <h2 style={{ color: "#8b0000", marginBottom: "1rem", fontWeight: "600" }}>
            Welcome Back ❤️
          </h2>
          
          {error && (
            <div style={{ 
              color: "#d32f2f", 
              backgroundColor: "rgba(211, 47, 47, 0.1)", 
              padding: "8px", 
              borderRadius: "4px", 
              marginBottom: "16px" 
            }}>
              {error}
            </div>
          )}
          
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <button 
              type="submit" 
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
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
          </form>
        </div>
      </div>
    </>
  );
};

const inputStyle = {
  padding: 12,
  fontSize: 16,
  borderRadius: 10,
  border: "1px solid #ccc",
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  color: "#333",
  fontFamily: "inherit",
};

const buttonStyle = {
  padding: 12,
  fontSize: 16,
  borderRadius: 10,
  backgroundColor: "#8b0000",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  transition: "opacity 0.3s ease",
};

export default Login;
