import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

function authLogIn(req, res, next) {
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
  req.user = user;

  return next();
}

export default authLogIn;
