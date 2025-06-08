import React, { useState } from "react";
import { register, login } from "../../services/authService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setLoading,
  setError,
  clearError,
} from "../../reducers/slicers/userSlice";

const Modal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
    dispatch(clearError());
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(setLoading(true));

    try {
      if (isSignIn) {
        // Login
        const { email, password } = formData;
        const response = await login({ email, password });

        if (!response || !response.user || !response.token) {
          throw new Error("Invalid response from server");
        }

        dispatch(setUser({ user: response.user, token: response.token }));
        toast.success("Successfully logged in!");
        onClose();
      } else {
        // Register and then automatically login
        const { username, email, password } = formData;
        await register({ name: username, email, password });
        const loginResponse = await login({ email, password });

        if (!loginResponse || !loginResponse.user || !loginResponse.token) {
          throw new Error("Invalid response from server");
        }

        dispatch(
          setUser({ user: loginResponse.user, token: loginResponse.token })
        );
        toast.success("Successfully registered and logged in!");
        onClose();
      }
    } catch (error) {
      const errorMessage = error.message || "An error occurred";
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <div className="mb-6">
              <label
                className="block mb-2 font-semibold text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="border border-gray-300 rounded-lg w-full p-3 text-gray-800"
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block mb-2 font-semibold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="border border-gray-300 rounded-lg w-full p-3 text-gray-800 pr-10"
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white py-3 w-full rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={handleToggle}
            className="text-orange-500 hover:text-orange-600 font-semibold"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Modal;
