import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { assets } from "../../frontend_assets/assets";
import { useSelector } from "react-redux"; // Use this hook to access Redux state
import { useState } from "react"; // Import useState
import { MdFastfood } from "react-icons/md";
import { MdNoFood } from "react-icons/md";
import "./NavBar.css";

const NavBar = () => {
  // Get cart items count from Redux
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const [activeLink, setActiveLink] = useState(null); // Track the active link

  const handleLinkClick = (link) => {
    setActiveLink(link); // Set the clicked link as active
  };
  console.log("Items in cart:", itemsCount);

  const Navigation = () => {
    return (
      <div className="flex justify-between items-center w-2/5 text-lg lg:flex-row ">
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

  const MobileNav = () => {
    return (
      <div className="items-center text-lg flex-col absolute top-0 right-0 h-[100vh] w-[100vw] bg-gray-200 z-10 ">
        <div className="flex justify-end w-full p-10">
          <button onClick={handleToogle} className="">
            <MdNoFood className="text-3xl text-gray-800" />
          </button>
        </div>

        <div className="flex flex-col justify-center gap-20 h-3/4">
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
      </div>
    );
  };

  const [toogle, setToogle] = useState(false);
  const handleToogle = () => {
    setToogle(!toogle);
  };

  return (
    <nav>
      <div className="hidden lg:block">
        <div className="flex justify-between items-center overflow-hidden mb-6">
          <div className="w-1/5">
            <img src={assets.logo} alt="Logo" className="w-full h-full" />
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

            <div className="h-6 w-auto items-center relative">
              <Link>
                <img
                  src={assets.basket_icon}
                  alt="basket"
                  className="w-full h-full"
                />
              </Link>

              {itemsCount > 0 && (
                <span className="absolute top-[-10px] right-[-16px] bg-red-500 text-white text-xs rounded-full h-5 w-5 flex justify-center items-center">
                  {itemsCount}
                </span>
              )}
            </div>

            <button className="py-2 px-3 text-white font-medium text-lg bg-orange-500 rounded-2xl hover:bg-orange-400  transition duration-300 ease-in-out">
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <div className="flex justify-between items-end mb-6">
          <div className="w-2/5 ">
            <img src={assets.logo} alt="Google Logo" />
          </div>
          <div className="w-2/5 flex justify-end items-end gap-10">
            <div className="w-7 h-7 items-end hidden sm:block">
              <Link>
                <img
                  src={assets.search_icon}
                  alt="basket"
                  className="w-full h-full"
                />
              </Link>
            </div>

            <div className="w-7 h-7 items-center relative hidden sm:block">
              <Link>
                <img
                  src={assets.basket_icon}
                  alt="basket"
                  className="w-full h-full"
                />
              </Link>

              {itemsCount > 0 && (
                <span className="absolute top-[-10px] right-[-16px] bg-red-500 text-white text-xs rounded-full h-5 w-5 flex justify-center items-center">
                  {itemsCount}
                </span>
              )}
            </div>

            <button onClick={handleToogle} className="">
              <MdFastfood className="text-3xl text-gray-800 w-10 h-10" />
            </button>
            {toogle && <MobileNav />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
