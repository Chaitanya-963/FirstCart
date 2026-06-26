import  { useState, useEffect } from "react";
import API from "../api/axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const hydrateUserSession = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const response = await API.get("/api/auth/users");
        if (response.data?.data) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Session restoration failed:", error.message);
        logout();
      } finally {
        setLoading(false);
      }
    };
    hydrateUserSession();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await API.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      return { success: true, user: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login connection failed",
      };
    }
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await API.post("/api/auth/register", {
        name,
        email,
        password,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Registration connection failed",
      };
    }
  };

  const verifyEmailOtp = async (email, otp) => {
    try {
      const response = await API.post("/api/auth/verify-otp", { email, otp });
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Verification invalid",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, loginUser, registerUser, verifyEmailOtp, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
