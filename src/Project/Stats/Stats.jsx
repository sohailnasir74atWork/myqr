import React from 'react';
import commingsoon from "../../Assets/comming soon/comingsoon.png"
import './statsStyles.css'
const Stats = () => {
  return <div className='container'>
    <div className='container-commingsoon'>
    <img src={commingsoon} alt='comming soom'/>
    </div>
  </div>;
}

export default Stats