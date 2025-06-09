import React, { createContext, useState, useEffect } from "react";
import {
  login as apiLogin,
  signup as apiSignup,
  logout as apiLogout,
  getToken,
} from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) setUser({ token });
  }, []);

  const login = async (username, password) => {
    try {
      const data = await apiLogin(username, password);
      if (data && data.token) {
        setUser({ username, token: data.token });
        localStorage.setItem("token", data.token); // optional: store token
        return true; // ✅ return true on success
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false; // ✅ return false on failure
    }
  };

  const signup = async (username, email, password) => {
    try {
      await apiSignup({ username, email, password, roles: ["ROLE_USER"] });
      return await login(username, password);
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  };

  const logout = () => {
    apiLogout();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
