import React from "react";
import "./buynow.css";
import orderpic from "../../Images/orderpic.jpg";
import { NavLink } from "react-router-dom";

const Empty = () => {
  return (
    <div className="buynow_section">
      <div className="buynow_container">
        <div className="empty_buy" style={{ padding: "40px 40px" }}>
          <img src={orderpic} alt="order" />
          <div className="emptydata">
            <h1>Your My Dream Vehicle Order is Empty</h1>
            <p>See Recommendations</p>
          </div>
          <NavLink className="empty_btn" to="/home">
            Book Your Vehicles
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Empty;
