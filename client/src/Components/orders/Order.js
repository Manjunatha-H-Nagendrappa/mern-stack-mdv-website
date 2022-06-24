import React, { useContext, useEffect, useState } from "react";
import "./order.css";
import { LoginContext } from "../context/ContextProvider";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Divider } from "@mui/material";
import { CircularProgress } from "@mui/material";

const Order = () => {
  const { account, setAccount } = useContext(LoginContext);
  console.log(account);

  const [orderData, setOrderData] = useState("");

  const { id } = useParams("");
  const navigate = useNavigate();

  const getOrderData = async () => {
    const res = await fetch(`/getproduct/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentails: "include",
    });

    const data = await res.json();

    if (res.status !== 201) {
      alert("No data available");
    } else {
      setOrderData(data);
    }
  };

  useEffect(() => {
    setTimeout(getOrderData, 1000);
  }, [id]);

  const addToOrder = async (id) => {
    const res2 = await fetch(`/addorder/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderData,
      }),
      credentials: "include",
    });

    const data2 = await res2.json();
    console.log("Order data", data2);

    if (res2.status !== 201) {
      alert("No data available");
    } else {
      setAccount(data2);
      navigate("/buynow");
    }
  };

  return (
    <div className="order_section">
      {orderData && Object.keys(orderData).length && (
        <div className="order_container">
          <div className="left_order">
            <img src={orderData.detailUrl} alt="order" />
            {account ? (
              <div className="order_btn">
                <button
                  className="order_btn1"
                  onClick={() => addToOrder(orderData.id)}
                >
                  Book Vehicle
                </button>
                <button
                  className="order_btn2"
                  onClick={() => addToOrder(orderData.id)}
                >
                  Buy Now
                </button>
              </div>
            ) : (
              <div className="order_btn">
                <Link to="/login">
                  <button className="order_btn1">Book Vehicle</button>
                  <button className="order_btn2">Buy Now</button>
                </Link>
              </div>
            )}
          </div>
          <div className="right_order">
            <h3>{orderData.title.shortTitle}</h3>
            <h4>{orderData.title.longTitle}</h4>
            <Divider />
            <p className="mrp">
              M.R.P :<del>Rs {orderData.price.mrp}</del>
            </p>
            <p>
              Deal of the Day :{" "}
              <span style={{ color: "#B12704" }}>
                Rs {orderData.price.cost}.00
              </span>
            </p>
            <p>
              You Save :
              <span style={{ color: "#B12704" }}>
                Rs {orderData.price.mrp - orderData.price.cost}(
                {orderData.price.discount})
              </span>
            </p>

            <div className="discount_box">
              <h5>
                Discount:
                <span style={{ color: "#111" }}>{orderData.discount}</span>
              </h5>
              <h4>
                FREE Delivery :
                <span style={{ color: "#111", fontWeight: "600" }}>
                  Oct 8 - 21
                </span>
              </h4>
              <p style={{ color: "#111" }}>
                Fastest Delivery:
                <span style={{ color: "#111", fontWeight: "600" }}>
                  Tomorrow 11AM
                </span>
              </p>
            </div>
            <p className="description">
              About Vehicle:
              <span
                style={{
                  color: "#565959",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.4px",
                }}
              >
                {orderData.description}
              </span>
            </p>
          </div>
        </div>
      )}
      {!orderData ? (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Order;
