import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is Required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email Is Required!",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 Characters Required!",
  }),
  name: z.string().min(1, {
    message: "Name is Required!",
  }),
});

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(6, "Email must be at least 6 characters")
    .email("Please enter a valid email")
    .toLowerCase(),
  password: z.string().min(6, "Password is required"),
});
