import { User } from "@/model/User";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import * as z from "zod";
import { authConfig } from "@/actions/auth.config";
import { BlacklistedToken } from "@/model/Blacklisted";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
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
          if (
            !user ||
            !user.password ||
            !(await bcrypt.compare(password, user.password))
          ) {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Introduce delay
            throw new Error("Invalid credentials");
          }

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
    async jwt({ token, user, trigger }) {
      // The `user` object is returned after successful login - Testing Token
      // console.log("JWT Callback - User:", user);
      // console.log("JWT Callback - Token:", token);
      // Testing Purpose

      if (!token) return null;
      // Check if token is blacklisted
      const blacklisted = await BlacklistedToken.findOne({
        token: token.sessionToken,
      });

      if (blacklisted) {
        throw new Error("Session Expired. Please log in again.");
      }

      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role || "user",
          issuedAt: Date.now(),
        };
      }
      return token;
    },
    async session({ session, token }) {
      // This is where session data is passed to the client - Testing Token
      // console.log("Session Callback - Token:", token);
      // Testing Purpose
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.issuedAt = token.issuedAt;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error", // Custom error page
  },
  // Add these NEW security properties here:
  useSecureCookies: process.env.NODE_ENV === "production",
  csrf: {
    methods: ["POST", "PUT", "DELETE", "GET"], // Protects only GIVEN requests (login/submissions)
    cookie: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },

  // Cookie Settings - Not Necessary ! NextAuth Deals Deafult Way
  // cookies: {
  //   sessionToken: {
  //     name:
  //       process.env.NODE_ENV === "production"
  //         ? "__Secure-next-auth.session-token"
  //         : "next-auth.session-token",
  //     options: {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "lax",
  //       path: "/",
  //       domain:
  //         process.env.NODE_ENV === "production"
  //           ? process.env.AUTH_COOKIE_DOMAIN
  //           : undefined,
  //     },
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // Disable in production
});
