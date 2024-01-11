import mongoose from "mongoose";

const productDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  publicId: {
    type: String,
  },
  image: {
    type: String, // Assuming images are stored as file paths or URLs
    required: false,
  },
  brand: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
  },
  countInStock: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

productDataSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productDataSchema.set("toJSON", {
  virtuals: true,
});

const productDataModel =
  mongoose.models.productData ||
  mongoose.model("productData", productDataSchema);
export default productDataModel;
