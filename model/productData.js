import mongoose from "mongoose";

const productDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    richDescription: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
    },
    image: {
      type: String, // Assuming images are stored as file paths or URLs
      required: false,
      default: "",
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    comments: {
      type: String,
      default: "",
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

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
