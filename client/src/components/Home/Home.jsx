import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import backgroundImage from "../../assets/background2.jpg";
import Footer from "../Footer/Footer"; // <-- Importing the Footer component

const Home = () => {
  const imagePaths = Array.from({ length: 24 }, (_, i) => require(`../../assets/dating${i + 1}.jpg`));
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay">

        {/* Hero Section with Grid as Background */}
        <div className="hero-section">
          <div className="grid-background">
            {imagePaths.map((src, index) => (
              <div className="image-box" key={index}>
                <img src={src} alt={`Dating ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Overlayed Text and Button */}
          <div className="header-section">
            <h1>Find Your Perfect Match 💕</h1>
            <p>Explore beautiful moments shared by our happy couples</p>
            <button onClick={() => navigate("/dating")}>Join Dating Now</button>
          </div>
        </div>

        {/* About Section */}
        <div className="about-section">
          <div className="about-text centered-about-text">
            <h2>Why Choose Our Dating Platform? 💖</h2>
            <p>
              We’re here to help you find deep, meaningful connections that go beyond the surface.
              <br />
              With innovative features, trusted user base, and safety-first approach, we make love possible—one match at a time.
            </p>
          </div>

          {/* Glowing Cards */}
          <div className="about-cards">
            <div className="glow-card">
              <h3>Verified Profiles</h3>
              <p>We ensure each member is real, reducing fake accounts and improving trust across the platform.</p>
            </div>
            <div className="glow-card">
              <h3>Matchmaking Algorithm</h3>
              <p>Our advanced AI connects people based on interests, values, and personality—not just looks.</p>
            </div>
            <div className="glow-card">
              <h3>Private Messaging</h3>
              <p>Start conversations safely and build a connection before deciding to meet in person.</p>
            </div>
            <div className="glow-card">
              <h3>Romantic Community</h3>
              <p>Be part of a friendly, supportive dating network that celebrates love in all its forms.</p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <Footer />  {/* <-- Add Footer here */}

      </div>
    </div>
  );
};

export default Home;
