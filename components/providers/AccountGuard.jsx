"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AccountGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state) => state.user);
  const isAuthenticated = !!user?._id;

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, router, pathname]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
