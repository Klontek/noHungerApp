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

categorySchema.virtual('id').get(function(){
 return this._id.toHexString()
})

categorySchema.set('toJSON', {
 virtuals: true,
})

const categoryModel = mongoose.models.category || mongoose.model("categories", categorySchema);
export default categoryModel;