import userModel from "../model/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"




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

   if(!newUser ) {
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


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Use the correct field name from the model, which is 'passwordHash'
    const checkPassword = bcrypt.compareSync(password, user.password);
    const secret = process.env.SECRET;
    
    if (checkPassword) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin
        },
        secret,
        {
          expiresIn: '1d'
        }
      );

      return res.status(200).json({
        email: user.email,
        token: token
        });
    } else {
      return res.status(404).json({ msg: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error", error)
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};


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


export const getUserCount = async (req, res) => {
  const countUser = await userModel.countDocuments();

  try {
    if(!countUser || countUser.length === 0) {
      return res.status(404).json({msg: "No user Available"});
    }

    return res.status(201).json({count: countUser})
  }catch(error) {
    console.error(error)
    return res.status(500).json({
      msg: "Internal Server Error",
      err: error.message
    })
  }
} 