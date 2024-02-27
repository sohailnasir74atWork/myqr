import React from 'react';
import commingsoon from "../../Assets/comming soon/comingsoon.png"
import '../MyQR/commingsoon.css'
const Stats = () => {
  return <div className="container" style={{ backgroundColor: "white" }}>
  <div className="container-commingsoon">
    <img src={commingsoon} alt="comming soom" />
    <div className="fade-in-out">
      {" "}
      <span>The Pro version is scheduled to go live in mid-2024</span>{" "}
    </div>
  </div>
</div>
}

export default Stats