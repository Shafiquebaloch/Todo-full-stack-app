"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/tasks");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || isAuthenticated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950">
        <div className="flex items-center gap-3 text-white/80">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span className="text-lg font-medium">Redirecting...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-80 w-80 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mb-10 animate-fade-in-up">
          <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl lg:text-7xl">
            Todo Master
          </h1>
          <p className="mt-4 text-xl font-medium text-gray-700 md:text-2xl">
            Organize your life with style
          </p>
        </div>

        <div className="mb-12 max-w-xl animate-fade-in-up animation-delay-200">
          <p className="text-lg leading-relaxed text-gray-600">
            Sign in or sign up to unlock your personal task universe.<br />
            Or just continue as guest and start conquering tasks right now!
          </p>
        </div>

        {/* Optional: nice call-to-action buttons */}
        <div className="flex flex-wrap justify-center gap-5 animate-fade-in-up animation-delay-300">
          <button
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-100"
            onClick={() => router.push("/login")}
          >
            <span className="relative z-10">Sign In</span>
            <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform group-hover:translate-x-full" />
          </button>

          <button
            className="rounded-xl border-2 border-purple-600 bg-white/70 px-8 py-4 font-semibold text-purple-700 backdrop-blur-sm transition-all hover:bg-purple-50 hover:shadow-lg active:scale-98"
            onClick={() => router.push("/signup")}
          >
            Create Account
          </button>

          <button
            className="rounded-xl bg-gray-800/90 px-8 py-4 font-semibold text-white transition-all hover:bg-gray-900 hover:shadow-xl active:scale-98"
            onClick={() => router.push("/tasks")}
          >
            Continue as Guest →
          </button>
        </div>

        {/* Small footer text */}
        <p className="mt-16 text-sm text-gray-500/80">
          Made with ❤️ • Modern • Fast • Beautiful
        </p>
      </div>
    </div>
  );
}

// Optional: Add these animations in your globals.css or component
/*
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}
*/