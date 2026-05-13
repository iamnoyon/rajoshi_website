import { siteConfig } from "@/config/siteConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base query
const baseQuery = fetchBaseQuery({
  baseUrl: siteConfig?.baseUrl,
  credentials: "include", // send cookies automatically
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// Wrapper query with auto refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // First request
  let result = await baseQuery(args, api, extraOptions);

  // If access token expired
  if (result?.error?.status === 401) {
    console.log("Access token expired. Refreshing...");

    // Call refresh token endpoint
    const refreshResult = await baseQuery(
      {
        url: "/auth/token-refresh", // your refresh endpoint
        method: "POST",
      },
      api,
      extraOptions
    );

    // If refresh successful, retry original request
    if (refreshResult?.data?.success) {
      console.log("Token refreshed successfully.");

      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("Refresh token expired.");

      // Optional: clear user state / redirect login
      // api.dispatch(logout());

      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
});