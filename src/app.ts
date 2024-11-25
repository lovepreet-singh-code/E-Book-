/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";


const app = express();


// Routes
app.get("/", (req, res, next) => {
    res.json({ message: "Welcome to Book api" });
});


export default app;
