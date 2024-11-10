import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddItem from "./AddItem";
import ListItems from "./ListItems";
import Orders from "./Orders";
import SideBar from "../Components/SideBar";

const Home = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/5 pl-5 py-10 border-r-2">
        <SideBar />
      </div>

      <div className="w-4/5 p-6 bg-gray-100 overflow-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AddItem />} />
            <Route path="/cart" element={<ListItems />} />
            <Route path="/order" element={<Orders />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Home;
