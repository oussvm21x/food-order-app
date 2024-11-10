import React from "react";
import { assets } from "../frontend_assets/assets";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-2  border-b-2">
      <div className="">
        <img src={assets.logo} alt="logo" className="w-full " />
        <h1 className="text-lg font-medium pl-2">Admin Panel</h1>
      </div>
      <div className="rounded-full w-10 h-10 border-2 border-black">
        <img
          src={assets.profile_icon}
          alt="profile"
          className="rounded-full w-full h-full"
        />
      </div>
    </nav>
  );
};

export default NavBar;
