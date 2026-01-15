"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { LogIn, LogOut, UserPlus, User } from "lucide-react"; // ← add lucide-react icons

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
    <form onSubmit={handleSubmit} className="space-y-5">
      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent text-center pb-1">
        {type === "signin" ? "Welcome Back" : "Get Started"}
      </DialogTitle>

      <div className="space-y-2">
        <label htmlFor={`${type}-email`} className="text-sm font-medium text-white dark:text-gray-300">
          Email
        </label>
        <Input
          type="email"
          id={`${type}-email`}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="transition-all focus:ring-2 focus:ring-indigo-500/50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor={`${type}-password`} className="text-sm font-medium text-white dark:text-gray-300">
          Password
        </label>
        <Input
          type="password"
          id={`${type}-password`}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="transition-all focus:ring-2 focus:ring-indigo-500/50"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 text-white border-white/30 border-t-white" />
            Processing...
          </span>
        ) : type === "signin" ? (
          <>
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </>
        ) : (
          <>
            <UserPlus className="mr-2 h-4 w-4" /> Create Account
          </>
        )}
      </Button>

      {type === "signin" && (
        <div className="text-center text-sm">
          <Link
            href="/forgot-password"
            className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
      )}
    </form>
  );
};

export default function AuthHeader() {
  const { user, isAuthenticated, loginUser, signupUser, logoutUser, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await loginUser(credentials.email, credentials.password);
      toast({ title: "Welcome back!", description: "Signed in successfully", variant: "default" });
      router.push("/tasks");
    } catch (err: any) {
      toast({
        title: "Sign in failed",
        description: err.message || "Please check your credentials",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (credentials: { email: string; password: string }) => {
    try {
      await signupUser(credentials);
      toast({
        title: "Account created!",
        description: "You can now sign in",
        variant: "default",
      });
      router.push("/tasks"); // or redirect to login if you prefer
    } catch (err: any) {
      toast({
        title: "Sign up failed",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logoutUser();
    toast({ title: "Logged out", description: "See you again soon!", variant: "default" });
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-slate-900/80 to-indigo-950/80 backdrop-blur-xl">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          Todo<span className="text-indigo-400">.</span>
        </Link>

        {/* Auth Controls */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-300">
                <User className="h-4 w-4" />
                <span className="font-medium truncate max-w-[180px]">
                  {user?.email?.split("@")[0]}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/30 transition-all"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-slate-700/50 backdrop-blur-sm">
                  <AuthForm type="signin" onSubmit={handleLogin} loading={loading} />
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-slate-700/50 backdrop-blur-sm">
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