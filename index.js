import express, { urlencoded } from "express";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/connect.js";

import cookieParser from "cookie-parser";

import path from "path";
import authLogIn from "./middlewares/authLogIn.middlewares.js";
// import ejs from "ejs";

// import

import urlRoutes from "./routes/urls.routes.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

const PORT = process.env.PORT || 8000;
// set

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// inbuilt

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// connect Data Base

connectDB(process.env.MONGODB_URI);

app.get("/", authLogIn, (req, res) => {
  res.render("home", { user: req.user1 });
});

app.use("/api/v1/urls/", urlRoutes);
app.use("/api/v1/users/", userRoutes);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
