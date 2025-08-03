import React from "react";
import { useNavigate } from "react-router-dom";
import "./Subscription.css";
import Footer from "../Footer/Footer";

const Subscription = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    alert(`You selected ${plan} plan!`);
    // Here you'd do subscription processing or payment

    // After subscription, navigate to video call
    navigate("/video-chat/call");
  };

  return (
    <>
      <div className="sub-wrapper">
        <h2>Choose Your Subscription Plan</h2>
        <ul>
          <li>
            <button className="plan-btn" onClick={() => handleSelectPlan("Basic")}>
              Basic – Free Trial
            </button>
          </li>
          <li>
            <button className="plan-btn" onClick={() => handleSelectPlan("Premium")}>
              Premium – ₹499/month
            </button>
          </li>
          <li>
            <button className="plan-btn" onClick={() => handleSelectPlan("Pro")}>
              Pro – ₹999/month
            </button>
          </li>
        </ul>
      </div>

      {/* Footer placed here */}
      <Footer />
    </>
  );
};

export default Subscription;
