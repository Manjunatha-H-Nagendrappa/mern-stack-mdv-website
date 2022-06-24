import React from "react";
import "./banner.css";
import Carousel from "react-material-ui-carousel";
import image1 from "../../Images/image1.jpg";
import image2 from "../../Images/image2.webp";
import image3 from "../../Images/image3.jpg";
import image4 from "../../Images/image4.jpg";
import image5 from "../../Images/image5.jpg";
import image6 from "../../Images/image6.jpg";
import image7 from "../../Images/image7.jpg";
import image8 from "../../Images/image8.jpeg";

const data = [image1, image2, image3, image4, image5, image6, image7, image8];

const Banner = () => {
  return (
    <div>
      <Carousel
        className="carasousel"
        autoPlay={true}
        animation="slide"
        indicators={false}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        navButtonsProps={{
          style: {
            background: "#fff",
            color: "#494949",
            borderRadius: 0,
            marginTop: -22,
            height: "104px",
          },
        }}
      >
        {data.map((img, id) => {
          return (
            <div key={id}>
              <img src={img} alt="img" key={id} className="banner_img" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
