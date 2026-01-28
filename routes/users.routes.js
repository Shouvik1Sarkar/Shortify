import express from "express";
import {
  handleRegister,
  handleLogIn,
  getUser,
} from "../controllers/user.controllers.js";
import authLogIn from "../middlewares/authLogIn.middlewares.js";
const userRoutes = express.Router();

userRoutes.post("/register", handleRegister);
userRoutes.post("/logIn", handleLogIn);
userRoutes.get("/get", authLogIn, getUser);

export default userRoutes;
