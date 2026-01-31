import express from "express";
import {
  handleHome,
  handleUrlShort,
  handleRedirect,
  handleDeleteAllHistory,
  handleLast24hUrls,
} from "../controllers/url.controllers.js";

import {
  shortenLimiter,
  redirectLimiter,
} from "../middlewares/rateLimit.middlewares.js";

import authLogIn from "../middlewares/authLogIn.middlewares.js";
const urlRoutes = express.Router();

urlRoutes.get("/", handleHome);
urlRoutes.get("/delete", authLogIn, handleDeleteAllHistory);
urlRoutes.route("/short").post(authLogIn, shortenLimiter, handleUrlShort);
urlRoutes.route("/dashBoard").get(authLogIn, handleLast24hUrls);
urlRoutes.route("/short/:unique_code").get(redirectLimiter, handleRedirect);

export default urlRoutes;
