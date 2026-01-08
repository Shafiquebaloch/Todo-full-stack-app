"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, UserCreate } from "@/types";
import { login, signup as apiSignup } from "@/services/api";



interface AuthContextType {
  user: User | null;
  token: string | null;

  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  signupUser: (userData: UserCreate) => Promise<void>;
  logoutUser: () => void;

  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");


    if (storedToken) {
      setToken(storedToken);
      setUser({ id: 0, email: "user@example.com" }); // Placeholder, would fetch actual user data

    }
    setLoading(false);
  }, []);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await login(email, password);
      setToken(response.access_token);
      localStorage.setItem("token", response.access_token);

      // Ideally, fetch user details with the token to set the 'user' state
      setUser({ id: 0, email: email }); // Placeholder user
    } finally {
      setLoading(false);
    }
  };

  const signupUser = async (userData: UserCreate) => {
    setLoading(true);
    try {
      await apiSignup(userData);
      // Optionally auto-login after signup
      await loginUser(userData.email, userData.password);
    } finally {
      setLoading(false);
    }
  };



  const logoutUser = () => {
    setToken(null);

    setUser(null);
    localStorage.removeItem("token");

  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,

        isAuthenticated,
        loginUser,
        signupUser,
        logoutUser,

        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  ); // Add this closing parenthesis and semicolon
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
