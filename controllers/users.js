import userModel from "../model/user.js"
import bcrypt from "bcryptjs";





export const addUser = async(req, res) => {
 try{
  const {
  name, 
  email, 
  password, 
  isAdmin, 
  street,
  phone,
  apartment,
  city,
  zip,
  country,
 } = req.body;
 
 const passwordHash = await bcrypt.hash(password, 10)

 const newUser = await userModel.create({
  name,
  email,
  password: passwordHash,
  isAdmin,
  street,
  phone,
  apartment,
  city,
  zip, 
  country
 });

   if(!newUser) {
    res.status(404).json("User cannot be created")
   }
   res.status(201).json({
    msg: "User created successfully",
    newUser
   })
 }catch(error){
  res.status(500).json({
   msg: "Internal Server Error",
   err: error.message
  })
 }
}


export const getUsers = async(req, res) => {
 try {
  const users = await userModel.find().select("-password")
  if(!users || users.length === 0) {
   res.status(404).json({msg:"Users not Found", data: []})
  }
  res.status(200).json({
   msg: "user created successfully",
   data: users
  })
 }catch(error) {
  console.log(error)
  res.status(500).json({
   msg: "Internal Server Error",
   error: error.message
  })
 }
}

export const getUser = async(req, res) => {
  try{
    const user = await userModel.findById(req.params.userId).select("-password");
    if(!user || user.length === 0) {
      res.status(404).json({msg: "User not found"})
    }
    
    res.status(201).json({data: user})
  }catch(error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message
    })
  }
}

export const updateUser =  async(req, res) => {
 const {
  name, 
  email, 
  passwordHash, 
  isAdmin, 
  street, 
  phone, 
  apartment, 
  city, 
  zip, 
  country
 } = req.body;

 try {
  await userModel.findByIdAndUpdate(
   req.params.userId,
   {
    name,
    email,
    passwordHash,
    isAdmin,
    street,
    phone,
    apartment,
    city,
    zip,
    country
   },
   {
    new: true
   }
   );

   res.status(200).json("User has been updated successfully")
 }catch(error) {
  res.status(500).json({
   msg: "Internal Server Error",
   err: error.message
  })
 }
}

export const deleteUser = async(req, res) => {
 try {
   let user =  await userModel.findById(req.params.userId);

 (!user) ? res.status(404).json({msg: "User not Found"}) : 
 await user.remove();
 res.status(201).json("User has been deleted successfully");
 }catch(error) {
  res.status(500).json({
   success: false,
   msg: error.message
  })
 }

}