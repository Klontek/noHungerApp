import mongoose from "mongoose";
import categoryModel from "../model/category.js";
import productDataModel from "../model/productData.js";
import multer from "multer";
import {
  uploadToCloudinary,
  removeFromCloudinary,
} from "../services/cloudinary.js";

const MIME_FILE_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

// //upload image functionality
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const isValid = MIME_FILE_TYPE[file.mimetype]; //validate file type
//     let uploadError = new Error("invalid image type");

//     if (isValid) {
//       uploadError = null;
//     }

//     cb(uploadError, "public/productData"); //directory where image will be uploaded
//   },
//   filename: function (req, file, cb) {
//     const fileName = file.originalname.split(" ").join("-");
//     const extension = MIME_FILE_TYPE[file.mimetype];
//     cb(null, `${fileName}-${Date.now()}.${extension}`);
//   },
// });

// const uploadOptions = multer({ storage: storage });

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

export const getProductDatas = async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }

    const productDatas = await productDataModel
      .find(filter)
      .populate("category");

    if (!productDatas) {
      console.log(productDatas);
      res.status(404).json({ msg: "Cannot find product Datas" });
    }
    res.status(200).json(productDatas);
  } catch (error) {
    res.status(500).json({
      err: error,
      msg: "Internal server error",
    });
  }
};

export const getProductData = async (req, res) => {
  const productDataId = req.params.productDataId;
  try {
    if (!mongoose.isValidObjectId(productDataId)) {
      return res.status(404).json({ msg: "Invalid productDataId" });
    }

    const productData = await productDataModel
      .findById(productDataId)
      .populate("category");

    if (!productData) {
      console.log(productData);
      return res
        .status(404)
        .json({ msg: "The productData with the given ID was not found" });
    }

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({
      err: error,
      msg: "Internal server error",
    });
  }
};

export const getCountProductData = async (req, res) => {
  const countProductData = await productDataModel.countDocuments();

  try {
    if (!countProductData || countProductData.length === 0) {
      return res.status(404).json({ msg: "No available productData" });
    }

    return res.status(201).json({ count: countProductData });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error",
      err: error.message,
    });
  }
};

export const getFeaturedProductData = async (req, res) => {
  const count = req.params.countId ? req.params.countId : 0;

  try {
    const productDatas = await productDataModel
      .find({ isFeatured: true })
      .limit(+count);

    if (!productDatas) {
      return res.status.json("No featured productDatas");
    }

    return res.status(201).json(productDatas);
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      err: error,
    });
  }
};

// Add product data with image upload to Cloudinary
export const addProductData = async (req, res) => {
  uploadOptions.single("image")(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).json({
        msg: "Error uploading image",
        error: uploadError.message,
      });
    }

    try {
      const categoryId = req.body.category;
      const category = await categoryModel.findById(categoryId);
      const file = req.file;

      if (!category) {
        return res.status(400).json({ msg: "Invalid Category" });
      }

      if (!file) {
        return res.status(400).json({ msg: "Invalid file/image entry" });
      }

      const fileName = file.originalname.split(" ").join("-");
      const buffer = file.buffer;

      // Upload image to Cloudinary
      const cloudinaryResponse = await uploadToCloudinary(
        buffer,
        "productData"
      );

      // Create product data
      const {
        name,
        price,
        brand,
        isFeatured,
        description,
        countInStock,
        dateCreated,
      } = req.body;

      const newProductData = await productDataModel.create({
        name,
        price,
        public_id: cloudinaryResponse.public_id,
        image: cloudinaryResponse.secure_url,
        brand,
        isFeatured,
        description,
        countInStock,
        category: categoryId,
        dateCreated,
      });

      res.status(201).json(newProductData);
    } catch (error) {
      console.error("Error adding product data:", error);
      res.status(500).json({
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  });
};

// export const addProductData = async (req, res) => {
//   uploadOptions.single("image")(req, res, async (uploadError) => {
//     if (uploadError) {
//       return res.status(400).json({
//         msg: "Error uploading image",
//         error: uploadError.message,
//       });
//     }

