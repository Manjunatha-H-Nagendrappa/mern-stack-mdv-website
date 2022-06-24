import React, { useEffect } from "react";
import "./main.css";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions";
import Banner from "./Banner";
import Slide from "./Slide";
import Divider from "@mui/material/Divider";
import image9 from "../../Images/image9.jpg";
import image10 from "../../Images/image10.webp";

const Main = () => {
  const { products } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <div className="home_section">
        <div className="banner_part">
          <Banner />
        </div>
        <div className="slide_part">
          <div className="left_slide">
            <Slide title="Deal of the day" products={products} />
          </div>
          <div className="right_slide">
            <h4>Festive Latest Launch</h4>
            <img src={image9} alt="rightimg" />
            <a href="http://www.mydreamvehicle.com">See More</a>
          </div>
        </div>
        <Slide title="Today's Deal" products={products} />
        <div className="center_img">
          <img src={image10} alt="centerImg" />
        </div>
        <Slide title="Best Seller" products={products} />
        <Slide title="UpTo 35% OFF" products={products} />
      </div>
      <Divider />
    </div>
  );
};

export default Main;
