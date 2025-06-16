import React from "react";
import Dish from "../DishDisplay/Dish";
import { useState, useEffect } from "react";

const MenuDisplay = ({ categorie }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/food");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const items = await response.json();
      setItems(items);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(items);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {items.map((item, index) => {
        if (item.category === categorie || categorie === "All") {
          return (
            <Dish
              key={index}
              name={item.name}
              image={item.imageUrl}
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
