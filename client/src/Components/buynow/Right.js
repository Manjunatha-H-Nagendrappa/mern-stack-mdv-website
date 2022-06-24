import React, { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate, Link } from "react-router-dom";
import purchase from "../../Images/purchase.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Right = ({ item }) => {
  const [val, setVal] = useState(false);
  const [price, setPrice] = useState(0);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate("");

  useEffect(() => {
    totalAmount();
  }, [item]);

  const totalAmount = () => {
    let price = 0;
    item.map((item) => {
      price += item.price.cost;
    });
    setPrice(price);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"MDV Order confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your MDV vehicle booking is confirmed check your email for the
            confirmation message. Thanks for booking.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/home">
            <Button onClick={handleClose} autoFocus>
              Okay
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      <div className="right_buy">
        <img src={purchase} alt="purchase" />
        <div className="cost_right">
          <p>
            Your Order is Eligible for FREE Delivery.
            <br />
            <span style={{ color: "#565959" }}>
              Select this option at checkout. Details
            </span>
          </p>
          <h3>
            Subtotal ({item.length} items):
            <br />
            <span style={{ fontWeight: "700" }}>Rs {price}.00</span>
          </h3>
          <button className="rightbuy_btn" onClick={handleClickOpen}>
            Confirm Order
          </button>
          <div className="emi" onClick={() => setVal(!val)}>
            EMI Available
            {!val ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
          <span className={val ? "show" : "hide"}>
            Your order qualifies for EMI with valid cred cards (Terms and
            Conditions are applies). Learn More
          </span>
        </div>
      </div>
    </div>
  );
};

export default Right;
