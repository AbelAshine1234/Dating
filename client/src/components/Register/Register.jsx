import React from "react";
import "./Auth.css";

const Register = () => {
  return (
    <div className="auth-wrapper">
      <h2>Register</h2>
      <form className="auth-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="number" placeholder="Age" required />
        <select required>
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <button type="submit">Create Account</button>
        <p className="switch-link">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
