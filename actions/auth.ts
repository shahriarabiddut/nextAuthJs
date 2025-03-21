import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/app/data/users";
import { LoginSchema } from "@/schemas";
import * as z from "zod";

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
        if (credentials === null) return null;
        try {
          const user = getUserByEmail(credentials?.email);
          if (!user) return null;
          const isMatch = user?.password === credentials?.password;
          if (!isMatch) return null;
          return user;
        } catch (error) {
          // console.error(error);
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
