import React from "react";
import { assets } from "../assets/assets";

const NavBar = () => {
  return (
    <>
      <div className="pad">
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
