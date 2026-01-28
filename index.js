import express, { urlencoded } from "express";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/connect.js";

import cookieParser from "cookie-parser";

// import

import urlRoutes from "./routes/urls.routes.js";

const app = express();

const PORT = process.env.PORT || 8000;

// inbuilt

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// connect Data Base

connectDB(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  // res.redirect()
  return res.send("HOME ROUTE");
});

app.use("/api/v1/urls/", urlRoutes);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
