import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center bg-radial from-sky-500   to-blue-800">
      {children}
    </div>
  );
}
