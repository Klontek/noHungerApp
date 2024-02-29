import mongoose from "mongoose";

const shippingAddressSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required,
  },
  region: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});

shippingAddressSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

shippingAddressSchema.set("toJSON", {
  virtuals: true,
});

const shippingAddressModel =
  mongoose.model.shippingAddress ||
  mongoose.model("shippingAddress", shippingAddressSchema);

export default shippingAddressModel;
