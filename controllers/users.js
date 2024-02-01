import userModel from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Define Multer storage
const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cd("invalid image file", false);
  }
};

//set up multer options
const uploadOptions = multer({
  storage,
  fileFilter,
});

export const uploadProfile = async (req, res) => {
  uploadOptions.single("profile")(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).json({
        success: false,
        message: "Error uploading profile pic",
        error: uploadError.message,
      });
    }

    try {
      const { user } = req;
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "unauthorized access!" });

      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${user._id}_profile`,
        width: 500,
        height: 500,
        crop: "fill",
      });
      // console.log(result);

      await userModel.findByIdAndUpdate(
        user._id,
        { avatar: result.secure_url }, // Use result.secure_url from Cloudinary
        { new: true }
      );
      res
        .status(201)
        .json({ success: true, message: "Your profile pic is updated" });
    } catch (error) {
      console.log("Error while uploading profile image", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal serer error!" });
    }
  });
};

export const getProfile = (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access" });

  res.status(201).json({
    success: true,
    profile: {
      name: req.user.name,
      email: res.user.email,
      avatar: req.user.avatar ? req.user.avatar : "",
    },
  });
};

export const addUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      isAdmin,
      street,
      phone,
      apartment,
      city,
      zip,
      country,
    } = req.body;

    const isNewUser = await userModel.isThisEmailInUse(email);
    if (!isNewUser)
      return res.json({
        success: false,
        message: "This email is already in use, try another one!",
      });

    const newUser = await userModel.create({
      name,
      email,
      password,
      confirmPassword,
      isAdmin,
      street,
      phone,
      apartment,
      city,
      zip,
      country,
    });

    if (!newUser) {
      res.status(404).json("User cannot be created");
    }

    res.status(201).json({
      success: true,
      msg: "User created successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      err: error.message,
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    if (!users || users.length === 0) {
      res.status(404).json({ msg: "Users not Found", data: [] });
    }
    res.status(200).json({
      msg: "user created successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.userId)
      .select("-password");
    if (!user || user.length === 0) {
      res.status(404).json({ msg: "User not found" });
    }

    res.status(201).json({ data: user });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "User not found with the given email!" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(404)
        .json({ success: false, message: "email / password does not match!" });

    const secret = process.env.SECRET;

    if (isMatch) {
      const token = jwt.sign(
        {
          userId: user._id,
          isAdmin: user.isAdmin,
        },
        secret,
        {
          expiresIn: "1d",
        }
      );

      // // to remove old tokens from the database
      // let oldTokens = user.token || [];

      // if (oldTokens.length) {
      //   oldTokens = oldTokens.filter((t) => {
      //     const timeDifference = (Date.now() - parseInt(t.signedAt)) / 1000;
      //     if (timeDifference < 86400) {
      //       return;
      //     }
      //   });
      // }

      // await userModel.findByIdAndUpdate(user._id, {
      //   token: [...oldTokens, { token, signedAt: Date.now().toString() }],
      // }); // whenever user is signed in add the tokens and time to the database

      const userInfo = {
        name: user.name,
        email: user.email,
        avatar: user.avatar ? user.avatar : "",
      };

      return res.status(200).json({
        success: true,
        user: userInfo,
        // token,
      });
    } else {
      return res.status(404).json({ msg: "Authentication failed" });
    }
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: true, message: "Authorization failed!" });
    }

    const tokens = req.user.tokens;

    const newToken = tokens.filter((t) => t.token !== token);

    await userModel.findByIdAndUpdate(req.user._id, { tokens: newToken });
    res.status(201).json({ success: true, message: "Sign out succesfully" });
  }
};

export const updateUser = async (req, res) => {
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
    country,
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
        country,
      },
      {
        new: true,
      }
    );

    res.status(200).json("User has been updated successfully");
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      err: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let user = await userModel.findById(req.params.userId);

    !user
      ? res.status(404).json({ msg: "User not Found" })
      : await user.remove();
    res.status(201).json("User has been deleted successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const getUserCount = async (req, res) => {
  const countUser = await userModel.countDocuments();

  try {
    if (!countUser || countUser.length === 0) {
      return res.status(404).json({ msg: "No user Available" });
    }

    return res.status(201).json({ count: countUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      err: error.message,
    });
  }
};
