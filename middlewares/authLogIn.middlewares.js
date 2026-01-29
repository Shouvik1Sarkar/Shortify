import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import User from "../models/user.models.js";
dotenv.config({ path: "./.env" });

async function authLogIn(req, res, next) {
  const secretSalt = req.cookies?.secretSalt;
  if (!secretSalt) {
    console.log("NOT LOGGED IN");
    return next();
  }
  console.log("SECRET SALTXXXXXXXXXX: ", secretSalt);
  const user = jwt.verify(secretSalt, process.env.secret);

  if (!user) {
    console.error("User not here");
  }
  const user1 = await User.findById(user._id);
  if (!user1) {
    console.error("User not here");
  }
  req.user = user;
  req.user1 = user1;

  return next();
}

export default authLogIn;
