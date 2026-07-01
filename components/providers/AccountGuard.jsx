"use client";

import { useProfileQuery } from "@/store/public/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/user";

export default function AccountGuard({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isAuthenticated = !!user?.id;

  const { data: profileData, isLoading, error } = useProfileQuery();

  useEffect(() => {
    if (profileData?.success && profileData?.data) {
      dispatch(setUser(profileData.data));
    }
  }, [profileData, dispatch]);

  useEffect(() => {
    if (error?.status === 401 || (error && !isLoading)) {
      router.replace("/auth/login");
    }
  }, [error, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#042A55]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
