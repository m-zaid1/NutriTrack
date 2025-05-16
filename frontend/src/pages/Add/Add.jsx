import React, { useState } from "react";
import "./Add.css";
import { assets, url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [images, setImages] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Masalas",
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!images.length) {
      toast.error("Image not selected");
      return null;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    images.forEach((image, index) => {
      formData.append("images", image);
    });
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setData({
        name: "",
        description: "",
        price: "",
        category: data.category,
      });
      setImages([]);

      const foodListResponse = await axios.get(`${url}/api/food/getAll`);
      if (foodListResponse.data.success) {
        setFoodList(foodListResponse.data.foods);
      }
    } else {
      toast.error(response.data.message);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <h3>Add Item</h3>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <input
            onChange={(e) => {
              setImages(Array.from(e.target.files).slice(0, 5));
              e.target.value = "";
            }}
            type="file"
            accept="image/*"
            id="image"
            hidden
            multiple
          />
          <label htmlFor="image">
            {images.length > 0 ? (
              <div className="image-preview-container">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${index + 1}`}
                    className="image-preview"
                  />
                ))}
              </div>
            ) : (
              <img src={assets.upload_area} alt="Upload area" />
            )}
          </label>
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            type="text"
            rows={6}
            placeholder="Write content here. Use double line breaks for paragraph spacing."
            required
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" onChange={onChangeHandler}>
              <option value="Masalas">Masalas</option>
              <option value="Oil & Ghee">Oil & Ghee</option>
              <option value="Atta & Rice">Atta & Rice</option>
              <option value="Breads & Eggs">Breads & Eggs</option>
              <option value="Icecreams & More">Icecreams & More</option>
              <option value="Drinks & Juices">Drinks & Juices</option>
              <option value="Sweets & Chocolate">Sweets & Chocolate</option>
              <option value="Bakery & Biscuits">Bakery & Biscuits</option>
              <option value="Tea & Coffee">Tea & Coffee</option>
              <option value="Sauces & Spreads">Sauces & Spreads</option>
              <option value="Desi Nibbles">Desi Nibbles</option>
              <option value="Instant Foods">Instant Foods</option>
              <option value="Lentils & Legumes">Lentils & Legumes</option>
              <option value="Organic & Healthy">Organic & Healthy</option>
              <option value="Chips & Namkeen">Chips & Namkeen</option>
              <option value="DryFruit & Cereal">DryFruit & Cereal</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="Number"
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="5"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
