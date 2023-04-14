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
    viewTime: [
      {
        seconds: {
          type: Number,
          default: 0,
        },
        viewDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalViewTime: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const FoodItem = mongoose.model("FoodItem", foodItemSchema);
module.exports = FoodItem;
