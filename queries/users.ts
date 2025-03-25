import { User } from "@/model/user-model";

export async function createUser(newuser: any) {
  try {
    const user = await User.create(newuser);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserByEmail(email: string) {
  const user = await User.findOne({ email }).select("-updatedAt").lean();
  return user;
}
