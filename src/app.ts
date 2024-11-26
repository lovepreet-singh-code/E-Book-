/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import createHttpError from "http-errors";
import userRouter from "./user/userRouter";


const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {

  const error = createHttpError(400, "Something went wrong");
  next(error); 
});

app.get("/test", (req, res) => {
  res.send("Everything is fine!");
});

app.use("/api/users", userRouter);

app.use(globalErrorHandler);

export default app;
