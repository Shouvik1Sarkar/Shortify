import express from "express";
import {
  handleRegister,
  handleLogIn,
  getUser,
  logOutUser,
  hadnleDisplayRegister,
  hadnleDisplayLogIn,
} from "../controllers/user.controllers.js";
import authLogIn from "../middlewares/authLogIn.middlewares.js";
import urlRoutes from "./urls.routes.js";
const userRoutes = express.Router();

// display routes
userRoutes.route("/register").get(hadnleDisplayRegister).post(handleRegister);

userRoutes.route("/logIn").get(hadnleDisplayLogIn).post(handleLogIn);
// userRoutes.route("/logIn", handleLogIn);
userRoutes.get("/get", authLogIn, getUser);
userRoutes.get("/logOut", authLogIn, logOutUser);

export default userRoutes;
