import mongoose from "mongoose";
import categoryModel from "../model/category.js";
import productModel from "../model/product.js";





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

export const addProduct =  async (req, res) => {
 const categoryId = req.body.category;
 try {
  const category = await categoryModel.findById(categoryId);
  if (!category) {
   return res.status(400).json({msg: "Invalid Category"})
  }

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
  dateCreated} = req.body

  const newProduct = await productModel.create({
   name,
   description,
   richDescription,
   image,
   images,
   brand,
   price,
   category: categoryId,
   countInStock,
   rating,
   numReviews,
   isFeatured,
   dateCreated
  })
  
  res.status(201).json(newProduct)

 }catch(error) {
  res.status(500).json({
   msg: "Internal Server Error",
   error: error.message
  })
 }
}



export const updateProduct = async (req, res) => {

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

 try {
  const category = await categoryModel.findById(categoryId);
  if (!category) {
   return res.status(400).json({msg: "Invalid Category"})
  }

  const product = await productModel.findByIdAndUpdate(
   productId,
   {
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category: categoryId,
    countInStock,
    rating,
    numReviews,
    isFeatured
   },
   {
    new: true
   }
  )

  if(!product) {
   return res.status(404).json("Product cannot be updated")
  }

  res.status(200).json({
   msg: "Product has been updated successfully", 
   prod: product
  })
 }catch(error) {
  res.status(500).json({
   err: error,
   msg: "Internal Server Error"
  })
 }
}




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