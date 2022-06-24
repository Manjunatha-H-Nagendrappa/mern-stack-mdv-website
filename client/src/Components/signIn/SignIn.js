import React, { useContext, useState } from "react";
import { LoginContext } from "../context/ContextProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mdvlogo from "../../Images/mdvlogo.png";
import background from "../../Images/background.jpg";

const SignIn = () => {
  const { account, setAccount } = useContext(LoginContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  console.log("Login details", account);

  const navigate = useNavigate();

  const addData = (e) => {
    const { name, value } = e.target;
    setLoginData(() => {
      return {
        ...loginData,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        toast.error("Invalid Details", {
          position: "top-right",
        });
      } else {
        setAccount(data);
        setLoginData({ ...loginData, email: "", password: "" });
        toast.success("Login Successful!", {
          position: "top-right",
        });
        navigate("/home");
      }
    } catch (error) {
      console.log("Invalid login", error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <section>
        <div className="sign_container">
          <div className="sign_form">
            <div className="sign_header">
              <img src={mdvlogo} alt="logo" />
            </div>
            <form method="POST">
              <h2>Login</h2>
              <div className="form_data">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Please Enter Email"
                  onChange={addData}
                  value={loginData.email}
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
                  value={loginData.password}
                />
              </div>
              <button type="submit" className="signin_btn" onClick={sendData}>
                Login
              </button>
            </form>
            <ToastContainer />
          </div>
          <div className="create_accountinfo">
            <p>New to My Dream Vehicle</p>
            <button>
              <NavLink to="/register">
                Create Your My Dream Vehicle Account
              </NavLink>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
