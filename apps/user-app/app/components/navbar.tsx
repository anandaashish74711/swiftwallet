"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";

export const Navbar = () => {
  const { data: session, status } = useSession(); // Always called at the top level
  const router = useRouter();

  console.log(status)

  const handleSignIn = () => {
    router.push("/auth/signin");
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false }); // Prevent automatic redirect
      router.replace("/"); // Replace ensures no back navigation to dashboard
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Handle redirect to the root page if the session is null
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/"); // Ensure no flicker of the dashboard
    }
  }, [status]); // Always ensure dependencies are stable
  
  if (status === "loading") {
    return <p aria-live="polite">Loading...</p>;
  }

  return (
    <nav className="bg-white border-b py-3 shadow-sm fixed top-0 inset-x-0 z-10">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        {/* Logo Section */}
        <a href="/" className="flex items-center space-x-2">
          <Image
            src="/nimbo.png"
            alt="Nimbo Logo"
            width={50}
            height={50}
            priority
            className="rounded-full"
          />
          <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400"></span>
        </a>

        {/* Authentication Section */}
        <div className="flex items-center space-x-4">
          {!session ? (
            <button
              onClick={handleSignIn}
              aria-label="Sign In"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-full transition-colors duration-200"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              aria-label="Sign Out"
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-full transition-colors duration-200"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
