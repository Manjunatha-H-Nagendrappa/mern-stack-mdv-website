import React, { useState } from "react";
import "./signup.css";
import { Divider } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import mdvlogo from "../../Images/mdvlogo.png";
import background from "../../Images/background.jpg";

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const addData = (e) => {
    const { name, value } = e.target;
    setSignupData(() => {
      return {
        ...signupData,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = signupData;
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          mobile,
          password,
          cpassword,
        }),
      });
      const data = await res.json();
      console.log("Sign-up data", data);

      if (res.status === 422 || !data) {
        toast.error("Invalid details", {
          position: "top-right",
        });
      } else {
        setSignupData({
          ...signupData,
          fname: "",
          email: "",
          mobile: "",
          password: "",
          cpassword: "",
        });
        toast.success("Registration Successful", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log("Registration error", error.message);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <section>
        <div className="sign_container">
          <div className="sign_form">
            <div className="sign_header">
              <img src={mdvlogo} alt="darklogo" />
            </div>
            <form method="POST">
              <h2>Registration</h2>
              <div className="form_data">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="Please Enter Your Name"
                  onChange={addData}
                  value={signupData.fname}
                />
              </div>
              <div className="form_data">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Please Enter Email"
                  onChange={addData}
                  value={signupData.email}
                />
              </div>
              <div className="form_data">
                <label htmlFor="mobile">Mobile number</label>
                <input
                  type="number"
                  name="mobile"
                  id="mobile"
                  placeholder="Please Enter Mobile Number"
                  onChange={addData}
                  value={signupData.mobile}
                />
              </div>
              <div className="form_data">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Please Enter Password"
                  onChange={addData}
                  value={signupData.password}
                />
              </div>
              <div className="form_data">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  placeholder="Please Confirm Password"
                  onChange={addData}
                  value={signupData.cpassword}
                />
              </div>
              <button type="submit" className="signin_btn" onClick={sendData}>
                Sign Up
              </button>
              <Divider />
              <div className="signin_info">
                <p>Already have an account?</p>
                <NavLink to="/login">Login</NavLink>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </section>
    </div>
  );
};

export default SignUp;
