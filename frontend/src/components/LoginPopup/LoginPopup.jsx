"use client"

import { useContext, useState, useEffect, useRef } from "react"
import "./LoginPopup.css"
import { StoreContext } from "../../Context/StoreContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const LoginPopup = () => {
  const { setIsLoggedIn } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({ name: "", email: "", password: "" })
  const [errors, setErrors] = useState({ email: "", password: "", name: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const emailRef = useRef(null)

  useEffect(() => {
    if (currState === "Login" && emailRef.current) {
      emailRef.current.focus()
    }
  }, [currState])

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })) // Clear error message on change
  }

  const validateInputs = () => {
    const { email, password, name } = data
    let validationErrors = { email: "", password: "", name: "" }

    if (!email && !password) {
      validationErrors.email = "Email and Password required"
      validationErrors.password = "Email and Password required"
    } else if (!email) {
      validationErrors.email = "Email required"
    } else if (!password) {
      validationErrors.password = "Password required"
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
      if (!emailRegex.test(email)) {
        validationErrors.email = "Invalid email format"
      }
      if (password.length < 6) {
        validationErrors.password = "Password too short"
      }
    }

    if (currState === "Sign Up" && !name) {
      validationErrors.name = "Name is required"
    }

    return validationErrors
  }

  const onLogin = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    const validationErrors = validateInputs()
    setErrors(validationErrors) // Set errors in state

    if (Object.values(validationErrors).some((error) => error !== "")) {
      return // If there are validation errors, don't submit the form
    }

    try {
      setIsSubmitting(true)
      const endpoint =
        currState === "Login" ? "/api/users/login" : "/api/users/register"
      const response = await axios.post("http://localhost:5000" + endpoint, data)

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userId", response.data.userId)
        setIsLoggedIn(true)

        if (response.data.firstLogin) {
          toast.success("First login successful! Redirecting to setup.")
          navigate("/welcome")
        } else {
          toast.success(`${currState} successful!`)
          navigate("/")
        }
      } else {
        toast.error(response.data.message || `${currState} failed.`)
      }
    } catch (error) {
      console.error("Auth error:", error)
      toast.error("Invalid Credentials")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isButtonDisabled = () => {
    const { email, password, name } = data
    if (currState === "Login" && (!email || !password)) return true
    if (currState === "Sign Up" && (!name || !email || !password)) return true
    return false
  }

  const handleLinkClick = (route) => {
    navigate(route)
  }

  return (
    <div className="login-page-wrapper">
      <div className="login-form">
        <h2>{currState}</h2>
        <form onSubmit={onLogin}>
          {currState === "Sign Up" && (
            <div className="input-group">
              <label>Name</label>
              <input
                name="name"
                type="text"
                value={data.name}
                onChange={onChangeHandler}
                placeholder="Your name"
                required
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input
              ref={emailRef}
              name="email"
              type="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="abc@gmail.com"
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={data.password}
              onChange={onChangeHandler}
              placeholder="********"
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          {currState === "Login" && (
            <p
              className="forgot-password"
              tabIndex="0"
              role="link"
              onClick={() => handleLinkClick("/forgot")}
              onKeyDown={(e) => e.key === "Enter" && handleLinkClick("/forgot")}
            >
              Forgot Password?
            </p>
          )}

          <button
            type="submit"
            className="form-btn"
            disabled={isButtonDisabled() || isSubmitting}
          >
            {isSubmitting ? "Processing..." : currState === "Login" ? "Login" : "Create account"}
          </button>
        </form>

        <p className="footer-text">
          {currState === "Login" ? (
            <>
              Don't have an account?{" "}
              <span
                tabIndex="0"
                role="link"
                onClick={() => setCurrState("Sign Up")}
                onKeyDown={(e) => e.key === "Enter" && setCurrState("Sign Up")}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                tabIndex="0"
                role="link"
                onClick={() => setCurrState("Login")}
                onKeyDown={(e) => e.key === "Enter" && setCurrState("Login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default LoginPopup
