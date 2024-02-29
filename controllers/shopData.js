// import shopDataModel from "../model/productData.js";

import shopDataModel from "../model/shopData.js";
import multer from "multer";
import productDataModel from "../model/productData.js";
import {
  removeFromCloudinary,
  uploadToCloudinary,
} from "../services/cloudinary.js";
// import productModel from "../model/product.js";

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
export const getShopDatas = async (req, res) => {
  try {
    const shopData = await shopDataModel.find().populate("productData");
    res.status(201).json(shopData);
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const getShopData = async (req, res) => {
  const shopDataId = req.params.shopDataId;
  try {
    const shopData = await shopDataModel.findById(shopDataId);
    if (!shopData) {
      res
        .status(404)
        .json({ msg: "The shopData with the given ID was not found" });
    }
    res.status(200).json(shopData);
  } catch (error) {
    res.status(500).json({
      msg: "Invalid Id parameter",
      success: false,
      value: error,
    });
  }
};

export const addShopData = async (req, res) => {
  uploadOptions.single("image")(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).json({
        msg: "Error uploading image",
        error: uploadError.message,
      });
    }

    try {
      const productDataId = req.body.productData;
      const productData = await productDataModel.findById(productDataId);
      const file = req.file;

      if (!productData) {
        return res.status(400).json({ msg: "Invalid product" });
      }
      if (!file) {
        return res.status(400).json({ msg: "Invalid shop file/image entry" });
      }

      const fileName = file.originalname.split(" ").join("-");
      const buffer = file.buffer;
      const cloudinaryResponse = await uploadToCloudinary(buffer, "shopData");
      // const fileName = file.filename;
      // const basePath = `${req.protocol}://${req.get("host")}/public/shopData`;
      const {
        ShopName,
        farAway,
        businessAddress,
        rating,
        numReviews,
        coordinates,
        discount,
        deliveryTimes,
        collectTimes,
        foodType,
        dateCreated,
      } = req.body;

      const newShopData = await shopDataModel.create({
        ShopName,
        farAway,
        businessAddress,
        public_id: cloudinaryResponse.public_id,
        image: cloudinaryResponse.secure_url,
        // image: `${basePath}/${fileName}`,
        rating,
        numReviews,
        coordinates,
        discount,
        deliveryTimes,
        collectTimes,
        foodType,
        productData: productDataId,
        dateCreated,
        // image: req.body.image,
      });
      res.status(201).json({ msg: "shop added", data: newShopData });
      console.log(newShopData);
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error!",
        error: error.message,
      });
    }
  });
};

export const updateShopDatas = async (req, res) => {
  uploadOptions.single("image")(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).json({
        msg: "Error uploading image",
        error: uploadError.message,
      });
    }

    const {
      ShopName,
      farAway,
      businessAddress,
      rating,
      numReviews,
      coordinates,
      discount,
      deliveryTimes,
      collectTimes,
      foodType,
    } = req.body;

    try {
      const shopData = await shopDataModel.findById(req.params.shopDataId);

      if (!shopData) {
        return res.status(400).json({ msg: "Invalid shopData!" });
      }

      const file = req.file;
      let cloudinaryResponse;

      if (file) {
        const buffer = file.buffer;
        cloudinaryResponse = await uploadToCloudinary(buffer, "shopData");
      } else {
        cloudinaryResponse = {
          secure_url: shopData.image,
          public_id: shopData.public_id,
        };
      }

      const updateData = {
        ShopName,
        farAway,
        businessAddress,
        public_id: cloudinaryResponse.public_id,
        image: cloudinaryResponse.secure_url,
        rating,
        numReviews,
        coordinates,
        discount,
        deliveryTimes,
        collectTimes,
        foodType,
      };

      // Remove previous image from Cloudinary
      await removeFromCloudinary(shopData.public_id);

      // Update the shopData and return the updated object
      await shopDataModel.findByIdAndUpdate(req.params.shopDataId, updateData, {
        new: true,
      });

      res.status(200).json("shopData has been updated successfully!");
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  });
};

export const deleteShopData = async (req, res) => {
  const shopDataId = req.params.shopDataId;

  try {
    // Find the shopData to be deleted
    const shopData = await shopDataModel.findById(shopDataId);

    if (!shopData) {
      return res.status(404).json({ msg: "ShopData not found" });
    }

    // Remove image from Cloudinary
    await removeFromCloudinary(shopData.public_id);

    // Delete the shopData from the database
    await shopDataModel.findByIdAndDelete(shopDataId);

    res.status(200).json({ msg: "ShopData deleted successfully" });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// //upload image functionality
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const isValid = MIME_FILE_TYPE[file.mimetype]; //validate file type
//     let uploadError = new Error("invalid image type");

//     if (isValid) {
//       uploadError = null;
//     }

//     cb(uploadError, "public/shopData"); //directory where image will be uploaded
//   },
//   filename: function (req, file, cb) {
//     const fileName = file.originalname.split(" ").join("-");
//     const extension = MIME_FILE_TYPE[file.mimetype];
//     cb(null, `${fileName}-${Date.now()}.${extension}`);
//   },
// });

// const uploadOptions = multer({ storage: storage });

// export const updateShopDatas = async (req, res) => {
//   const {
//     ShopName,
//     farAway,
//     businessAddress,
//     rating,
//     numReviews,
//     coordinates,
//     discount,
//     deliveryTimes,
//     collectTimes,
//     foodType,
//   } = req.body;
//   try {
//     await shopDataModel.findByIdAndUpdate(
//       req.params.shopDataId,
//       {
//         ShopName,
//         farAway,
//         businessAddress,
//         rating,
//         numReviews,
//         coordinates,
//         discount,
//         deliveryTimes,
//         collectTimes,
//         foodType,
//       },
//       {
//         new: true,
//       }
//     );

//     res.status(200).json("shopData has been updated successfully!");
//   } catch (error) {
//     res.status(500).json({
//       msg: error,
//     });
//   }
// };

// export const deleteShopData = async (req, res) => {
//   try {
//     let shopData = (await shopDataModel.findById(req.params.shopDataId)(
//       !shopData
//     ))
//       ? res.status(404).json({ msg: "shopData not found" })
//       : await shopData.remove();
//     res.status(201).json("shopData has been deleted successfully");
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       msg: error,
//     });
//   }
// };
