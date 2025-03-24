import { NextResponse } from "next/server";
import { RegisterSchema } from "@/schemas/index";
import { dbConnect } from "@/lib/mongo";
import bcrypt from "bcrypt";
import { createUser } from "@/queries/users";
import { User } from "@/model/user-model";

export const registerUser = async (request: Request): Promise<NextResponse> => {
  try {
    // Get Data
    const values = await request.json();
    // Validate Data
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: "Invalida Data Inserted!!",
          details: validatedFields.error.format(),
        },
        { status: 400 }
      );
    }
    // Destructure Data
    const { name, email, password } = validatedFields.data;
    // Find Duplicate
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { error: `User Already Exists!` },
        { status: 500 }
      );
    }
    // Create a DB Connection
    await dbConnect();
    // Encrypt the Password
    const hashedPassword = await bcrypt.hash(password, 12);
    // Form a DB payload
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    // Update in the DB
    try {
      await createUser(newUser);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Send Success Response
    return NextResponse.json(
      { success: "Successfully Registered!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
};
