import React from "react";
import { assets } from "../assets/assets";
import "./style.css";

const NavBar = () => {
  return (
    <>
      <div className="bg-red-600">
        <div>
          <div>
            <img src={assets.logo} />
          </div>
          <h1>Admin Panel</h1>
        </div>

        <div>
          <img src={assets.profile_icon} />
        </div>
      </div>
    </>
  );
};

export default NavBar;
