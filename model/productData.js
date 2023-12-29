import mongoose from "mongoose";

const productDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "please provide your name"],
    },
    price: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
    },
    brand: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    countInStock: {
      type: Number,
      min: 0,
      max: 255,
    },
    image: {
      type: String,
      default: "",
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
