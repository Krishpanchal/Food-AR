const mongoose = require("mongoose");

const foodItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Food Item must have a name"],
    },
    description: {
      type: String,
      required: [true, "A Food Item must have a description"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "A Food Item must have a category"],
    },
    ar_model: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    // views: [
    //   {
    //     type: Date,
    //     default: Date.now,
    //   },
    // ],
    // viewTime: [
    //   {
    //     seconds: {
    //       type: Number,
    //     },
    //     viewDate: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const FoodItem = mongoose.model("FoodItem", foodItemSchema);
module.exports = FoodItem;
