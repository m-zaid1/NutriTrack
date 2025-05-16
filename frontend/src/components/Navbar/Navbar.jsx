// components/Navbar/Navbar.jsx
"use client"

import { useContext } from "react"
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { StoreContext } from "../../Context/StoreContext"
import { toast } from "react-toastify"
import { assets } from "../../assets/assets"

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(StoreContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    toast.success("Logged out successfully")
    navigate("/")
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-container">
          <img className="logo" src={assets.newlogo2 || "/placeholder.svg"} alt="Logo" />
          <span className="logo-text">NutriTrack</span>
        </Link>
      </div>

      <div className="navbar-center">
        <nav className="nav-links">
          <Link to="/food-diary" className="nav-link">Food Diary</Link>
          <Link to="/meal-plans" className="nav-link">Meal Plans</Link>
          <Link to="/hydration" className="nav-link">Hydration Tracking</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
        </nav>
      </div>

      <div className="navbar-right">
        {!isLoggedIn ? (
          <>
            <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
            <button className="login-btn" onClick={() => navigate("/signup")}>Sign Up</button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={() => navigate("/profile")}>Profile</button>
            <button className="login-btn" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
