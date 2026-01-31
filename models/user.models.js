import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    salt: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.checkPass = async function (userPassword) {
  const result = await bcrypt.compare(userPassword, this.password);

  console.log("match pass: ", result);

  return result;
};

userSchema.methods.createSalt = async function (userId) {
  // access token
  return jwt.sign(
    {
      _id: userId,
    },
    process.env.secret,
    {
      expiresIn: "90d",
    },
  );
};

const User = mongoose.model("User", userSchema);

export default User;
