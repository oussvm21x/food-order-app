import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { updateUser as updateUserService } from "../../services/authService";
import { setUser } from "../../reducers/slicers/userSlice";
const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.name || "");
  const [userEmail, setUserEmail] = useState(user?.email || "");

  // If user is not authenticated, redirect to home
  React.useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Update local state when user data changes from Redux
  useEffect(() => {
    setUserName(user?.name || "");
    setUserEmail(user?.email || "");
  }, [user]);

  if (!user) return null;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Reset local state if canceling edit
    if (isEditing) {
      setUserName(user?.name || "");
      setUserEmail(user?.email || "");
    }
  };

  // Placeholder for handleSave - will be implemented later
  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (userName != user.name) {
        formData.append("name", userName);
      }
      if (userEmail != user.email) {
        formData.append("email", userEmail);
      }

      const response = await updateUserService(formData);
      // Update Redux state with the new user data and token
      dispatch(
        setUser({
          user: response.user,
          token: response.token,
        })
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error.message);
    }
  };

  return (
    <div className="relative profile-container">
      <button
        onClick={handleEditToggle}
        className="absolute top-4 right-10 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>
      <div className="profile-card relative">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt={user.name} />
            ) : (
              <div className="avatar-placeholder">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
            )}
          </div>
          {isEditing ? (
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-2xl font-bold text-gray-800 text-center border-b-2 border-orange-400 focus:outline-none"
            />
          ) : (
            <h1>{user.name}</h1>
          )}
        </div>

        <div className="profile-info">
          <div className="info-group">
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="text-gray-800 text-xl border-b-2 border-orange-400 focus:outline-none"
              />
            ) : (
              <p>{user.email}</p>
            )}
          </div>

          <div className="info-group">
            <label>Member Since</label>
            <p>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Not available"}
            </p>
          </div>
        </div>
        {isEditing && (
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
