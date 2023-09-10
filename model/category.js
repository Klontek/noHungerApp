import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
 name: {
  type: String,
  required: [true, "please provide your name"]
 },
 icon: {
  type: String,
  default: ''
 },
 color: {
  type: String,
 },
 image: {
  type: String,
  default: ''
 },
},
{
 timestamps: true
}
)

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);
export default categoryModel;