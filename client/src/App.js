import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./Components/home/Main";
import Navbar from "./Components/header/Navbar";
import SubHeader from "./Components/subheader/SubHeader";
import SignIn from "./Components/signIn/SignIn";
import SignUp from "./Components/signUp/SignUp";
import Order from "./Components/orders/Order";
import Buynow from "./Components/buynow/Buynow";
import Footer from "./Components/footer/Footer";
import { CircularProgress } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 500);
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <Navbar />
          <SubHeader />
          <Routes>
            <Route exact path="/" element={<Navigate to="/home" />} />
            <Route exact path="/home" element={<Main />} />
            <Route exact path="/login" element={<SignIn />} />
            <Route exact path="/register" element={<SignUp />} />
            <Route exact path="/getproduct/:id" element={<Order />} />
            <Route exact path="/buynow" element={<Buynow />} />
          </Routes>
          <Footer />
        </div>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h3>Loading...</h3>
        </div>
      )}
    </div>
  );
}

export default App;
