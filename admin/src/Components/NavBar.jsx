import React, { useContext } from "react";
import { assets } from "../frontend_assets/assets";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const { admin, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success("Logged out successfully");
    } else {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="flex justify-between items-center px-10 py-2 border-b-2">
      <div className="flex items-center">
        <img src={assets.logo} alt="logo" className="w-full" />
        <h1 className="text-lg font-medium pl-2">Admin Panel</h1>
      </div>

      <div className="flex items-center">
        {admin && (
          <div className="mr-4">
            <span className="font-medium text-gray-700">
              Welcome, {admin.name}
            </span>
            <button
              onClick={handleLogout}
              className="ml-3 text-sm text-orange-600 hover:text-orange-800 font-medium"
            >
              Logout
            </button>
          </div>
        )}
        <div className="rounded-full w-10 h-10 border-2 border-black">
          <img
            src={assets.profile_icon}
            alt="profile"
            className="rounded-full w-full h-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
