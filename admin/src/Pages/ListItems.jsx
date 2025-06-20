import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ListItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:5000/api/food/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setItems((prev) => prev.filter((item) => item._id !== id));
      alert("Item deleted successfully.");
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(items);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 ">Dish Table</h1>

      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={`http://localhost:5000/${item.imageUrl.replace(
                    "\\",
                    "/"
                  )}`} // Replace backslashes with forward slashes
                  alt={item.name}
                  className="w-16 h-16 object-cover mx-auto rounded"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                ${item.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => navigate(`/update/${item._id}`)}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  >
                    Edit
                  </button>
                  {console.log("id:" + item._id)}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListItems;
