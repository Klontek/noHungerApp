import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
 quantity: {
  type: Number,
  required: true
 },
 product: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'products',
 }
})

const orderItemModel = mongoose.model('orderItems', orderItemSchema);

export default orderItemModel