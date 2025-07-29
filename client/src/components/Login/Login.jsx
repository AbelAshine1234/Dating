import React from "react";
import "./Auth.css";

const Login = () => {
  return (
    <div className="auth-wrapper">
      <h2>Login</h2>
      <form className="auth-form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p className="switch-link">Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
};

export default Login;
