"use client";

import Link from "next/link";

interface BackButtonProps {
  href: string;
  labelText?: string;
  labelLink: string;
}

export default function BackButton({
  href,
  labelText,
  labelLink,
}: BackButtonProps) {
  return (
    <div className="inline-flex flex-wrap w-full items-center mx-1">
      {labelText}
      <button className="font-normal text-sky-700">
        <Link href={href}>{labelLink}</Link>
      </button>
    </div>
  );
}
