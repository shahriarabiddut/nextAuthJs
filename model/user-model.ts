import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: [6, `Email must be at least 6 characters!`],
    match: [/\S+@\S+\.\S+/, `Please enter a valid email`],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
