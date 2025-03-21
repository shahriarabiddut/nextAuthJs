"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { doSocialLogin } from "@/actions/login";

export default function Social() {
  return (
    <>
      {/* Add New Provider */}
      {/* 1. Just Add a button change value properly! */}
      {/* 2. Import the provider in auth.ts properly and setup with proper keys! */}
      {/* 2. That's All ! */}
      <form action={doSocialLogin} className="grid grid-cols-2 w-full gap-2">
        <Button
          size={"lg"}
          className="w-full"
          variant={"outline"}
          type="submit"
          name="action"
          value={"google"}
        >
          <FcGoogle />
        </Button>
        <Button
          size={"lg"}
          className="w-full"
          variant={"outline"}
          type="submit"
          name="action"
          value={"github"}
        >
          <FaGithub className="" />
        </Button>
      </form>
    </>
  );
}
