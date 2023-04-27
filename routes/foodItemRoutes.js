const express = require("express");
const foodItemController = require("../controllers/foodItemController");

const router = express.Router();

router
  .route("/")
  .get(foodItemController.getAllItems)
  .post(foodItemController.addItem);

router.get("/totalViewTime", foodItemController.getTotalViewTime);
router.get("/todayTotalViewTime", foodItemController.getTotalViewTimeForToday);
router.get("/totalLength", foodItemController.getFoodItemsLength);
router.get("/viewTimeByDate", foodItemController.getViewTimeByDate);
router.get("/viewByFoodItem", foodItemController.getViewsByFoodItem);

router.route("/:id").get(foodItemController.getFoodItem);
//   .patch(categoryController.updateCategory)
//   .delete(categoryController.deleteOne);

router.route("/viewTime/:id").patch(foodItemController.updateViewTIme);

module.exports = router;
