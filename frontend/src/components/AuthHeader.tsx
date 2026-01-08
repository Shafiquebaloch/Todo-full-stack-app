"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Re-using the form structure from the old signin/signup pages
const AuthForm = ({ type, onSubmit, loading, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="mb-4 text-xl font-bold">
        {type === "signin" ? "Sign In" : "Sign Up"}
      </h2>
      {error && (
        <p className="mb-4 rounded bg-red-100 p-2 text-red-700">{error}</p>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id={`${type}-email`}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id={`${type}-password`}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        disabled={loading}
      >
        {loading ? "Processing..." : type === "signin" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default function AuthHeader() {
  const { user, isAuthenticated, loginUser, signupUser, logoutUser, loading } = useAuth();
  const router = useRouter();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async ({ email, password }) => {
    setError(null);
    try {
      await loginUser(email, password);
      setShowSignInModal(false);
      router.push("/tasks");
    } catch (err: any) {
      setError(err.message || "Failed to sign in.");
    }
  };

  const handleSignup = async ({ email, password }) => {
    setError(null);
    try {
      await signupUser({ email, password });
      setShowSignUpModal(false);
      router.push("/tasks");
    } catch (err: any) {
      setError(err.message || "Failed to sign up.");
    }
  };



  const handleLogout = () => {
    logoutUser();
    router.push("/"); // Redirect to home or signin page after logout
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
              <span className="text-sm">Welcome, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowSignInModal(true)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowSignUpModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Sign Up
              </button>

            </>
          )}
        </div>
      </nav>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <button
              onClick={() => setShowSignInModal(false)}
              className="float-right text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <AuthForm type="signin" onSubmit={handleLogin} loading={loading} error={error} />
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <button
              onClick={() => setShowSignUpModal(false)}
              className="float-right text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <AuthForm type="signup" onSubmit={handleSignup} loading={loading} error={error} />
          </div>
        </div>
      )}
    </header>
  );
}
