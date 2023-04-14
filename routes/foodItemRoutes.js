const express = require("express");
const foodItemController = require("../controllers/foodItemController");

const router = express.Router();

router
  .route("/")
  .get(foodItemController.getAllItems)
  .post(foodItemController.addItem);

router.route("/:id").get(foodItemController.getFoodItem);
//   .patch(categoryController.updateCategory)
//   .delete(categoryController.deleteOne);

router.route("/viewTime/:id").patch(foodItemController.updateViewTIme);

module.exports = router;
