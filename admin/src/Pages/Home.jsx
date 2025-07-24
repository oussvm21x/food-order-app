import React from "react";
import { Route, Routes } from "react-router-dom";
import AddItem from "./AddItem";
import ListItems from "./ListItems";
import Orders from "./Orders";
import SideBar from "../Components/SideBar";
import Update from "./Update";

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/5 pl-5 py-10 border-r-2">
        <SideBar />
      </div>

      <div className="w-4/5 p-6 bg-gray-100 overflow-auto">
        <Routes>
          <Route path="/" element={<AddItem />} />
          <Route path="/cart" element={<ListItems />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
