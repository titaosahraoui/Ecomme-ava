const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
    MaxLength: [100, "please you cannot exed 100 char"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    MaxLength: [5, "please you cannot exed 100 char"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "please enter the right category for the product"],
    enum: {
      values: [
        "Womens",
        "Men",
        "Handbags",
        "Sneakers",
        "jewlery",
        "Watchs",
        "belts",
      ],
      message: "please select correct category of the product",
    },
  },
  seller: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: [true, "please enter stock of the product"],
    MaxLength: [5, "products can not exid 5 charachteres"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);
