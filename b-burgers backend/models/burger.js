const mongoose = require("mongoose");

const burgerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name field is required"],
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "price field is required"],
    },
    description: {
      type: String,
      required: [true, "description field is required"],
      minlength: 10,
      maxlength: 500,
    },
    image: {
      type: String,
      required: [true, "image field is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Burger", burgerSchema);
