"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // shadcn/ui Dialog
import { Input } from "@/components/ui/input"; // shadcn/ui Input
import { toast } from "@/components/ui/use-toast"; // shadcn/ui toast

interface AuthFormProps {
  type: "signin" | "signup";
  onSubmit: (credentials: { email: string; password: string }) => void;
  loading: boolean;
}

const AuthForm = ({ type, onSubmit, loading }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <DialogTitle className="mb-4 text-center text-2xl font-bold text-gray-800">
        {type === "signin" ? "Sign In" : "Sign Up"}
      </DialogTitle>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          type="email"
          id={`${type}-email`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          type="password"
          id={`${type}-password`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
        {loading ? "Processing..." : type === "signin" ? "Sign In" : "Sign Up"}
      </Button>
      {type === "signin" && (
        <p className="mt-4 text-center text-sm">
          <Link href="/forgot-password" className="text-indigo-600 hover:underline">
            Forgot Password?
          </Link>
        </p>
      )}
    </form>
  );
};

export default function AuthHeader() {
  const { user, isAuthenticated, loginUser, signupUser, logoutUser, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      await loginUser(email, password);
      toast({
        title: "Success",
        description: "Signed in successfully!",
        variant: "default",
      });
      router.push("/tasks");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to sign in.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async ({ email, password }: { email: string; password: string }) => {
    try {
      await signupUser({ email, password });
      toast({
        title: "Success",
        description: "Account created successfully! Please sign in.",
        variant: "default",
      });
      router.push("/tasks");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to sign up.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Success",
      description: "Logged out successfully!",
      variant: "default",
    });
    router.push("/");
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Todo App
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-300">Welcome, {user?.email}</span>
              <Button onClick={handleLogout} variant="destructive" size="sm">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <AuthForm type="signin" onSubmit={handleLogin} loading={loading} />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                    Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <AuthForm type="signup" onSubmit={handleSignup} loading={loading} />
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
