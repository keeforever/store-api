// express set up
const express = require("express");
const app = express();

//handle async errors
require('express-async-errors')

// dotenv setup
require("dotenv").config();

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db setup
const connectDB = require("./db/connect");

// routes setup
const productsRouter = require("./routes/products");
app.use("/api/v1/products", productsRouter);

// error handling setup
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleWare = require("./middleware/error-handler");
app.use(notFoundMiddleware);
app.use(errorMiddleWare);

// port set up
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Mongo DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Port ${PORT} connected successfully.`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
