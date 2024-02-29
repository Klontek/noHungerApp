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

// @desc Upload profile
// @route POST /api/users/upload
// @access Public
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
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized access!" });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${user._id}_profile`,
        width: 500,
        height: 500,
        crop: "fill",
      });

      const userProfile = await userModel.findByIdAndUpdate(
        user._id,
        { avatar: result.secure_url },
        { new: true }
      );

      res.status(201).json({
        success: true,
        message: "Your profile pic is updated",
        data: userProfile,
      });
    } catch (error) {
      console.log("Error while uploading profile image", error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal server error!" });
    }
  });
};

// @desc Get user profile
// @route GET /api/users/profile
// @access private
export const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar ? user.avatar : "",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc Update user profile
// @route PUT /api/users/:id/update-profile
// @access Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;

    // Exclude confirmPassword from update operation
    if (req.body.confirmPassword) {
      user.confirmPassword = req.body.confirmPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

// @desc Register a new user
// @route POST /api/users
// @access Public
export const registerUser = async (req, res) => {
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
    if (!isNewUser) {
      return res.json({
        success: false,
        message: "This email is already in use, try another one!",
      });
    }

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
      return res.status(404).json({
        success: false,
        message: "User cannot be created",
      });
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      err: error.message,
    });
  }
};

// @desc    Get all users
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "Users not found", data: [] });
    }
    res.status(200).json({
      msg: "Users fetched successfully",
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

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public
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
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Email/password does not match!" });
    }

    const secret = process.env.SECRET;

    if (isMatch) {
      const token = jwt.sign(
        {
          userId: user._id,
          isAdmin: user.isAdmin,
        },
        secret,
        {
          expiresIn: "30d",
        }
      );

      // Remove old tokens from the database
      let oldTokens = user.token || [];

      if (oldTokens.length) {
        oldTokens = oldTokens.filter((t) => {
          const timeDifference = (Date.now() - parseInt(t.signedAt)) / 1000;
          return timeDifference < 86400;
        });
      }

      await userModel.findByIdAndUpdate(user._id, {
        token: [...oldTokens, { token, signedAt: Date.now().toString() }],
      });

      const userInfo = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar ? user.avatar : "",
        isAdmin: user.isAdmin,
        token,
      };

      return res.status(200).json({
        success: true,
        user: userInfo,
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

// @desc    Sign out a user
// @route   GET /api/users/sign-out
// @access  Private
export const signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization failed!" });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter((t) => t.token !== token);

    await userModel.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.status(201).json({ success: true, message: "Sign out successful" });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Authorization header missing!" });
  }
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private/Admin
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
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
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

    if (!updatedUser) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.status(200).json({
      msg: "User has been updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// @desc    Delete a user
// @route   GET /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    let user = await userModel.findById(req.params.id);

    !user
      ? res.status(404).json({ msg: "User not Found" })
      : await user.remove();
    res.status(201).json({
      success: false,
      msg: "User has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

// @desc    get number of users in database
// @route   GET /api/users/:id
// @access  Private/Admin
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
