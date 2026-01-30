import Url from "../models/url.models.js";
import ApiError from "../utils/ApiError.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import asyncHandler from "../utils/AsyncHandler.utils.js";

import crypto from "crypto";

const handleHome = asyncHandler(async (req, res) => {
  return res.send("Hello");
});
const handleUrlShort = asyncHandler(async (req, res) => {
  const { original_url } = req.body;

  if (!original_url) {
    throw new ApiError(400, "Please enter url");
  }

  console.log(original_url);

  const unique_code = crypto.randomBytes(8).toString("base64url");

  // const url

  const url = await Url.create({
    randomCode: unique_code,
    originalUrl: original_url,
    createdBy: req.user._id,
  });

  if (!url) {
    throw new ApiError(500, "URL NOT CREATED");
  }
  return res.render("result", {
    user: req.user1,
    url: url,
  });

  // return res.status(200).json(new ApiResponse(200, url, "url done"));
});

const handleRedirect = asyncHandler(async (req, res) => {
  const { unique_code } = req.params;
  console.log("---", unique_code);
  console.log("---", req.params);

  if (!unique_code) {
    return res.status(500).json(new ApiError(400, "Punique_code not found"));
  }

  const find_original = await Url.findOne({ randomCode: unique_code });

  if (!find_original) {
    return res.status(500).json(new ApiError(400, "url not found"));
  }
  console.log("url: ", find_original);
  const original_url = find_original.originalUrl;

  console.log(original_url);
  return res.redirect(original_url);
  // return res.send("This is it");
});

const handleDeleteAllHistory = asyncHandler(async (req, res) => {
  await Url.deleteMany({ createdBy: req.user._id });
  return res.redirect("/");
});
export { handleHome, handleUrlShort, handleRedirect, handleDeleteAllHistory };
