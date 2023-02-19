const express = require("express");
const foodItemController = require("../controllers/foodItemController");

const router = express.Router();

router
  .route("/")
  // .get(categoryController.getAll)
  .post(foodItemController.addProduct);

// router
//   .route("/:id")
//   .get(categoryController.getOne)
//   .patch(categoryController.updateCategory)
//   .delete(categoryController.deleteOne);

module.exports = router;
