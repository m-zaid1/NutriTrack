import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, Scale, TrendingUp, Activity } from 'lucide-react';
import axios from "axios"; // Import axios for API requests
import "./GoalsPage.css";

const GoalsPage = () => {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState("");

  useEffect(() => {
    // Reset transition class on mount
    document.body.classList.remove("page-transition-out");
  }, []);

  const goals = [
    { id: "build_muscle", label: "Build muscle", icon: <Dumbbell size={24} /> },
    { id: "lose_weight", label: "Lose weight", icon: <Scale size={24} /> },
    { id: "gain_weight", label: "Gain weight", icon: <TrendingUp size={24} /> },
    { id: "maintain_weight", label: "Maintain weight", icon: <Activity size={24} /> },
  ];

  const handleGoalSelect = (goalId) => {
    setSelectedGoal(goalId);
  };

  const handleNext = async () => {
    if (selectedGoal) {
      try {
        const userId = localStorage.getItem("userId"); // Ensure this was saved after login
  
        await axios.post("http://localhost:5000/api/users/updateGoal", {
          userId,
          goal: selectedGoal,
        });
  
        // Continue navigation
        document.body.classList.add("page-transition-out");
        setTimeout(() => {
          navigate("/details");
        }, 300);
      } catch (error) {
        console.error("Error updating goal:", error);
        alert("Failed to update goal.");
      }
    }
  };
  

  return (
    <div className="goals-page">
      <div className="goals-content">
        <h1>Choose your goals</h1>

        <div className="goals-grid">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`goal-card ${selectedGoal === goal.id ? "selected" : ""}`}
              onClick={() => handleGoalSelect(goal.id)}
            >
              <div className="goal-icon">{goal.icon}</div>
              <span className="goal-label">{goal.label}</span>
            </div>
          ))}
        </div>

        <button
          className={`next-button ${!selectedGoal ? "disabled" : ""}`}
          onClick={handleNext}
          disabled={!selectedGoal}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GoalsPage;
