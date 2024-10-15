import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../frontend_assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-semibold mb-3">Explore Menu</h1>
          <p className="">
            Discover a world of culinary delights right at your fingertips. From
            gourmet meals crafted by local chefs to quick bites that satisfy
            your cravings, our menu features a diverse selection to suit every
            taste. Whether you’re in the mood for spicy, savory, or sweet, we
            have something for everyone.
          </p>
        </div>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide ">
          {menu_list.map((item) => (
            <div
              onClick={() => {
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                );
                console.log(category);
              }}
              key={item.menu_name}
              className={`flex-shrink-0 mb-6 ${
                category === item.menu_name
                  ? "border-4 border-orange-500 rounded-full"
                  : ""
              }`}
            >
              <div className="text-center">
                <img
                  src={item.menu_image}
                  alt=""
                  className="w-32 h-32 rounded-full object-cover cursor-pointer"
                />
                <h1 className="text-xl mt-3 ">{item.menu_name}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExploreMenu;
