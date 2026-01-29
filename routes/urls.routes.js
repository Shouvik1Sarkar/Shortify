import express from "express";
import {
  handleHome,
  handleUrlShort,
  handleRedirect,
} from "../controllers/url.controllers.js";
import authLogIn from "../middlewares/authLogIn.middlewares.js";
const urlRoutes = express.Router();

urlRoutes.get("/", handleHome);
urlRoutes.route("/short").post(authLogIn, handleUrlShort);
urlRoutes.route("/short/:unique_code").get(handleRedirect);

export default urlRoutes;
