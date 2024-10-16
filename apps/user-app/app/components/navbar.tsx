"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import ThemeSwitcher from "./themeprovide";

export const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/pages/auth/signin").catch((error) =>
      console.error("Navigation error:", error)
    );
  };

  const handleSignOut = () => {
    signOut().catch((error) => console.error("Sign out error:", error));
  };

  if (status === "loading") {
    return <p aria-live="polite">Loading...</p>;
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      {!session ? (
        <button
          onClick={handleSignIn}
          aria-label="Sign In"
          className="bg-blue-500 py-7 text-white p-2 rounded"
        >
          Sign In
        </button>
      ) : (
        <>
          <p>Welcome, {session.user?.email}!</p>
          <button
            onClick={handleSignOut}
            aria-label="Sign Out"
            className="bg-red-500 text-white p-2 rounded"
          >
            Sign Out
          </button>
        </>
      )}
      <ThemeSwitcher />
      </nav>
  );
};
