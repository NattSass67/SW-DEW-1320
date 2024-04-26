"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {

    localStorage.setItem("isloggedin", "false");

    const isUserLoggedIn = localStorage.getItem("isloggedin") === "true";

    if (isUserLoggedIn) {

      router.push("/history");
    } else {
      router.push("/signin");
    }
  }, []);

  return null;
};