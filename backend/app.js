const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");

const AppError = require("./utils/appError");

//Routes
const foodItemRoutes = require("./routes/foodItemRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

//Controllers
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// All routes
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/foodItems", foodItemRoutes);

//Handling undefined routes
app.all("*", (req, res, next) => {
  //next is used in a special way
  //If the next () recieves an argument, then express gets to know that there is an error
  //Here if argument given in next(), it will skip all the middlwares in the stack and will directly go to global error handling middleware
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
