import React from "react";
import "./subheader.css";
// import candb from "../../Images/candb.jpg";
// import purchase from "../../Images/purchase.png";

const SubHeader = () => {
  return (
    <div className="new_nav">
      <div className="nav_data">
        <div className="left_data">
          <p>
            <i className="fa fa-search"></i> All
          </p>
          <p>
            <i className="fa fa-bicycle"></i> Cycles
          </p>
          <p>
            <i className="fa fa-motorcycle"></i> Bikes
          </p>
          <p>
            <i className="fa fa-car"></i> Cars
          </p>
          <p>
            <i className="fa fa-handshake-o"></i> Today's Deal
          </p>
          <p>
            <i className="fa fa-square"></i> Offers
          </p>
          <p>
            <i className="fa fa-wrench"></i> Spare Parts
          </p>
          <p>
            <i className="fa fa-tint"></i> Lubricants
          </p>
          <p>
            <i className="fa fa-bicycle"></i>
            <i className="fa fa-wrench"></i> Cycle Service
          </p>
          <p>
            <i className="fa fa-motorcycle"></i>
            <i className="fa fa-wrench"></i> Bike Service
          </p>
          <p>
            <i className="fa fa-car"></i>
            <i className="fa fa-wrench"></i> Car Service
          </p>
          <p>
            <i className="fa fa-male"></i> Enquiry centre
          </p>
        </div>
        {/* <div className="right_data">
          <p>
            <img src={candb} alt="cb" />
            <img src={purchase} alt="purchase" />
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default SubHeader;