//     try {
//       const categoryId = req.body.category;
//       const category = await categoryModel.findById(categoryId);
//       const file = req.file; // Check if req.file is defined

//       if (!category) {
//         return res.status(400).json({ msg: "Invalid Category" });
//       }

//       if (!file) {
//         return res.status(400).json({ msg: "Invalid file/image entry" });
//       }

//       const fileName = file.filename;
//       const basePath = `${req.protocol}://${req.get(
//         "host"
//       )}/public/productData`;

//       const {
//         name,
//         price,
//         brand,
//         isFeatured,
//         description,
//         countInStock,
//         dateCreated,
//       } = req.body;

//       const newProductData = await productDataModel.create({
//         name,
//         price,
//         image: `${basePath}/${fileName}`, // Correct the path
//         brand,
//         isFeatured,
//         description,
//         countInStock,
//         category: categoryId,
//         dateCreated,
//       });

//       res.status(201).json(newProductData);
//     } catch (error) {
//       res.status(500).json({
//         msg: "Internal Server Error",
//         error: error.message,
//       });
//     }
//   });
// };

export const updateProductData = async (req, res) => {
  uploadOptions.single("image")(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).json({
        msg: "Error uploading image",
        error: uploadError.message,
      });
    }

    const categoryId = req.body.category;
    const productDataId = req.params.productDataId;

    const { name, price, brand, isFeatured, description, countInStock } =
      req.body;

    const productData = await productDataModel.findById(productDataId);
    if (!productData)
      return res.status(400).json({ msg: "Invalid productData!" });

    const file = req.file;

    try {
      const category = await categoryModel.findById(categoryId);
      if (!category) {
        return res.status(400).json({ msg: "Invalid Category" });
      }

      let cloudinaryResponse;

      if (file) {
        const buffer = file.buffer;
        cloudinaryResponse = uploadToCloudinary(buffer, "productData");
      } else {
        cloudinaryResponse = {
          secure_url: productData.image,
          public_id: productData.public_id,
        };
      }

      const updateData = {
        name,
        price,
        public_id: cloudinaryResponse.public_id,
        image: cloudinaryResponse.secure_url,
        brand,
        isFeatured,
        description,
        countInStock,
        category: categoryId,
      };

      // Remove previous image from Cloudinary
      await removeFromCloudinary(productData.public_id);

      // Update the productData and return the updated object
      const updatedProductData = await productDataModel.findByIdAndUpdate(
        productDataId,
        updateData,
        {
          new: true, // Return the updated productData
        }
      );

      if (!updatedProductData) {
        return res.status(404).json({ msg: "ProductData cannot be updated" });
      }

      res.status(200).json({
        msg: "ProductData has been updated successfully",
        productData: updatedProductData,
      });
    } catch (error) {
      res.status(500).json({
        err: error,
        msg: "Internal Server Error",
      });
    }
  });
};

// export const updateProductData = async (req, res) => {
//   uploadOptions.single("image")(req, res, async (uploadError) => {
//     if (uploadError) {
//       return res.status(400).json({
//         msg: "Error uploading image",
//         error: uploadError.message,
//       });
//     }

//     const categoryId = req.body.category;
//     const productDataId = req.params.productDataId;

//     const { name, price, brand, isFeatured, description, countInStock } =
//       req.body;

//     const productData = await productDataModel.findById(productDataId);
//     if (!productData)
//       return res.status(400).json({ msg: "Invalid productData!" });

//     const file = req.file;
//     let imagePath;

//     if (file) {
//       const fileName = file.filename;
//       const basePath = `${req.protocol}://${req.get(
//         "host"
//       )}/public/productData`;
//       imagePath = `${basePath}/${fileName}`;
//     } else {
//       imagePath = productData.image;
//     }

//     try {
//       const category = await categoryModel.findById(categoryId);
//       if (!category) {
//         return res.status(400).json({ msg: "Invalid Category" });
//       }

//       const updateData = {
//         name,
//         price,
//         image: imagePath,
//         brand,
//         isFeatured,
//         description,
//         countInStock,
//         category: categoryId,
//       };

