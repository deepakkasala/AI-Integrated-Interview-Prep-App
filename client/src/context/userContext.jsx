import React, { createContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useState } from "react";
import { useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokenValue, setTokenValue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data.user);
      } catch (error) {
        console.error("User not Authenticated.");
        clearUser();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    // localStorage.setItem("token", userData.token);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        clearUser,
        tokenValue,
        setTokenValue,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
