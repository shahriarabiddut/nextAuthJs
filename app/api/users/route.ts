import { NextResponse } from "next/server";
import { auth } from "@/actions/auth";
import { getUserByEmail } from "@/queries/users";
import { dbConnect } from "@/lib/mongo";

export const GET = async (request) => {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse(`You are not Authenticated!`, {
      status: 500,
    });
  }
  await dbConnect();
  try {
    const user = await getUserByEmail(session?.user?.email);
    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
