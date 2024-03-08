import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import mongoose from "mongoose";

const router = express.Router();

// Define a Mongoose schema for the data
const imageSchema = new mongoose.Schema({
  imageUrl: String,
  publicId: {
    type: String,
  },
  // Add other fields as needed
});

imageSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
imageSchema.set("toJSON", {
  virtuals: true,
});

const Image = mongoose.model("Image", imageSchema);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env._API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure Cloudinary as the storage engine for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Create a multer instance with Cloudinary storage
const upload = multer({ storage: storage });

// Upload a new image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Save the Cloudinary image URL and public ID to MongoDB
    const newImage = await Image.create({
      imageUrl: req.file.path,
      publicId: req.file.filename,
    });

    res.json({ id: newImage.id, imageUrl: newImage.imageUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Get all uploaded images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// Delete image by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Image.findByIdAndDelete(id);
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete image" });
  }
});

// Get a single image by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id; // Extract the image ID from the URL params
  try {
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

export default router;
