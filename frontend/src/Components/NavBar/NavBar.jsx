import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { assets } from "../../frontend_assets/assets";
import { useSelector } from "react-redux"; // Use this hook to access Redux state
import { NavLink } from "react-router-dom"; // Import NavLink
import { useState } from "react"; // Import useState

const NavBar = () => {
  const state = useSelector((state) => state); // Get cart item count from Redux
  const cartItems = state.cart.itemCount;
  console.log("state", state);
  console.log("item card : ", cartItems);
  const Navigation = () => {
    const [activeLink, setActiveLink] = useState(null); // Track the active link

    const handleLinkClick = (link) => {
      setActiveLink(link); // Set the clicked link as active
    };

    return (
      <div className="flex justify-between items-center w-2/5 text-lg">
        <button
          onClick={() => handleLinkClick("home")}
          className={`${
            activeLink === "home"
              ? "underline underline-offset-4"
              : "hover:underline underline-offset-4 transition duration-200 ease-in-out"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => handleLinkClick("menu")}
          className={`${
            activeLink === "menu"
              ? "underline underline-offset-4"
              : "hover:underline underline-offset-4 transition duration-200 ease-in-out"
          }`}
        >
          Menu
        </button>

        <button
          onClick={() => handleLinkClick("app")}
          className={`${
            activeLink === "app"
              ? "underline underline-offset-4"
              : "hover:underline underline-offset-4 transition duration-200 ease-in-out"
          }`}
        >
          App
        </button>

        <button
          onClick={() => handleLinkClick("contact")}
          className={`${
            activeLink === "contact"
              ? "underline underline-offset-4"
              : "hover:underline underline-offset-4 transition duration-200 ease-in-out"
          }`}
        >
          Contact Us
        </button>
      </div>
    );
  };

  return (
    <nav className="flex justify-between items-center overflow-hidden mb-6">
      <div className="w-1/5 ">
        <img src={assets.logo} alt="Google Logo" />
      </div>
      <Navigation />
      <div className="flex justify-between w-1/5 items-center">
        <div className="h-6 w-auto items-center">
          <Link>
            <img
              src={assets.search_icon}
              alt="basket"
              className="w-full h-full"
            />
          </Link>
        </div>

        <div className="h-6 w-auto items-center relative ">
          <Link>
            <img
              src={assets.basket_icon}
              alt="basket"
              className="w-full h-full"
            />
          </Link>

          {cartItems > 0 && (
            <span className="absolute top-[-10px] right-[-16px] bg-red-500 text-white text-xs rounded-full h-5 w-5 flex justify-center items-center">
              {cartItems}
            </span>
          )}
        </div>

        <button className="py-2 px-3 text-white font-medium text-lg bg-orange-500 rounded-2xl hover:bg-orange-400  transition duration-300 ease-in-out">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
