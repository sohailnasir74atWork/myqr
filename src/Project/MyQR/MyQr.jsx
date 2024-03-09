import React from "react";
// import commingsoon from "../../Assets/comming soon/comingsoon.png";
import "./commingsoon.css";
const Stats = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="container-commingsoon">
        <img src='https://res.cloudinary.com/dgupxycnh/image/upload/v1709656645/qr/comingsoon_cg6z3r.png' alt="comming soom" />
        <div className="fade-in-out">
          {" "}
          <span className="center">The Pro version is scheduled to go live in mid-2024</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Stats;