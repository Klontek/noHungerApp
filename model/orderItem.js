import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  productData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productData",
  },
});

const orderItemModel = mongoose.model("orderItems", orderItemSchema);

export default orderItemModel;
