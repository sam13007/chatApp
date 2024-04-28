import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
    email: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
      unique: true,
    },
    password: { type: String, required: true, minLength: 3, maxLength: 100 },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
