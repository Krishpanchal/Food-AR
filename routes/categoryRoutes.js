const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getAll)
  .post(categoryController.addCategory);

router
  .route("/:id")
  .get(categoryController.getOne)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteOne);

module.exports = router;
