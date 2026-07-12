const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isReadyToEat: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["citrus", "berry", "tropical", "stone-fruit", "melon", "other"],
  },
});

const Fruit = mongoose.model("Fruit", fruitSchema);

module.exports = Fruit;
