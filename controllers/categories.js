import categoryModel from "../model/category.js";
import multer from "multer";
import {
  removeFromCloudinary,
  uploadToCloudinary,
} from "../services/cloudinary.js";

const MIME_FILE_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

// Define Multer storage
const storage = multer.memoryStorage(); // Use memory storage for Cloudinary

// Define Multer filter for validating file types
const fileFilter = (req, file, cb) => {
  const isValid = MIME_FILE_TYPE[file.mimetype];
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Invalid image type"), false);
  }
};

// Set up Multer options
const uploadOptions = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// @desc register category
// @route POST /api/categories/
// @access Private
export const addCategory = async (req, res) => {
  uploadOptions.single("icon")(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).json({
        msg: "Error uploading icon",
        error: uploadError.message,
      });
    }

    try {
      const file = req.file; // Check if req.file is defined

      if (!file) {
        return res.status(400).json({ msg: "Invalid icon/image entry" });
      }

      // Upload icon to Cloudinary
      const buffer = file.buffer;
      const cloudinaryResponse = await uploadToCloudinary(buffer, "icons");

      const newCategory = await categoryModel.create({
        name: req.body.name,
        icon: cloudinaryResponse.secure_url,
        color: req.body.color,
        description: req.body.description,
      });

      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  });
};

// @desc Get all categories
// @route GET /api/categories
// @access Public
export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// @desc Get a single category by ID
// @route GET /api/categories/:categoryId
// @access Public
export const getCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// @desc Update a category by ID
// @route PUT /api/categories/:categoryId
// @access Private/Admin
export const updateCategories = async (req, res) => {
  const { name, color, icon } = req.body;
  try {
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.categoryId,
      {
        name,
        color,
        icon: icon || category.icon,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// @desc Delete a category by ID
// @route DELETE /api/categories/:categoryId
// @access Private/Admin
export const deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    await category.deleteOne();
    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// export const addCategory = async (req, res) => {
//   try {
//     const newCategory = await categoryModel.create({
//       name: req.body.name,
//       icon: req.body.icon,
//       color: req.body.color,
//       description: req.body.description,
//     });
//     res.status(201).json(newCategory);
//   } catch (error) {
//     res.status(500).json({
//       msg: error,
//     });
//   }
// };
