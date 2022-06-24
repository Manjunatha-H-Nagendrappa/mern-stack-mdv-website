import React, { useEffect, useState } from "react";
import "./buynow.css";
import { Divider } from "@mui/material";
import Empty from "./Empty";
import Option from "./Option";
import Right from "./Right";
import Subtotal from "./Subtotal";
import candb from "../../Images/candb.jpg";

const Buynow = () => {
  const [orderData, setOrderData] = useState("");

  const getDataBuy = async () => {
    const res = await fetch("/orderdetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log("order details", data);

    if (res.status !== 201) {
      console.log("No data available");
    } else {
      setOrderData(data.orders);
    }
  };

  useEffect(() => {
    getDataBuy();
  }, []);

  return (
    <div>
      {orderData.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Booking Details</h1>
              <p>Select All Vehicles</p>
              <Divider />
              {orderData.map((e, ind) => {
                return (
                  <div key={ind}>
                    <div className="item_container">
                      <img src={e.detailUrl} alt="imgitem" />
                      <div className="item_details">
                        <h3>{e.title.shortTitle}</h3>
                        <h3>{e.title.longTitle}</h3>
                        <h3 className="differentprice">Rs {e.price.cost}.00</h3>
                        <p className="unusuall">Usually delivered in 7 days.</p>
                        <p>Eligible for FREE delivery charge</p>
                        <img src={candb} alt="logo" />
                        <Option deleteData={e.id} get={getDataBuy} />
                      </div>

                      <h3 className="item_price">Rs {e.price.cost}.00</h3>
                    </div>
                    <Divider />
                  </div>
                );
              })}
              <Subtotal item={orderData} />
            </div>
            <Right item={orderData} />
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Buynow;
