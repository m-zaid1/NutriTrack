import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductDetail = () => {
  const { id } = useParams();
  const { food_list, cartItems, addToCart, removeFromCart, url, currency } =
    useContext(StoreContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const foundProduct = food_list.find((item) => item._id === id);
      setProduct(foundProduct);
    };

    fetchProduct();
  }, [id, food_list]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <div className="product-left">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
        >
          {product.images && product.images.length > 0 ? (
            product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className="product-image"
                  src={`${url}/images/${image}`}
                  alt={`${product.name} - Image ${index + 1}`}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="product-image-placeholder">
                No Images Available
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
      <div className="product-right">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-price">
          {currency}
          {product.price}
        </p>
        <div className="product-description" style={{ whiteSpace: "pre-wrap" }}>
          {product.description}
        </div>
        <div className="add-to-cart">
          {!cartItems[product._id] ? (
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          ) : (
            <div className="quantity-control">
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
      </div>
    </div>
  );
};

export default ProductDetail;
