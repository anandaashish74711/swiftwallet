// app/components/navbar.tsx
"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export const Navbar = () => {
  const { data: session, status } = useSession(); 
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>; 
  }

  return (
    <div>
      {!session ? (
        <button
          onClick={() => router.push("/pages/auth/signin")}
          aria-label="Sign In"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Sign In
        </button>
      ) : (
        <>
          <p>Welcome, {session.user?.email}!</p>
          <button
            onClick={() => {
              signOut().catch((error) => {
                console.error("Sign out error", error);
              });
            }}
            aria-label="Sign Out"
            className="bg-red-500 text-white p-2 rounded"
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
};
