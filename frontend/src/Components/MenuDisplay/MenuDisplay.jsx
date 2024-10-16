import React from "react";
import { food_list } from "../../frontend_assets/assets";
import Dish from "../DishDisplay/Dish";

const MenuDisplay = ({ categorie }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {food_list.map((item, index) => {
        if (item.category === categorie || categorie === "All") {
          return (
            <Dish
              key={index}
              name={item.name}
              image={item.image}
              price={item.price}
              description={item.description}
              category={item.category}
              id={item._id}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default MenuDisplay;
