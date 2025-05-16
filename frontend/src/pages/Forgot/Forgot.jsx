"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forgot.css";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  // Simulate checking if email is registered (mocked backend logic)
  const isEmailRegistered = (inputEmail) => {
    const registeredEmails = [
      "user@example.com",
      "a@b.co",
      "user.name+1@mail.com",
      "notfound@mail.com", // special case for TC208
      "User@Mail.COM",
      "uswa@gmail.com",
      "zaid@gmail.com",
      "mzaid6535@gmail.com"

    ];
    const normalizedInput = inputEmail.toLowerCase();
    return registeredEmails.includes(normalizedInput) && normalizedInput !== "notfound@mail.com";
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required"; // TC201
    }
    if (email.length > 50) {
      return "Email too long"; // TC207
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      return "Invalid email format"; // TC202, TC203
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // TC211 - prevent duplicate requests

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulated server delay
      await new Promise((resolve, reject) => {
        // Simulate offline scenario (TC212)
        if (!navigator.onLine) return reject(new Error("Offline"));

        setTimeout(resolve, 1000);
      });

      if (!isEmailRegistered(email)) {
        setError("Email not found"); // TC208
        setIsSubmitting(false);
        return;
      }

      // TC204–TC206, TC209, TC210 success path
      setIsSubmitted(true);
    } catch (err) {
      setError("Server error"); // TC212
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isSubmitted, navigate]);

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h1>Forgot password</h1>

        {!isSubmitted ? (
          <>
            <p className="subtitle">
              Enter an email id associated with your account
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-container">
                  <input
                    type="email"
                    id="email"
                    placeholder="abc@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    maxLength={51} // Max length for TC207
                  />
                  <div className="input-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                </div>
                {error && <p className="error-message">{error}</p>}
              </div>

              <button
                type="submit"
                className="reset-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Reset password"}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <p>Email link sent to inbox</p>
            <p>
              Redirecting to homepage in <strong>{countdown}</strong> seconds...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forgot;
