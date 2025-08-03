import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../../assets/background2.jpg";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register form submitted");
    navigate("/login");
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
            maxWidth: 420,
            width: "100%",
            padding: 30,
            borderRadius: 16,
            backgroundColor: "rgba(255, 255, 255, 0.25)", // Transparent white
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
            textAlign: "center",
            animation: "fadeIn 1s ease-in-out",
            color: "#333",
          }}
        >
          <h2 style={{ color: "#8b0000", marginBottom: "1rem", fontWeight: "600" }}>
            Create Account 💕
          </h2>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <input type="text" placeholder="Full Name" required style={inputStyle} />
            <input type="email" placeholder="Email" required style={inputStyle} />
            <input type="password" placeholder="Password" required style={inputStyle} />
            <input type="number" placeholder="Age" required style={inputStyle} />
            <select required style={inputStyle}>
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <button type="submit" style={buttonStyle}>Create Account</button>
            <p style={{ marginTop: 16, fontSize: 14 }}>
              Already have an account?{" "}
              <a href="/login" style={{ color: "#8b0000", textDecoration: "underline" }}>
                Login
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

export default Register;
