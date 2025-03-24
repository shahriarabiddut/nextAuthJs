import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const connection = await mongoose
      .connect(String(process.env.MONGO_DB_CONNECTION_STRING))
      .then(() => {
        console.log("Connected To DB");
      });
    return connection;
  } catch (e: any) {
    throw new Error(e);
  }
}
