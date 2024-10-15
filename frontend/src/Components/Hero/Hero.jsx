import React from "react";
import "./Hero.css";
import { assets } from "../../frontend_assets/assets";

const Hero = () => {
  return (
    <>
      <div
        className="flex justify-start bg-cover bg-center h-[90vh] items-center rounded-2xl text-white mb-6"
        style={{ backgroundImage: `url(${assets.header_img})` }}
      >
        <div className="items-start px-3 fade-in">
          <h1 className="text-xl font-bold mb-2">Delicious Meals</h1>
          <h1 className="text-xl font-bold mb-4">Delivered to Your Doorstep</h1>
          <p className="text-xl max-w-[50vw] mb-8">
            {" "}
            {/* Changed w-[50vw] to max-w-[50vw] */}
            Craving something tasty? We've got you covered! From your favorite
            local restaurants to quick and easy meals, enjoy fresh and hot
            dishes delivered in no time.
          </p>
          <button className="py-2 px-3 font-medium text-lg bg-white text-orange-500 rounded-2xl hover:bg-orange-400 hover:text-white transition duration-300 ease-in-out">
            Order Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
