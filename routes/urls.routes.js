import express from "express";
import {
  handleHome,
  handleUrlShort,
  handleRedirect,
} from "../controllers/url.controllers.js";
const urlRoutes = express.Router();

urlRoutes.get("/", handleHome);
urlRoutes.route("/short").post(handleUrlShort);
urlRoutes.route("/short/:unique_code").get(handleRedirect);

export default urlRoutes;
