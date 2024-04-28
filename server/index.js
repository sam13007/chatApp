import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "../server/routes/userRoutes.js";

const app = express();

// app.use is for middleware

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to chat app");
});
const mongoose_uri = process.env.ATLAS_URI;

const port = process.env.PORT || 8000;

app.listen(port, (req, res) => {
  console.log(`server listening to port ${port}`);
});

mongoose
  .connect(mongoose_uri)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("error connecting to mongoDB", err);
  });
