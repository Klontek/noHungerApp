import mongoose from "mongoose";
import categoryModel from "../model/category.js";
import productModel from "../model/product.js";
import multer from "multer";
import asyncHandler from "express-async-handler";
import {
  removeFromCloudinary,
  uploadToCloudinary,
} from "../services/cloudinary.js";
import ApiFeatures from "../utility/apiFeatures.js";

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

// @desc fetch all products
// @route GET /api/products
// @access Public
export const getProducts = async (req, res) => {
  try {
    let filter = {};
    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }

    const products = await productModel.find(filter).populate("category");

    if (!products) {
      console.log(products);
      res.status(404).json({ msg: "Cannot find products" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      err: error,
      msg: "Internal server error",
    });
  }
};

// @desc  fetch products for categories page
// @route GET /api/products/category
// @access Public
export const getCategoryProducts = asyncHandler(async (req, res, next) => {
  const resultPerPage = 3;
  const productsCount = await productModel.countDocuments();

  const apiFeature = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// @desc fetch single product
// @route GET /api/product
// @access Public
export const getProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(404).json({ msg: "Invalid productId" });
    }

    const product = await productModel.findById(productId).populate("category");

    if (!product) {
      console.log(product);
      return res
        .status(404)
        .json({ msg: "The product with the given ID was not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      err: error,
      msg: "Internal server error",
    });
  }
};

// @desc total number of products
// @route GET /api/products/get/count
// @access Private
export const getCountProduct = async (req, res) => {
  const countProduct = await productModel.countDocuments();

  try {
    if (!countProduct || countProduct.length === 0) {
      return res.status(404).json({ msg: "No available product" });
    }

    return res.status(201).json({ count: countProduct });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error",
      err: error.message,
    });
  }
};

// @desc Find featured products
// @route GET /api/products/get/featured/:countId
// @access Private
export const getFeaturedProduct = async (req, res) => {
  const count = req.params.countId ? req.params.countId : 0;

  try {
    const products = await productModel
      .find({ isFeatured: true })
      .limit(+count);

    if (!products) {
      return res.status.json("No featured products");
    }

    return res.status(201).json(products);
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      err: error,
    });
  }
};

// @desc register products
// @route POST /api/products/
// @access Private
export const addProduct = async (req, res) => {
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
      const file = req.file; // Check if req.file is defined

      if (!category) {
        return res.status(400).json({ msg: "Invalid Category" });
      }

      if (!file) {
        return res.status(400).json({ msg: "Invalid file/image entry" });
      }

      // const fileName = file.filename;
      // const basePath = `${req.protocol}://${req.get('host')}/public/uploads`;

      const fileName = file.originalname.split(" ").join("-");
      const buffer = file.buffer;

      // Upload image to Cloudinary
      const cloudinaryResponse = await uploadToCloudinary(buffer, "products");

      const {
        name,
        description,
        richDescription,
        image,
        images,
        brand,
        price,
        countInStock,
        rating,
        numReviews,
        isFeatured,
        dateCreated,
      } = req.body;

      const newProduct = await productModel.create({
        name,
        description,
        richDescription,
        public_id: cloudinaryResponse.public_id,
        image: cloudinaryResponse.secure_url,
        // image: `${basePath}/${fileName}`, // Correct the path
        images,
        brand,
        price,
        category: categoryId,
        countInStock,
        rating,
        numReviews,
        isFeatured,
        dateCreated,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
        error: error.message,
      });
    }
  });
};

