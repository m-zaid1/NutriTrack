"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Profile.css";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    currentWeight: "",
    goalWeight: "",
    height: "",
    email: "",
  });

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const getAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const isValidDateOfBirth = (dob) => {
    const age = getAge(dob);
    return age >= 13 && age <= 120;
  };

  const isValidWeight = (weight) => {
    const w = parseFloat(weight);
    return !isNaN(w) && w >= 20 && w <= 300;
  };

  const isValidHeight = (height) => {
    const h = parseFloat(height);
    return !isNaN(h) && h >= 50 && h <= 300;
  };

  const isValidGender = (gender) => {
    return ["Male", "Female"].includes(gender);
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem("userId");
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          params: { userId },
        });

        if (response.data.success) {
          const userData = response.data.user;
          setProfileData({
            name: userData.name || "",
            email: userData.email || "",
            dateOfBirth: formatDateForInput(userData.dateOfBirth) || "",
            gender: userData.gender || "",
            currentWeight: userData.currentWeight || "",
            goalWeight: userData.goalWeight || "",
            height: userData.height || "",
          });
        } else {
          toast.error("No user data found");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, dateOfBirth, gender, currentWeight, goalWeight, height } = profileData;

    const age = getAge(dateOfBirth);
    if (!isValidDateOfBirth(dateOfBirth)) {
      if (age < 13) {
        toast.error("Minimum age is 13");
      } else {
        toast.error("Age must be less than 120");
      }
      return;
    }

    if (!isValidWeight(currentWeight)) {
      const w = parseFloat(currentWeight);
      if (w < 20) {
        toast.error("Weight must be ≥ 20 kg");
      } else {
        toast.error("Weight must be ≤ 300 kg");
      }
      return;
    }

    if (!isValidWeight(goalWeight)) {
      const w = parseFloat(goalWeight);
      if (w < 20) {
        toast.error("Weight must be ≥ 20 kg");
      } else {
        toast.error("Weight must be ≤ 300 kg");
      }
      return;
    }

    if (!isValidHeight(height)) {
      const h = parseFloat(height);
      if (h < 50) {
        toast.error("Height must be ≥ 50 cm");
      } else {
        toast.error("Height must be ≤ 300 cm");
      }
      return;
    }

    if (!isValidGender(gender)) {
      toast.error("Please select a valid gender.");
      return;
    }

    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId");

      const response = await axios.post("http://localhost:5000/api/users/update-profile", {
        userId,
        name,
        dateOfBirth,
        gender,
        currentWeight,
        goalWeight,
        height,
      });

      if (response.data.success) {
        toast.success("Profile updated successfully");
        localStorage.setItem("userProfile", JSON.stringify(profileData));
        setIsEditing(false);
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentDate = () => {
    const options = { weekday: "short", day: "numeric", month: "long", year: "numeric" };
    return new Date().toLocaleDateString("en-US", options);
  };

  return (
    <div className="profile-page-container">
      <div className="profile-content">
        <div className="profile-welcome">
          <h1>Welcome, {profileData.name || "User"}</h1>
          <p>{getCurrentDate()}</p>
        </div>

        <div className="profile-card">
          <div className="profile-header">
            <h2>Profile</h2>
            {!isEditing && (
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    required
                  />
                ) : (
                  <div className="profile-field">{profileData.name || "Your Full Name"}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="currentWeight">Current Weight (kg)</label>
                {isEditing ? (
                  <input
                    type="number"
                    id="currentWeight"
                    name="currentWeight"
                    value={profileData.currentWeight}
                    onChange={handleChange}
                    min="20"
                    max="300"
                    placeholder="e.g., 70"
                  />
                ) : (
                  <div className="profile-field">{profileData.currentWeight || "Your Current Weight"}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="profile-field">{profileData.dateOfBirth || "Your Date of Birth"}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="goalWeight">Goal Weight (kg)</label>
                {isEditing ? (
                  <input
                    type="number"
                    id="goalWeight"
                    name="goalWeight"
                    value={profileData.goalWeight}
                    onChange={handleChange}
                    min="20"
                    max="300"
                    placeholder="e.g., 65"
                  />
                ) : (
                  <div className="profile-field">{profileData.goalWeight || "Your Goal Weight"}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                {isEditing ? (
                  <select id="gender" name="gender" value={profileData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <div className="profile-field">{profileData.gender || "Your Gender"}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="height">Height (cm)</label>
                {isEditing ? (
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={profileData.height}
                    onChange={handleChange}
                    min="50"
                    max="300"
                    placeholder="e.g., 175"
                  />
                ) : (
                  <div className="profile-field">{profileData.height || "Your Height"}</div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button type="submit" className="save-button" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
