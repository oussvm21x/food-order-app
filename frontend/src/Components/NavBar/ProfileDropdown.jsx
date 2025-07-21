import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutService } from "../../services/authService";
import { logout as logoutRedux } from "../../reducers/slicers/userSlice";
import { resetToGuestMode } from "../../reducers/slicers/cartSlice";
import { toast } from "react-toastify";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Example avatar (replace with user avatar if available)
  const avatarUrl =
    "https://ui-avatars.com/api/?name=User&background=orange&color=fff";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-8 h-8 rounded-full border border-orange-400"
        />
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M5.25 7.5L10 12.25L14.75 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50">
          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
            My Profile
          </Link>
          <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
            My Orders
          </Link>
          <button
            onClick={async () => {
              try {
                await logoutService();
                dispatch(logoutRedux());
                dispatch(resetToGuestMode());
                toast.error("Logged out successfully!");
                navigate("/");
              } catch (err) {
                console.error("Logout error:", err);
                toast.error(err.message || "Logout failed");
              }
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
