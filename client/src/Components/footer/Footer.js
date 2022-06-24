import React from "react";
import "./footer.css";
import mdvlogo from "../../Images/mdvlogo.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer_container">
        <div className="footr_details_one">
          <h3>Introduction</h3>
          <p>
            <i className="fa fa-users"></i> About US
          </p>
          <p>
            <i className="fa fa-trophy"></i> Careers
          </p>
          <p>
            <i className="fa fa-newspaper-o"></i> Press Releases
          </p>
          <p>
            <i className="fa fa-heartbeat"></i> MDV Cares
          </p>
        </div>

        <div className="footr_details_one forres">
          <h3>Spend with Us</h3>
          <p>
            <i className="fa fa-whatsapp"></i> WhatsApp
          </p>
          <p>
            <i className="fa fa-money"></i> Buying and Selling
          </p>
          <p>
            <i className="fa fa-exchange"></i> Rental
          </p>
        </div>

        <div className="footr_details_one">
          <h3>Connect with Us</h3>
          <p>
            <i className="fa fa-whatsapp"></i> WhatsApp
          </p>
          <p>
            <i className="fa fa-facebook-official"></i> Facebook
          </p>
          <p>
            <i className="fa fa-instagram"></i> Instagram
          </p>
          <p>
            <i className="fa fa-twitter"></i> Twitter
          </p>
        </div>

        <div className="footr_details_one forres">
          <h3>For More Queries</h3>
          <p>
            <i className="fa fa-phone-square"></i> 080 - 777 888 333
          </p>
          <p>
            <i className="fa fa-map-marker"></i> Bangalore
          </p>
          <p>
            <i className="fa fa-circle-o"></i> 560019
          </p>
        </div>
      </div>
      <div className="lastdetails">
        <img src={mdvlogo} alt="logo" />
        <p>
          <a href="www.mydreamvehivle.com">Condition for Use & Sale</a>{" "}
          &nbsp;&nbsp;&nbsp; <a href="www.mydreamvehivle.com">Privacy Notice</a>{" "}
          &nbsp; &nbsp;&nbsp; Interest-Based Ads &nbsp;&nbsp;&nbsp;{" "}
          <i className="fa fa-registered"></i>&nbsp;
          <i className="fa fa-copyright"></i> Since {year},&nbsp;
          <a href="www.mydreamvehivle.com">www.mydreamvehicle.com</a> Inc. or
          its affiliates
        </p>
      </div>
    </footer>
  );
};

export default Footer;
