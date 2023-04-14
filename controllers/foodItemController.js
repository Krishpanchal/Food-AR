const FoodItem = require("../models/foodItemModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.addItem = catchAsync(async (req, res, next) => {
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

// getAll
exports.getAllItems = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(FoodItem.find(), req.query, req.body)
    .filter()
    .keyword()
    .sort()
    .limitFields()
    .paginate();

  const foodItems = await features.query.populate({ path: "category" });

  res.status(201).json({
    success: true,
    result: foodItems.length,
    data: foodItems,
  });
});

// getOne
exports.getFoodItem = catchAsync(async (req, res, next) => {
  const foodItems = await FoodItem.findById(req.params.id).populate({
    path: "category",
  });

  res.status(201).json({
    success: true,
    result: foodItems.length,
    data: foodItems,
  });
});

// Update View Time
exports.updateViewTIme = catchAsync(async (req, res, next) => {
  const givenViewSeconds = req.body.viewSeconds;

  const viewTime = {
    seconds: givenViewSeconds,
    viewDate: new Date(),
  };

  const foodItem = await FoodItem.findById(req.params.id);

  if (!foodItem) return;

  const totalViewTime = foodItem.totalViewTime + givenViewSeconds;

  const updateFoodItem = await FoodItem.findByIdAndUpdate(
    req.params.id,
    {
      totalViewTime: totalViewTime,
      $push: { viewTime: viewTime },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
  });
});

//update
// exports.updateFoodItem = catchAsync(async (req,res,next) => {

// })
// delete
