"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}) {
    const isAuthenticated = true; // Replace with actual authentication logic
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}