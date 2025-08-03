import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Navigation Links */}
        <div style={linkContainerStyle}>
          {["Dating", "Marriage", "Chat", "Profile"].map((text) => (
            <a key={text} href={`/${text.toLowerCase()}`} style={linkStyle}>
              {text}
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div style={contactInfoStyle}>
          <p style={contactTextStyle}>
            <FaPhone style={iconStyle} /> +1 (800) 123-4567
          </p>
          <p style={contactTextStyle}>
            <FaEnvelope style={iconStyle} /> support@loveconnect.com
          </p>
        </div>

        {/* Social Media Icons */}
        <div style={socialContainerStyle}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={socialIconStyle}
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={socialIconStyle}
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={socialIconStyle}
          >
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <p style={copyrightStyle}>
          &copy; {new Date().getFullYear()} LoveConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// Style Definitions

const footerStyle = {
  backgroundColor: "rgba(139, 0, 0, 0.9)",
  color: "#fff",
  padding: "3rem 1rem",
  textAlign: "center",
  fontFamily: "'Segoe UI', sans-serif",
  borderTop: "1px solid #333",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  animation: "fadeIn 1s ease-in",
};

const linkContainerStyle = {
  marginBottom: "1.5rem",
};

const linkStyle = {
  margin: "0 15px",
  color: "#fff", // romantic tone
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "1.1rem",
  transition: "color 0.3s ease",
};

const iconStyle = {
  marginRight: "8px",
  color: "#fff",
};

const contactInfoStyle = {
  marginBottom: "1.5rem",
};

const contactTextStyle = {
  fontSize: "1rem",
  lineHeight: "1.6",
  color: "#ccc",
};

const socialContainerStyle = {
  marginBottom: "1rem",
  fontSize: "1.6rem",
};

const socialIconStyle = {
  margin: "0 12px",
  color: "#fff",
  transition: "color 0.3s ease",
  fontSize: "1.4rem",
};

const copyrightStyle = {
  fontSize: "0.9rem",
  color: "#bbb",
  marginTop: "1rem",
};

export default Footer;
