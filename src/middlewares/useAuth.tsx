"use client";
import { useRouter } from "next-intl/client";
import { useEffect } from "react";
export default function useAuth() {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("AccessToken");

    if (!isAuthenticated) {
      router.push("/");
    }
  }, []);
}
