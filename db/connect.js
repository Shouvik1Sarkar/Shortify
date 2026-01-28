import mongoose from "mongoose";

async function connectDB(url) {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("DATABASE CONNECTED PROPERLY");
    })
    .catch((err) => {
      console.log("ERROR CONNECTING DATABASE", err);
    });
}

export default connectDB;
