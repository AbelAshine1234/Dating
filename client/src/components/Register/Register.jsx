import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { loginStart, loginSuccess, loginFailure } from "../../store/slices/authSlice";
import { authAPI } from "../../services/api";
import backgroundImg from "../../assets/background2.jpg";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    lookingFor: "dating",
    description: "",
    occupation: "",
    education: "",
    religion: "",
    caste: "",
  });
  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.password || !formData.gender) {
        throw new Error("Please fill in all required fields");
      }

      // Create user data with images
      const userData = {
        ...formData,
        images: images,
      };

      const data = await authAPI.register(userData);
      
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update Redux state
      dispatch(loginSuccess({
        user: data.user,
        token: data.token,
      }));
      
      navigate("/home");
    } catch (error) {
      setError(error.message || "Registration failed");
    } finally {
      setLoading(false);
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
            maxWidth: 420,
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
            Create Account 💕
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
              type="text" 
              name="fullName"
              placeholder="Full Name *" 
              value={formData.fullName}
              onChange={handleChange}
              required 
              style={inputStyle} 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email *" 
              value={formData.email}
              onChange={handleChange}
              required 
              style={inputStyle} 
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password *" 
              value={formData.password}
              onChange={handleChange}
              required 
              style={inputStyle} 
            />
            <input 
              type="date" 
              name="dateOfBirth"
              placeholder="Date of Birth" 
              value={formData.dateOfBirth}
              onChange={handleChange}
              style={inputStyle} 
            />
            <select 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required 
              style={inputStyle}
            >
              <option value="">Select Gender *</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            <select 
              name="lookingFor"
              value={formData.lookingFor}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="dating">Looking for Dating</option>
              <option value="marriage">Looking for Marriage</option>
            </select>
            <input 
              type="text" 
              name="occupation"
              placeholder="Occupation" 
              value={formData.occupation}
              onChange={handleChange}
              style={inputStyle} 
            />
            <input 
              type="text" 
              name="education"
              placeholder="Education" 
              value={formData.education}
              onChange={handleChange}
              style={inputStyle} 
            />
            <input 
              type="text" 
              name="religion"
              placeholder="Religion" 
              value={formData.religion}
              onChange={handleChange}
              style={inputStyle} 
            />
            <input 
              type="text" 
              name="caste"
              placeholder="Caste" 
              value={formData.caste}
              onChange={handleChange}
              style={inputStyle} 
            />
            <textarea 
              name="description"
              placeholder="About yourself..." 
              value={formData.description}
              onChange={handleChange}
              style={{...inputStyle, minHeight: "80px", resize: "vertical"}} 
            />
            <input 
              type="file" 
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={{...inputStyle, padding: "8px"}} 
            />
            <button 
              type="submit" 
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
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
