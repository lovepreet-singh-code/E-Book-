/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import { config } from "./config/config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import createHttpError from "http-errors";
const app = express();


app.get("/", (req, res, next) => {

  const error = createHttpError(400, "Something went wrong");
  next(error); 
});

app.get("/test", (req, res) => {
  res.send("Everything is fine!");
});


app.use(globalErrorHandler);

export default app;
