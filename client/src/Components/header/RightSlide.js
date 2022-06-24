import React, { useContext } from "react";
import "./rightslide.css";
import flag from "../../Images/flag.png";
import { LoginContext } from "../context/ContextProvider";
import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";

const RightSlide = ({ userLog, logClose }) => {
  const imgd = flag;
  const { account } = useContext(LoginContext);

  return (
    <div className="rightheader">
      <div className="right_nav">
        {account ? (
          <Avatar className="avtar2" title={account.fname.toUpperCase()}>
            {account.fname[0].toUpperCase()}
          </Avatar>
        ) : (
          <Avatar className="avtar" />
        )}
        {account ? (
          <h3>Hello, {account.fname.toUpperCase()} </h3>
        ) : (
          <div onClick={() => logClose()}>
            <h3>
              <NavLink to="/login">Sign In</NavLink>
            </h3>
          </div>
        )}
      </div>

      <div className="nav_btn" onClick={() => logClose()}>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/home">Shop By Category</NavLink>
        <Divider style={{ width: "100%", marginLeft: -20 }} />
        <NavLink to="/home" style={{ marginTop: 10 }}>
          Today's Deal
        </NavLink>
        {account ? (
          <NavLink to="/buynow">Your Order</NavLink>
        ) : (
          <NavLink to="/login">Your Order</NavLink>
        )}
        <Divider style={{ width: "100%", marginLeft: -20 }} />
        <div className="flag">
          <NavLink to="/home" style={{ marginTop: 14 }}>
            Settings
          </NavLink>
          <img src={imgd} alt="flag" style={{ width: 35, marginLeft: 10 }} />
        </div>
        {account ? (
          <div className="flag">
            <LogoutSharpIcon style={{ fontSize: 18, marginRight: 4 }} />
            <h3
              onClick={() => userLog()}
              style={{ cursor: "pointer", fontWeight: 500 }}
            >
              Logout
            </h3>
          </div>
        ) : (
          <NavLink to="/login" className="flag">
            <LoginSharpIcon style={{ fontSize: 18, marginRight: 4 }} /> Sign In
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default RightSlide;
