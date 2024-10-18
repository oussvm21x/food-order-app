import React, { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        <form>
          <div className="mb-6">
            <label
              className="block mb-2 font-semibold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-gray-300 rounded-lg w-full p-3 text-gray-800"
              type="email"
              id="email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 font-semibold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-300 rounded-lg w-full p-3 text-gray-800"
              type="password"
              id="password"
              required
            />
          </div>
          <button className="bg-orange-500 text-white py-3 w-full rounded-lg font-semibold hover:bg-orange-600">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={handleToggle}
            className="text-orange-500 font-semibold"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
        <button
          onClick={onClose}
          className="mt-6 text-red-500 block mx-auto font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
