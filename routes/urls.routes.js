import express from "express";
import {
  handleHome,
  handleUrlShort,
  handleRedirect,
  handleDeleteAllHistory,
  handleLast24hUrls,
} from "../controllers/url.controllers.js";
import authLogIn from "../middlewares/authLogIn.middlewares.js";
const urlRoutes = express.Router();

urlRoutes.get("/", handleHome);
urlRoutes.get("/delete", authLogIn, handleDeleteAllHistory);
urlRoutes.route("/short").post(authLogIn, handleUrlShort);
urlRoutes.route("/dashBoard").get(authLogIn, handleLast24hUrls);
urlRoutes.route("/short/:unique_code").get(handleRedirect);

export default urlRoutes;
