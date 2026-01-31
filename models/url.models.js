import mongoose from "mongoose";
import { type } from "os";

const urlSchema = new mongoose.Schema(
  {
    randomCode: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    noOfClicks: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    uniqueClicks: {
      type: [String],
      default: [],
    },
    unique_count: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
