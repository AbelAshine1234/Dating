import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Navigation Links */}
        <div className="footer-links">
          {['Dating', 'Marriage', 'Chat', 'Profile'].map((text) => (
            <Link key={text} to={`/${text.toLowerCase()}`} className="footer-link">
              {text}
            </Link>
          ))}
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <p className="contact-text">
            <FaPhone className="contact-icon" /> +1 (800) 123-4567
          </p>
          <p className="contact-text">
            <FaEnvelope className="contact-icon" /> support@loveconnect.com
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} LoveConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
// Style Definitions
