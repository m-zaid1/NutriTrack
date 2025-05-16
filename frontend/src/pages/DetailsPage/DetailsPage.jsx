import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DetailsPage.css";

const DetailsPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    currentWeight: "",
    goalWeight: "",
    height: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.classList.remove("page-transition-out");
  }, []);

  const validate = () => {
    const errs = {};
    const nameTrimmed = formData.name.trim();

    // Name
    if (!nameTrimmed) errs.name = "Full Name is required";
    else if (nameTrimmed.length > 50) errs.name = "Name too long";

    // Date of Birth
    if (!formData.dateOfBirth) {
      errs.dateOfBirth = "Date of Birth is required";
    } else {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      const adjustedAge = m < 0 || (m === 0 && today.getDate() < dob.getDate()) ? age - 1 : age;

      if (dob > today) {
        errs.dateOfBirth = "Invalid date of birth";
      } else if (adjustedAge < 13) {
        errs.dateOfBirth = "Minimum age is 13";
      }
    }

    // Gender
    if (!formData.gender) {
      errs.gender = "Please select gender";
    }

    // Weight & Height validation helpers
    const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);
    const cw = parseFloat(formData.currentWeight);
    const gw = parseFloat(formData.goalWeight);
    const ht = parseFloat(formData.height);

    // Current Weight
    if (!formData.currentWeight) errs.currentWeight = "Weight is required";
    else if (!isNumeric(formData.currentWeight)) errs.currentWeight = "Invalid number";
    else if (cw < 20) errs.currentWeight = "Too low to be valid";
    else if (cw > 300) errs.currentWeight = "Value too high";

    // Goal Weight
    if (!formData.goalWeight) errs.goalWeight = "Goal weight required";
    else if (!isNumeric(formData.goalWeight)) errs.goalWeight = "Invalid number";
    else if (gw < 20 || gw > 300) errs.goalWeight = "Goal weight must be between 20 and 300";

    // Height
    if (!formData.height) errs.height = "Height is required";
    else if (!isNumeric(formData.height)) errs.height = "Invalid number";
    else if (ht < 50) errs.height = "Too short to be valid";
    else if (ht > 300) errs.height = "Value too high";

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const userGoal = localStorage.getItem("userGoal");
      const userId = localStorage.getItem("userId");

      const userData = {
        ...formData,
        goal: userGoal,
        userId: userId
      };

      const response = await fetch("http://localhost:5000/api/users/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.message);

      localStorage.setItem("userProfile", JSON.stringify(userData));
      document.body.classList.add("page-transition-out");
      setTimeout(() => navigate("/meal-plans"), 500);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("There was an error saving your profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="details-page">
      <div className="details-content">
        <h1>Fill up your details</h1>

        <form className="details-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name here"
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                <span>Male</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                <span>Female</span>
              </label>
            </div>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="currentWeight">Current weight</label>
            <input
              type="text"
              id="currentWeight"
              name="currentWeight"
              value={formData.currentWeight}
              onChange={handleChange}
              placeholder="Enter your current weight in kg"
              required
            />
            {errors.currentWeight && <span className="error">{errors.currentWeight}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="goalWeight">Your goal</label>
            <input
              type="text"
              id="goalWeight"
              name="goalWeight"
              value={formData.goalWeight}
              onChange={handleChange}
              placeholder="Enter your desired weight in kg"
              required
            />
            {errors.goalWeight && <span className="error">{errors.goalWeight}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="height">Height</label>
            <input
              type="text"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="Enter your height in cm"
              required
            />
            {errors.height && <span className="error">{errors.height}</span>}
          </div>

          <button
            type="submit"
            className="create-plan-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create my plan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailsPage;
