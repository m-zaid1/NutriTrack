import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/MyOrders/MyOrders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import ProductDetail from "./components/Product/Product";
import Admin from "./pages/Admin/Admin";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Discount from "./pages/Discounts/Discounts";
import SignUp from "./components/SignUp/SignUp"; 
import Forgot from "./pages/Forgot/Forgot"; 
import FoodDiary from "./pages/Food Diary/FoodDiary";
import MealPlans from "./pages/MealPlans/MealPlans";
import Hydration from "./pages/Hydration/Hydration";
import Blog from "./pages/Blog/Blog";
import BlogPostTemplate from "./pages/BlogPostTemplate/BlogPostTemplate";
import ProfilePage from "./pages/Profile/Profile";
import WelcomePage from "./pages/Welcome/Welcome";
import GoalsPage from "./pages/GoalsPage/GoalsPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import BalancedNutrition from "./pages/BlogPostTemplate/BalancedNutrition";
import Mindful from "./pages/BlogPostTemplate/Mindful";
import Plant from "./pages/BlogPostTemplate/Plant";
import Sleep from "./pages/BlogPostTemplate/Sleep";
import Seasonal from "./pages/BlogPostTemplate/Seasonal";
import Hydratio from "./pages/BlogPostTemplate/Hydration";
import Labels from "./pages/BlogPostTemplate/Labels";
import Mental from "./pages/BlogPostTemplate/Mental";
import Fasting from "./pages/BlogPostTemplate/Fasting";
import SupportPage from "./pages/Support/Support";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPopup />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/food-diary" element={<FoodDiary />} />
          <Route path="/meal-plans" element={<MealPlans />} /> 
          <Route path="/hydration" element={<Hydration />} /> 
          <Route path="/blog" element={<Blog />} />
          <Route path="/blogpost" element={<BlogPostTemplate />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/details" element={<DetailsPage />} />
          <Route path="/blog/balanced-nutrition" element={<BalancedNutrition />} />
          <Route path="/blog/mindful-eating" element={<Mindful />} />
          <Route path="/blog/plant-based-proteins" element={<Plant />} />
          <Route path="/sleep-metabolism" element={<Sleep />} />
          <Route path="/blog/seasonal-eating" element={<Seasonal />} />
          <Route path="/blog/hydration-during-exercise" element={<Hydratio />} />
          <Route path="/blog/understanding-food-labels" element={<Labels />} />
          <Route path="/blog/mental-health" element={<Mental />} />
          <Route path="/blog/intermittent-fasting" element={<Fasting />} />

          {/* Add other routes here */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="add" element={<Add />} />
            <Route path="list" element={<List />} />
            <Route path="orders" element={<Orders />} />
            <Route path="discount" element={<Discount />} />
          </Route>
        </Routes>
        
        
      </div>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
};

export default App;
