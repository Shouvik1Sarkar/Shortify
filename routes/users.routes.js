import express from "express";
import {
  handleRegister,
  handleLogIn,
} from "../controllers/user.controllers.js";
const userRoutes = express.Router();

userRoutes.post("/register", handleRegister);
userRoutes.post("/logIn", handleLogIn);

export default userRoutes;
