"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn, signOut } from "@/actions/auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Credentials!" };
  }
  return { success: "Successfuly Logged in!" };
};

export async function doSocialLogin(formdata: any) {
  const action = formdata.get("action");
  await signIn(action, { redirectTo: "/home" });
  console.log(action);
}
export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
