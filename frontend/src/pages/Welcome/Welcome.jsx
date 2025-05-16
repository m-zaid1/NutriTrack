import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  // Auto-redirect after countdown
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/goals");
    }, 3000);

    // Countdown effect
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <div className="welcome-message">
          <h1>Welcome to NutriTrack</h1>
         
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
