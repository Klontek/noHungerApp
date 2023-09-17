import mongoose from "mongoose";

const userSchema = mongoose.Schema({
 name: {
  type: String,
  required: true
 },
 email: {
  type: String,
  required: true
 },
 password: {
  type: String,
  required: true,
 },
 isAdmin: {
  type: Boolean,
  default: false
 },
 street: {
  type: String,
  default: ''
 },
 phone: {
  type: String,
  required: true
 },
 apartment: {
  type: String,
  default: ''
 },
 city: {
  type: String,
 },
 zip: {
  type: String,
  default: ''
 },
 country: {
  type: String,
  default: ''
 }
});

userSchema.virtual('id').get(function (){
 return  this._id.toHexString()
})

userSchema.set('toJSON', {
 virtuals: true
})

const userModel = mongoose.models.users || mongoose.model('user', userSchema);

export default userModel;