import React, { useContext, useState } from "react";
import "./SignUp.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const SignUp = () => {
  const { setToken, url, loadCartData } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Handling form input change
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Input validation with exact error messages for each test case
  const validateInput = () => {
    const { name, email, password } = data;

    // TC001: Name is required
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }

    // TC005: Name too long (max+1 = 51)
    if (name.length > 50) {
      toast.error("Name too long");
      return false;
    }

    // TC006: Email is required
    if (!email.trim()) {
      toast.error("Email is required");
      return false;
    }

    // TC007, TC010: Invalid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    // TC011: Password is required
    if (!password.trim()) {
      toast.error("Password is required");
      return false;
    }

    // TC012: Password too short
    if (password.length < 6) {
      toast.error("Password too short");
      return false;
    }

    // TC015: Password too long
    if (password.length > 20) {
      toast.error("Password too long");
      return false;
    }

    return true;
  };

  // Sign up form submission
  const onSignUp = async (e) => {
    e.preventDefault();
    console.log("Form Data: ", data);

    if (!validateInput()) return;

    try {
      console.log("URL being used:", url);

      const response = await axios.post(`${url}/api/users`, data);
      console.log("Response: ", response);
      if (response.data.success) {
        toast.success("User registered successfully");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("SignUp error: ", err.response || err);
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <>

      <div className="signup-page">
        <form className="signup-form" onSubmit={onSignUp}>
          <h2>Sign Up</h2>

          {/* Name Input */}
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Your full name"
              maxLength={51}
              required
            />
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="example@mail.com"
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              placeholder="********"
              required
            />
          </div>

          {/* Sign Up Button */}
          <button className="signup-btn" type="submit">Sign Up</button>

          {/* Redirect to login if user already has an account */}
          <p className="bottom-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
