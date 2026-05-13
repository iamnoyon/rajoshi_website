"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProfileQuery } from "../store/public";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/user";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  // getting user
  const user = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading,
    isError,
  } = useProfileQuery();

  // ✅ Sync API user → Redux store
  useEffect(() => {
    if (profileData?.user) {
      dispatch(setUser(profileData.user));
    }
  }, [profileData]);

  // ✅ Authentication status (REAL logic)
  const isAuthenticated = !!user;

  // ✅ Redirect unauthenticated users
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/");
    }
    if(isError){
      router.replace("/")
    }
  }, [isLoading, isAuthenticated, router, isError]);

  // ✅ Prevent UI flash while checking auth
  if (isLoading) {
    return null; // or a loader component
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}