import mongoose from "mongoose";

const shopDataSchema = new mongoose.Schema({
  ShopName: {
    type: String,
    required: [true, "Please provide your shop name"],
  },
  farAway: {
    type: String,
  },
  businessAddress: {
    type: String,
  },
  publicId: {
    type: String,
  },
  image: {
    type: String, // Assuming images are stored as file paths or URLs
    required: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  coordinates: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  discount: {
    type: Number,
  },
  deliveryTimes: {
    type: Number,
  },
  collectTimes: {
    type: Number,
  },
  foodType: {
    type: String,
  },
  productData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productData",
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

shopDataSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

shopDataSchema.set("toJSON", {
  virtuals: true,
});

const shopDataModel =
  mongoose.models.shopData || mongoose.model("shopData", shopDataSchema);
export default shopDataModel;

// const mongoose = require("mongoose");

// // // Define the Shop schema
// // const shopSchema = new mongoose.Schema({
// //   ShopName: {
// //     type: String,
// //     required: true,
// //   },
// //   farAway: {
// //     type: String,
// //   },
// //   businessAddress: {
// //     type: String,
// //     required: true,
// //   },
// //   images: {
// //     type: String, // Assuming images are stored as file paths or URLs
// //     required: true,
// //   },
// //   rating: {
// //     type: Number,
// //     default: 0,
// //   },
// //   numReviews: {
// //     type: Number,
// //     default: 0,
// //   },
// //   coordinates: {
// //     lat: {
// //       type: Number,
// //     },
// //     lng: {
// //       type: Number,
// //     },
// //   },
// //   discount: {
// //     type: Number,
// //   },
// //   deliveryTimes: {
// //     type: Number,
// //   },
// //   collectTimes: {
// //     type: Number,
// //   },
// //   foodType: {
// //     type: String,
// //   },
// //   productData: [
// //     {
// //       name: {
// //         type: String,
// //         required: true,
// //       },
// //       price: {
// //         type: Number,
// //         required: true,
// //       },
// //       image: {
// //         type: String, // Assuming images are stored as file paths or URLs
// //         required: true,
// //       },
// //       brand: {
// //         type: String,
// //       },
// //       isFeatured: {
// //         type: Boolean,
// //         default: false,
// //       },
// //       description: {
// //         type: String,
// //       },
// //       countInStock: {
// //         type: Number,
// //         default: 0,
// //       },
// //       category: {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "Category", // Assuming you have a Category model
// //       },
// //     },
// //   ],
// // });

// // Create the Shop model
// const Shop = mongoose.model("Shop", shopSchema);

// module.exports = Shop;
