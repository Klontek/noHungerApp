import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
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
      type: String,
      required: false,
      default: "",
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    brand: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    countInStock: {
      type: Number,
      min: 0,
      max: 255,
    },
    rating: {
      type: Number,
      default: 0,
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

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.set("toJSON", {
  virtuals: true,
});

const productModel =
  mongoose.models.products || mongoose.model("products", productSchema);

export default productModel;
