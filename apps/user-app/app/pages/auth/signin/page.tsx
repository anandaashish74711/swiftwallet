"use client"; // This is a client-side component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For Next.js 13+
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function SignIn() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession(); // Track authentication state

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
      router.push("/pages/Dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    const result = await signIn("credentials", {
      redirect: false, // Prevent immediate redirect
      email,
      password,
    });

    if (result?.ok) {
      router.push("/pages/Dashboard"); // Redirect on success
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="csrfToken"
          type="hidden"
          value={csrfToken || ""}
          readOnly
        />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link href="/auth/signup">Sign up</Link>
      </p>
    </div>
  );
}
