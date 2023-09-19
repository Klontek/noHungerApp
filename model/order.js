import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
 orderItems: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'orderItems',
  required: true
 }],
 shippingAddress1: [{
  type: String,
  required: true
 }],
 shippingAddress2: [{
  type: String
 }],
 city: {
  type: String,
  required: true
 },
 zip: {
  type: String,
  required: true
 },
 country: {
  type: String,
  required: true
 },
 phone: {
  type: String,
  required: true
 },
 status: {
  type: String,
  required: true,
  default: 'Pending'
 },
 totalPrice: {
  type: Number
 },
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user',
  required: true
 },
 dateOrdered: {
  type: Date,
  default: Date.now()
 }
},
{
 timestamps: true
}
)

orderSchema.virtual('id').get(function (){
 return this._id.toHexString()
});

orderSchema.set('toJSON', {
 virtuals: true
})

const orderModel = mongoose.model.order ||mongoose.model("order", orderSchema);

export default orderModel;