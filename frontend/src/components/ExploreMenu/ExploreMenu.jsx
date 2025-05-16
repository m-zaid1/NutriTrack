import React, { useContext } from 'react';
import './ExploreMenu.css';
import healthyFoodImage from '/1.png'; // update filename accordingly

const ExploreMenu = () => {
  return (
    <div className="explore-menu" id="explore-menu">
      <img
        src="/header.png"
        alt="Healthy food"
        className="explore-menu-image"
      />
      <img
        src="/why.png"
        alt="Healthy food"
        className="explore-menu-image"
      />
    </div>
  );
};

export default ExploreMenu;
