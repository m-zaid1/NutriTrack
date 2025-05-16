import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin-container">
      <hr />
      <Sidebar />
      <div className="admin-content">
        <Outlet />
      </div>
      <br></br>
    </div>
  );
};

export default Admin;
