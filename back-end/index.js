import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import router from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/canifa")
  .then(() => {
    console.log("Connected db successfull");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api", router);

const errorNotFound = (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
};

const errorCommon = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: err.message || "Lỗi server",
  });
};
app.use(errorNotFound, errorCommon);
app.listen(8000, () => {
  console.log(`Server is running on port 8000 `);
});
