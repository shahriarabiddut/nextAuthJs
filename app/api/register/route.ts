import { registerUser } from "@/controllers/user.controller";

export async function POST(request: Request) {
  return registerUser(request);
}
