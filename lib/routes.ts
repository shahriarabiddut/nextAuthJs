export const LOGIN = "/auth/login";
export const ROOT = "/";
export const APIGOOGLE = "/api/auth/callback/google";
export const APIGITHUB = "/api/auth/callback/github";

export const PUBLIC_ROUTES = [
  "/auth/login",
  "/register",
  "/products",
  APIGOOGLE,
  APIGITHUB,
];
// Is it Necessary ? No! Sometimes Some Public Route we want to be protected then we can use! And Some Ghosting Situations (It should be protected but not working! then should be used to work forcefully!)!

export const PROTECTED_SUB_ROUTES = ["/home", "/products/1"];
