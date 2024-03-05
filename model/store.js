import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const storeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  storeName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }],
  menuItems: [menuItemSchema],
  publicId: {
    type: String,
  },
  imageUrl: { type: String, required: false },
  lastUpdated: { type: Date, required: true },
});

storeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

storeSchema.set("toJSON", {
  virtuals: true,
});

const storeModel =
  mongoose.models.store || mongoose.model("store", storeSchema);

export default storeModel;

// const storeModel = mongoose.model("store", storeSchema);
// module.exports = storeModel;
