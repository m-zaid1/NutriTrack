import React, { useState, useEffect } from "react";
import "./Discounts.css";
import { url } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function Discount() {
  const [categories, setCategories] = useState([
    "Masalas",
    "Oil & Ghee",
    "Atta & Rice",
    "Breads & Eggs",
    "Icecreams & More",
    "Drinks & Juices",
    "Sweets & Chocolate",
    "Bakery & Biscuits",
    "Tea & Coffee",
    "Sauces & Spreads",
    "Desi Nibbles",
    "Instant Foods",
    "Lentils & Legumes",
    "Organic & Healthy",
    "Chips & Namkeen",
    "DryFruit & Cereal",
  ]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [discount, setDiscount] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Discount History
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/discount/history`);
      console.log("History response:", response); // Debug log
      if (response.data.success) {
        setHistory(response.data.history);
      } else {
        toast.error("Failed to fetch discount history.");
      }
    } catch (error) {
      console.error("Error fetching discount history:", error.message || error);
      toast.error("Error fetching discount history.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((category) => category !== value)
    );
  };

  const applyDiscount = async () => {
    if (!discount || selectedCategories.length === 0) {
      toast.error("Please select categories and enter a discount percentage.");
      return;
    }
    try {
      const response = await axios.post(`${url}/api/discount/apply`, {
        categories: selectedCategories,
        discount: Number(discount),
      });
      if (response.data.success) {
        toast.success("Discount applied successfully!");
        setSelectedCategories([]);
        setDiscount("");
        fetchHistory(); // Refresh the history after applying discount
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to apply discount. Please try again.");
    }
  };

  const revertDiscount = async (historyId) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${url}/api/discount/revert/${historyId}`);
      if (response.data.success) {
        toast.success("Discount reverted successfully!");
        fetchHistory(); // Refresh the history after reverting
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to revert discount. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="discount-container">
      <h3>Apply Discount</h3>
      <div className="discount-categories">
        <p>Select Categories:</p>
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <input
              type="checkbox"
              id={category}
              value={category}
              onChange={handleCategoryChange}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      <div className="discount-input">
        <p>Discount Percentage:</p>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          placeholder="Enter discount %"
        />
      </div>
      <button onClick={applyDiscount} className="apply-discount-btn">
        Apply Discount
      </button>

      <h3>Discount History</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="discount-history-table">
          <thead>
            <tr>
              <th>Categories</th>
              <th>Discount (%)</th>
              <th>Products</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.categories.join(", ")}</td>
                <td>{entry.discount}</td>
                <td>
                  <ul>
                    {entry.products.map((product, index) => (
                      <li key={index}>
                        {product.name}: {product.previousPrice} →{" "}
                        {product.discountedPrice}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button
                    onClick={() => revertDiscount(entry._id)}
                    className="revert-btn"
                  >
                    Revert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Discount;
