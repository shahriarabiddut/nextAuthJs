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

export async function doCredentialsLogin(formdata: any) {
  const validatedFields = LoginSchema.safeParse(formdata);
  try {
    const response = await signIn("credentials", {
      email: formdata.email,
      password: formdata.password,
      redirect: false,
    });
    // console.log(response);
    return { success: "Successfuly Logged in!" };
  } catch (error) {
    // console.log(error);
    return { error: "Invalid Credentials!" };
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
