import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    // email: z.string().email({
    //     message:"Email Is Required!" // Custom Message
    // }),
    password: z.string().min(1,{
        message:"Password is Required"
    }),
})