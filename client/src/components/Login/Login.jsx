import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAuth } from "../../store/hooks";
import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";
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
      // Simulate API call - replace with actual API endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(loginSuccess({
          user: data.user,
          token: data.token,
        }));
        navigate('/home');
      } else {
        const errorData = await response.json();
        dispatch(loginFailure(errorData.message || 'Login failed'));
      }
    } catch (error) {
      dispatch(loginFailure('Network error. Please try again.'));
    }
  };

  return (
    <div className="auth-wrapper">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="switch-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
