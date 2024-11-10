import React from "react";

const SideBar = () => {
  return (
    <div className="flex flex-col h-full  ">
      <div className="flex flex-col ">
        <nav className="flex flex-col gap-3">
          <a
            href="/"
            className="px-4 py-2 border-2 border-r-0  hover:bg-gray-600 transition-colors"
          >
            Add Item
          </a>
          <a
            href="/cart"
            className="px-4 py-2 border-2 border-r-0 hover:bg-gray-600 transition-colors"
          >
            Cart
          </a>
          <a
            href="/order"
            className="px-4 py-2 border-2 border-r-0 hover:bg-gray-600 transition-colors"
          >
            Orders
          </a>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
