const FoodItem = require("../models/foodItemModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const cloudinary = require("cloudinary");

exports.addProduct = catchAsync(async (req, res, next) => {
  const file = req.files?.photo;
  const item = req.body;

  if (file) {
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: process.env.CLOUDINARY_FOOD_AR,
    });
    console.log(result);

    item.ar_model = {
      public_id: result.public_id,
      url: result.url,
    };
  }

  const doc = await FoodItem.create(item);

  res.status(201).json({
    success: true,
    data: doc,
  });
});
