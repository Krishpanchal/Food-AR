const FoodItem = require("../models/foodItemModel");
const Category = require("../models/categoryModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

exports.addItem = catchAsync(async (req, res, next) => {
  const file = req.files?.photo;
  const item = req.body;

  console.log();

  console.log(req.body);
  console.log(req.files);

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

exports.getTotalViewTime = catchAsync(async (req, res, next) => {
  const foodItems = await FoodItem.find({});
  let totalViewTime = 0;

  for (let i = 0; i < foodItems.length; i++) {
    if (foodItems[i]?.totalViewTime)
      totalViewTime += foodItems[i]?.totalViewTime;
  }

  res.status(200).json({
    success: true,
    totalViewTime: totalViewTime,
  });
});

exports.getTotalViewTimeForToday = catchAsync(async (req, res, next) => {
  const foodItems = await FoodItem.find({});
  let todayTotalViewTime = 0;

  for (let i = 0; i < foodItems.length; i++) {
    if (foodItems[i]?.viewTime) {
      const views = foodItems[i].viewTime;

      for (let j = 0; j < views.length; j++) {
        if (
          new Date(views[j].viewDate).toDateString() ==
          new Date().toDateString()
        ) {
          console.log(new Date(views[j].viewDate).toDateString());
          todayTotalViewTime += views[j].seconds;
        }
      }
    }
  }

  res.status(200).json({
    success: true,
    totalViewTime: todayTotalViewTime,
  });
});

exports.getFoodItemsLength = catchAsync(async (req, res, next) => {
  const foodItems = await FoodItem.countDocuments();
  const categories = await Category.countDocuments();
  res.status(200).json({
    success: true,
    foodItems,
    categories,
  });
});

exports.getViewTimeByDate = catchAsync(async (req, res, next) => {
  const foodItems = await FoodItem.find({});

  let data = [];

  for (let i = 0; i < foodItems.length; i++) {
    if (foodItems[i]?.viewTime) {
      const views = foodItems[i].viewTime;

      for (let j = 0; j < views.length; j++) {
        let index = data.findIndex((obj) => {
          return obj.name === new Date(views[j].viewDate).toLocaleDateString();
        });

        if (index != -1) {
          data[index] = {
            ...data[index],
            Total: data[index].Total + views[j].seconds,
          };
        } else {
          data.push({
            name: new Date(views[j].viewDate).toLocaleDateString(),
            Total: views[j].seconds,
          });
        }
      }
    }
  }

  return res.status(200).json({
    success: true,
    data,
  });
});

exports.getViewsByFoodItem = catchAsync(async (req, res, next) => {
  const foodItems = await FoodItem.find({});

  let data = [];
  data.push(["Food Item", "View Seconds"]);

  for (let i = 0; i < foodItems.length; i++) {
    if (foodItems[i]?.viewTime) {
      const views = foodItems[i].viewTime;
      let totalViews = 0;

      for (let j = 0; j < views.length; j++) {
        totalViews += views[j].seconds;
      }

      data.push([foodItems[i].name, totalViews]);
    }
  }

  return res.status(200).json({
    success: true,
    data,
  });
});

//update
// exports.updateFoodItem = catchAsync(async (req,res,next) => {

// })
// delete
