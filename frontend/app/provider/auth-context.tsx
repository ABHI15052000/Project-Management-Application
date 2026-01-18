import { useQueryClient } from "@tanstack/react-query";
import React, { use, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { check, set } from "zod";
import { publicRoutes } from "~/lib";
import type { User } from "~/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, setuser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const publicRoute = publicRoutes.includes(currentPath);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const userInfo = localStorage.getItem("user");

      if (userInfo) {
        setuser(JSON.parse(userInfo!));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        if (!publicRoute) {
          navigate("/sign-in");
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      logout();
      navigate("/sign-in");
    };
    window.addEventListener("force-logout", handleLogout);
    return () => window.removeEventListener("force-logout", handleLogout);
  }, []);

  const login = async (data: any) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setuser(data.user);
    setIsAuthenticated(true);
  };
  const logout = async (): Promise<void> => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setuser(null);
    setIsAuthenticated(false);
    queryClient.clear();
  };

  const values = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
