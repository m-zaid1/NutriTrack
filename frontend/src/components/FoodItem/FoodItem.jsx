import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import { Link } from "react-router-dom";

const FoodItem = ({ images, name, price, id }) => {
  const { cartItems, addToCart, removeFromCart, url, currency } =
    useContext(StoreContext);

  return (
    <Link to={`/product/${id}`} className="food-item">
      <div className="food-item-img-container">
        {images && images.length > 0 ? (
          <img
            className="food-item-image"
            src={`${url}/images/${images[0]}`}
            alt={name}
          />
        ) : (
          <div className="food-item-image-placeholder">No Image Available</div>
        )}
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation when adding to the cart
              addToCart(id);
            }}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation when removing from the cart
                removeFromCart(id);
              }}
              alt="Remove from cart"
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation when adding to the cart
                addToCart(id);
              }}
              alt="Add to cart"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-price">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default FoodItem;
