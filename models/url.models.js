import mongoose from "mongoose";

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
    },
  },
  { timestamps: true },
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
