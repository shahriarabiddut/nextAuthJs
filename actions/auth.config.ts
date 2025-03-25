export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 Hour
    updateAge: 5 * 60, // Refresh token every 5 minutes
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [],
};
