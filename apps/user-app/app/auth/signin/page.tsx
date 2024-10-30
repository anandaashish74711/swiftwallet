"use client"; // This is a client-side component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image"; 

export default function SignIn() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession(); 

  useEffect(() => {
    // Fetch CSRF token on component mount
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (session) {  
      router.push("/Dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    const result = await signIn("credentials", {
      redirect: false, 
      email,
      password,
    });

    if (result?.ok) {
      router.push("/app/Dashboard"); 
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-5 rounded-xl shadow-md w-full max-w-sm">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <Image
            src="/nimbo.png"
            alt="Nimbo Logo"
            width={50}
            height={50}
            priority
            className="rounded-full"
          />
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-blue-700 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-blue-500 mb-4">
          Sign in to your account
        </p>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="csrfToken"
            type="hidden"
            value={csrfToken || ""}
            readOnly
          />

          <div>
            <label htmlFor="email" className="block text-blue-600 mb-1">
            
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email or username"
              required
              className="w-full px-2 py-2 rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-blue-600 mb-1">
            
            </label>
            <input
              name="password"
              type="password"
              placeholder="password"
              required
              className="w-full px-4 py-2 rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full font-semibold transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-blue-500 mt-4">
          Don’t have an account?{" "}
          <Link
            href="/pages/auth/signup"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
