import React, { createContext, useContext, useEffect, useState } from "react";
import { Users } from "../interface/users";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  user?: Users | null;
  login: (token: string, user: Users) => void;
  logout: (token: string, user: Users) => void;
  isAdmin?: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider ");
  }
  return context;
};
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Users | null>(null);
  const nav = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    if (token) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      setUser(user);
    }
  }, []);

  const login = (token: string, user: Users) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    nav(user.role === "admin" ? "/admin" : "/");
  };

  const logout = (token: string, user: Users) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(user);
    nav("/login");
  };
  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAdmin: user?.role === "admin" }}
    >
      {children}
    </AuthContext.Provider>
  );
};
