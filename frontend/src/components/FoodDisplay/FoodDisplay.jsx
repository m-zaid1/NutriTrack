"use client";

import { useContext, useState, useEffect } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";
import ProductModal from "../Product/Product";

const FoodDisplay = () => {
  return (
    <div className="food-display" id="food-display">
      <img
        src="/display.png" 
        alt="Healthy food"
        className="food-display-image"
      />
    </div>
  );
};

export default FoodDisplay;