//       // Update the productData and return the updated object
//       const updatedProductData = await productDataModel.findByIdAndUpdate(
//         productDataId,
//         updateData,
//         {
//           new: true, // Return the updated productData
//         }
//       );

//       if (!updatedProductData) {
//         return res.status(404).json({ msg: "ProductData cannot be updated" });
//       }

//       res.status(200).json({
//         msg: "ProductData has been updated successfully",
//         productData: updatedProduct,
//       });
//     } catch (error) {
//       res.status(500).json({
//         err: error,
//         msg: "Internal Server Error",
//       });
//     }
//   });
// };

// Remove product data with image from Cloudinary
export const deleteProductData = async (req, res) => {
  const productDataId = req.params.productDataId;
  try {
    let productData = await productDataModel.findByIdAndDelete(productDataId);

    if (!productData) {
      return res.status(404).json({ msg: "productData not found" });
    }

    // Remove image from Cloudinary
    await removeFromCloudinary(productData.public_id);

    res.status(201).json("ProductData has been deleted successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

export const updateProductDataGalleryImages = async (req, res) => {
  try {
    uploadOptions.array("images", 10)(req, res, async (uploadError) => {
      if (uploadError) {
        return res.status(400).json({
          msg: "Error uploading Images",
          error: uploadError.message,
        });
      }

      const files = req.files;
      let imagePaths = [];

      if (files) {
        // Upload images to Cloudinary
        for (const file of files) {
          const buffer = file.buffer;
          const cloudinaryResponse = await uploadToCloudinary(
            buffer,
            "productDataGallery"
          );
          imagePaths.push(cloudinaryResponse.secure_url);
        }
      }

      // Remove previous images from Cloudinary (if any)
      const productData = await productDataModel.findById(
        req.params.productDataId
      );
      if (productData.images && productData.images.length > 0) {
        for (const public_id of productData.imagesPublicIds) {
          await removeFromCloudinary(public_id);
        }
      }

      // Update the productData with new image paths
      const updatedProductData = await productDataModel.findByIdAndUpdate(
        req.params.productDataId,
        {
          images: imagePaths,
          imagesPublicIds: imagePaths.map(
            (url) => url.split("/").pop().split(".")[0]
          ), // Extract public_ids from URLs
        },
        {
          new: true,
        }
      );

      if (!updatedProductData) {
        return res.status(404).json({ msg: "ProductData cannot be updated" });
      }

      res.status(200).json({
        msg: "ProductData has been updated successfully",
        product: updatedProductData,
      });
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// export const deleteProductData = async (req, res) => {
//   const productDataId = req.params.productDataId;
//   try {
//     let productData = await productModel.findByIdAndDelete(productDataId);

//     if (!productData) {
//       return res.status(404).json({ msg: "productData not found" });
//     }

//     res.status(201).json("ProductData has been deleted successfully");
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       msg: error,
//     });
//   }
// };

// //uploading/updating images in gallery

// export const updateProductDataGalleryImages = async (req, res) => {
//   try {
//     uploadOptions.array("images", 10)(req, res, async (uploadError) => {
//       if (uploadError) {
//         return res.status(400).json({
//           msg: "Error uploading Images",
//           error: uploadError.message,
//         });
//       }
//       const files = req.files;
//       const basePath = `${req.protocol}://${req.get(
//         "host"
//       )}/public/productData`;
//       let imagePaths = [];

//       if (files) {
//         files.map((file) => imagePaths.push(`${basePath}/${file.filename}`));
//       }

//       const updatedProductData = await productDataModel.findByIdAndUpdate(
//         req.params.productDataId,
//         {
//           images: imagePaths,
//         },
//         {
//           new: true,
//           Data,
//         }
//       );

//       if (!updatedProductData) {
//         return res.status(404).json({ msg: "Product cannot be updated" });
//       }

//       res.status(200).json({
//         msg: "Product has been updated successfully",
//         product: updatedProductData,
//       });
//     });
//   } catch (error) {
//     res.status(500).json({
//       msg: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };
