import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
  quantity: {
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
