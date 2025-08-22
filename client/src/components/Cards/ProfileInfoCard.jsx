import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center">
        <img
          src={user.profileImageUrl}
          className="w-11 h-11 bg-gray-300 rounded-full mr-3"
        />
        <div className="">
          <div className="text-[15px] text-black font-bold leading-3">
            {user?.name || ""}
          </div>
          <button
            onClick={handleLogout}
            className="text-amber-600 text-sm font-bold cursor-pointer hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
