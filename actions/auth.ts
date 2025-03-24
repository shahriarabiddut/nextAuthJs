import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { User } from "@/model/user-model";
import bcrypt from "bcrypt";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials: z.infer<typeof LoginSchema>) {
        if (!credentials) {
          return null;
        }

        try {
          // Find user by email
          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );
          console.log(user);

          // If no user is found, return null
          if (!user) {
            console.log("User not found");
            return null;
          }
          // Ensure passwords exist
          if (!credentials.password || !user.password) {
            console.log("Password is missing");
            console.log("Password 1", credentials.password);
            console.log("Password 2", user.password); // Missing
            return null;
          }

          // Compare password hashes
          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          console.log(isMatch);

          // If password doesn't match, return null
          if (!isMatch) {
            console.log("Invalid password");
            return null;
          }

          // If everything is good, return the user
          return user;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});