// @desc update product
// @route GET /api/products/:productId
// @access Private
export const updateProduct = async (req, res) => {
  uploadOptions.single("image")(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).json({
        msg: "Error uploading image",
        error: uploadError.message,
      });
    }

    const categoryId = req.body.category;
    const productId = req.params.productId;

    const {
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = req.body;

    const product = await productModel.findById(productId);
    if (!product) return res.status(400).json({ msg: "Invalid product!" });

    const file = req.file;

    try {
      const category = await categoryModel.findById(categoryId);
      if (!category) {
        return res.status(400).json({ msg: "Invalid Category" });
      }

      let cloudinaryResponse;

      if (file) {
        const buffer = file.buffer;
        cloudinaryResponse = await uploadToCloudinary(buffer, "productData");
      } else {
        cloudinaryResponse = {
          secure_url: product.image,
          public_id: product.public_id,
        };
      }

      const updateData = {
        name,
        description,
        richDescription,
        public_id: cloudinaryResponse.public_id,
        image: cloudinaryResponse.secure_url,
        // image: imagePath,
        images: cloudinaryResponse.secure_url,
        brand,
        price,
        category: categoryId,
        countInStock,
        rating,
        numReviews,
        isFeatured,
      };

      // Remove previous image from Cloudinary
      await removeFromCloudinary(product.public_id);

      // Update the product and return the updated object
      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        updateData,
        {
          new: true, // Return the updated product
        }
      );

      if (!updatedProduct) {
        return res.status(404).json({ msg: "Product cannot be updated" });
      }

      res.status(200).json({
        msg: "Product has been updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        err: error,
        msg: "Internal Server Error",
      });
    }
  });
};

// @desc delete a product
// @route DELETE /api/products/:productId
// @access Private/Admin
export const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    let product = await productModel.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }

    // Remove image from Cloudinary
    await removeFromCloudinary(product.public_id);

    res.status(201).json("Product has been deleted successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

// @desc update products images product
// @route PUT /api/products/gallery-images/:productId
// @access Private/Admin
export const updateProductGalleryImages = async (req, res) => {
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
            "productGallery"
          );
          imagePaths.push(cloudinaryResponse.secure_url);
        }
      }

      // Remove previous images from Cloudinary
      const product = await productModel.findById(req.params.productId);
      if (product.images && product.images.length > 0) {
        for (const public_id of product.imagesPublicIds) {
          await removeFromCloudinary(public_id);
        }
      }

      // Update the product with new image paths
      const updatedProduct = await productModel.findByIdAndUpdate(
        req.params.productId,
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

      if (!updatedProduct) {
        return res.status(404).json({ msg: "Product cannot be updated" });
      }

      res.status(200).json({
        msg: "Product has been updated successfully",
        product: updatedProduct,
      });
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await productModel.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// let imagePath;

// if (file) {
//   const fileName = file.filename;
//   const basePath = `${req.protocol}://${req.get("host")}/public/uploads`;
//   imagePath = `${basePath}/${fileName}`;
// } else {
//   imagePath = product.image;
// }

// //upload image functionality
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//    const isValid = MIME_FILE_TYPE[file.mimetype]; //validate file type
//    let uploadError = new Error("invalid image type");

//    if(isValid) {
//     uploadError = null;
//    }

//     cb(uploadError, 'public/uploads') //directory where image will be uploaded
//   },
//   filename: function (req, file, cb) {
//     const fileName = file.originalname.split(' ').join('-');
//     const extension = MIME_FILE_TYPE[file.mimetype];
//     cb(null, `${fileName}-${Date.now()}.${extension}`)
//   }
// })

// const uploadOptions = multer({ storage: storage })

// //uploading/updating images in gallery

// export const updateProductGalleryImages = async (req, res) => {
//   try {
//     uploadOptions.array('images', 10)(req, res, async (uploadError) => {
//       if (uploadError) {
//         return res.status(400).json({
//           msg: 'Error uploading Images',
//           error: uploadError.message,
//         });
//       }
//       const files = req.files;
//       const basePath = `${req.protocol}://${req.get('host')}/public/uploads`;
//       let imagePaths = [];

//       if(files) {
//         files.map((file) => imagePaths.push(`${basePath}/${file.filename}`));
//       }

//       const updatedProduct = await productModel.findByIdAndUpdate(
//         req.params.productId,
//         {
//           images: imagePaths,
//         },
//         {
//           new: true,
//         }
//       );

//       if (!updatedProduct) {
//         return res.status(404).json({ msg: "Product cannot be updated" });
//       }

//       res.status(200).json({
//         msg: "Product has been updated successfully",
//         product: updatedProduct,
//       });
//     });
//   } catch (error) {
//     res.status(500).json({
//       msg: 'Internal Server Error',
//       error: error.message,
//     });
//   }
// };
