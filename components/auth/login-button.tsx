"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClickHandle = () => {
    // alert("Clicked");
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>TODO : Implement Modal</span>;
  }

  return (
    <span onClick={onClickHandle} className="cursor-pointer">
      {children}
    </span>
  );
};
