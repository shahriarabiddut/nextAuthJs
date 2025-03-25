export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 Hour
  },
  providers: [],
};
