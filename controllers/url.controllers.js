import mongoose from "mongoose";
import Url from "../models/url.models.js";
import ApiError from "../utils/ApiError.utils.js";
import ApiResponse from "../utils/ApiResponse.utils.js";
import asyncHandler from "../utils/AsyncHandler.utils.js";

import crypto from "crypto";
import create_unique_hash from "../utils/unique_code.utils.js";

const handleHome = asyncHandler(async (req, res) => {
  return res.send("Hello");
});
const handleUrlShort = asyncHandler(async (req, res) => {
  const { original_url } = req.body;

  if (!original_url) {
    return res.redirect("/");
    // return res.render("home", {
    //   errorMessage: "please enter url",
    // });
    // throw new ApiError(400, "Please enter url");
  }

  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hrs

  console.log(original_url);

  const unique_code = crypto.randomBytes(8).toString("base64url");

  // const url

  const url = await Url.create({
    randomCode: unique_code,
    originalUrl: original_url,
    createdBy: req.user?._id || undefined,
    expiresAt,
  });

  if (!url) {
    // return res.redirect("/")
    throw new ApiError(500, "URL NOT CREATED");
  }
  return res.render("result", {
    user: req.user1,
    url: url,
  });

  // return res.status(200).json(new ApiResponse(200, url, "url done"));
});

const handleRedirect = async (req, res) => {
  const { code } = req.params;

  const ip = req.ip;

  const user_ip = create_unique_hash(ip);

  const url = await Url.findOne({ randomCode: code });
  console.log("url:", url);

  if (!url) {
    return res.status(404).send("URL not found");
  }

  //   EXPIRY CHECK
  if (url.expiresAt && url.expiresAt < new Date()) {
    return res.render("expired", {
      message: "404 Not found",
    });
    // return res.status(410).send("This link has expired");
  }

  const uniqueClicks = url.uniqueClicks.includes(user_ip);

  if (!uniqueClicks) {
    await Url.updateOne(
      { _id: url._id },
      {
        $inc: { noOfClicks: 1, unique_count: 1 },
        $addToSet: { uniqueClicks: user_ip },
      },
    );
  } else {
    await Url.updateOne({ _id: url._id }, { $inc: { noOfClicks: 1 } });
  }

  return res.redirect(url.originalUrl);
};

const handleDeleteAllHistory = asyncHandler(async (req, res) => {
  await Url.deleteMany({ createdBy: req.user._id });
  return res.redirect("/");
});

const handleLast24hUrls = asyncHandler(async (req, res) => {
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const latestUrls = await Url.find({
    createdBy: req.user._id,
    createdAt: {
      $gte: last24Hours,
    },
  });

  const topUrls = await Url.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $sort: { noOfClicks: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  console.log("top urls: ", topUrls);

  return res.render("dashBoard", {
    latestUrls: latestUrls,
    topUrls: topUrls,
    user: req.user1,
  });
});
export {
  handleHome,
  handleUrlShort,
  handleRedirect,
  handleDeleteAllHistory,
  handleLast24hUrls,
};
