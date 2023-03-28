const Category = require("../models/categoryModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addCategory = catchAsync(async (req, res, next) => {
  if (req.body?.name) {
    const doc = await Category.find({
      name: {
        $regex: req.body.name,
        $options: "i",
      },
    });

    if (doc.length > 0)
      return next(
        new AppError(`The category with name ${req.body.name} already exists`)
      );
  }
  const doc = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: doc,
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    result: categories.length,
    data: categories,
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return next(new AppError("No document found with that ID", 404));

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  if (req.body?.name) {
    const doc = await Category.find({
      name: {
        $regex: req.body.name,
        $options: "i",
      },
    });

    if (doc.length > 0)
      return next(
        new AppError(`The category with name ${req.body.name} already exists`)
      );
  }

  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  const doc = await Category.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  // TODO: also delete products once category is deleted

  res.status(204).json({
    success: true,
    data: null,
  });
});
