import mongoose from "mongoose";
import categoryModel from "../model/category.js";
import productModel from "../model/product.js";
import multer from "multer";


const MIME_FILE_TYPE = {
 'image/png': 'png',
 'image/jpeg': 'jpeg',
 'image/jpg': 'jpg'
}


//upload image functionality
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
   const isValid = MIME_FILE_TYPE[file.mimetype]; //validate file type
   let uploadError = new Error("invalid image type");

   if(isValid) {
    uploadError = null;
   }
   
    cb(uploadError, 'public/uploads') //directory where image will be uploaded
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = MIME_FILE_TYPE[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  }
})

const uploadOptions = multer({ storage: storage })


export const getProducts = async (req, res) => {
 try {
  let filter = {};
  if(req.query.categories) {
   filter = {category: req.query.categories.split(',')}
  }

  const products = await productModel.find(filter).populate('category');

  if(!products) {
   console.log(products)
   res.status(404).json({msg: "Cannot find products"})
  }
  res.status(200).json(products);
 }catch(error) {
  res.status(500).json({
   err: error,
   msg: "Internal server error"
  })
 }
}



export const getProduct = async (req, res) => {
 const productId = req.params.productId
 try{
  if(!mongoose.isValidObjectId(productId)) {
   return res.status(404).json({msg: "Invalid productId"})
  }

  const product = await productModel.findById(productId).populate('category');

  if(!product) {
   console.log(product);
   return res
   .status(404)
   .json({msg: "The product with the given ID was not found"})
  }

  res.status(200).json(product);
 }catch(error) {
  res.status(500).json({
   err: error,
   msg: "Internal server error",
  });
 }
};



export const getCountProduct = async (req, res) => {
 const countProduct = await productModel.countDocuments();

 try{
  if(!countProduct || countProduct.length === 0) {
   return res.status(404).json({msg: "No available product"});
  }
  
  return res.status(201).json({count: countProduct})
 }catch(error) {
  return res.status(500).json({
   msg: "Internal Server Error", 
   err: error.message
  })
 }
}


export const getFeaturedProduct = async (req, res) => {
 const count = req.params.countId ? req.params.countId : 0;

 try {
  const products = await productModel.find({isFeatured: true}).limit(+count)

  if(!products) {
   return res.status.json("No featured products");
  }

  return res.status(201).json(products)
 }catch(error) {
  res.status(500).json({
   msg: "Internal Server Error",
   err: error
  })
 }
}

export const addProduct = async (req, res) => {
  uploadOptions.single('image')(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).json({
        msg: 'Error uploading image',
        error: uploadError.message,
      });
    }

    try {
      const categoryId = req.body.category;
      const category = await categoryModel.findById(categoryId);
      const file = req.file; // Check if req.file is defined

      if (!category) {
        return res.status(400).json({ msg: 'Invalid Category' });
      }
      
      if (!file) {
        return res.status(400).json({ msg: 'Invalid file/image entry' });
      }

      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads`;

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
        image: `${basePath}/${fileName}`, // Correct the path
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
        msg: 'Internal Server Error',
        error: error.message,
      });
    }
  });
};



export const updateProduct = async (req, res) => {
  uploadOptions.single('image')(req, res, async (uploadError) => {
    if (uploadError) {
      return res.status(400).json({
        msg: 'Error uploading image',
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
    let imagePath;

    if (file) {
      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads`;
      imagePath = `${basePath}/${fileName}`;
    } else {
      imagePath = product.image;
    }

    try {
      const category = await categoryModel.findById(categoryId);
      if (!category) {
        return res.status(400).json({ msg: "Invalid Category" });
      }

      const updateData = {
        name,
        description,
        richDescription,
        image: imagePath,
        images,
        brand,
        price,
        category: categoryId,
        countInStock,
        rating,
        numReviews,
        isFeatured,
      };

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




export const deleteProduct = async (req, res) => {
 const productId = req.params.productId;
 try {
  let product = await productModel.findByIdAndDelete(productId)

  if (!product) {
   return res.status(404).json({msg: "product not found"})
  }

  res.status(201).json("Product has been deleted successfully");

 }catch(error) {
  res.status(500).json({
   success: false,
   msg: error
  })
 }
}

//uploading/updating images in gallery

export const updateProductGalleryImages = async (req, res) => {
  try {
    uploadOptions.array('images', 10)(req, res, async (uploadError) => {
      if (uploadError) {
        return res.status(400).json({
          msg: 'Error uploading Images',
          error: uploadError.message,
        });
      }
      const files = req.files;
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads`;
      let imagePaths = [];

      if(files) {
        files.map((file) => imagePaths.push(`${basePath}/${file.filename}`));
      }

      const updatedProduct = await productModel.findByIdAndUpdate(
        req.params.productId,
        {
          images: imagePaths,
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
      msg: 'Internal Server Error',
      error: error.message,
    });
  }
};
