import { User } from "@/model/user-model";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import * as z from "zod";
import { authConfig } from "@/actions/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: z.infer<typeof LoginSchema>) {
        if (!credentials) throw new Error("Invalid credentials");

        try {
          // Validate user input with Zod
          const parsed = LoginSchema.safeParse(credentials);
          if (!parsed.success) throw new Error("Invalid input format");

          const { email, password } = parsed.data;

          // Find user by email (ensure password is selected)
          const user = await User.findOne({ email })
            .select("+password")
            .select("+name");
          if (!user || !user.password) throw new Error("Invalid credentials");

          // Compare provided password with hashed password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) throw new Error("Invalid credentials");

          // Return user details without password
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || "user", // Default role
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Invalid credentials"); // Generic error message
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile", // Minimal required scopes
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email", // Minimal required scopes
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Custom error page
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // Disable in production
});
