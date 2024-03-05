import express from "express";
const router = express.Router();

import {
  getProducts,
  getCategoryProducts,
  getProduct,
  getCountProduct,
  getFeaturedProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  updateProductGalleryImages,
  createProductReview,
  getProductReviews,
  getTopRatedProducts,
  updateProductStock,
} from "../controllers/products.js";
import {
  isAuthorize,
  admin,
} from "../middleware/validation/authMiddleware.mjs";

router.route("/").get(getProducts).post(isAuthorize, admin, addProduct);
router.get("/category", getCategoryProducts);
router
  .route("/:productId")
  .get(getProduct)
  .delete(isAuthorize, admin, deleteProduct)
  .put(isAuthorize, admin, updateProduct);
router.put("/gallery-images/:productId", updateProductGalleryImages);
router.get("/get/count", isAuthorize, admin, getCountProduct);
router.get("/get/featured/:countId", isAuthorize, admin, getFeaturedProduct);
router.post("/:productId/reviews", isAuthorize, createProductReview); //not working
router.get("/:productId/reviews", isAuthorize, getProductReviews); //not working
router.get("/top", getTopRatedProducts); //not working
router.put("/:id/stock", isAuthorize, admin, updateProductStock);

export default router;

// import express from "express";
// const router = express.Router();

// import {
//   getProducts,
//   getCategoryProducts,
//   getProduct,
//   getCountProduct,
//   getFeaturedProduct,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   updateProductGalleryImages,
//   createProductReview,
//   getProductReviews,
// } from "../controllers/products.js";
// import {
//   isAuthorize,
//   admin,
// } from "../middleware/validation/authMiddleware.mjs";

// router.route("/").get(getProducts).post(isAuthorize, admin, addProduct);
// router.get("/category", getCategoryProducts);
// router
//   .route("/:productId")
//   .get(getProduct)
//   .delete(isAuthorize, admin, deleteProduct)
//   .put(isAuthorize, admin, updateProduct);
// router.put("/gallery-images/:productId", updateProductGalleryImages);
// router.get("/get/count", isAuthorize, admin, getCountProduct);
// router.get("/get/featured/:countId", isAuthorize, admin, getFeaturedProduct);
// router.post("/:productId/reviews", isAuthorize, createProductReview);
// router.get("/:productId/reviews", isAuthorize, getProductReviews);

// export default router;

// import express from "express";
// import {
//  getProducts,
//  getProduct,
//  addProduct,
//  updateProduct,
//  deleteProduct,
//  getCountProduct,
//  getFeaturedProduct,
//  updateProductGalleryImages,
// } from "../controllers/products.js";

// const router = express.Router();

// router.get('/', getProducts);
// router.get('/:productId', getProduct);
// router.get('/get/count', getCountProduct);
// router.get('/get/featured/:countId', getFeaturedProduct);
// router.post('/', addProduct);
// router.put('/:productId', updateProduct);
// router.put('/gallery-images/:productId', updateProductGalleryImages)
// router.delete('/:productId', deleteProduct);

// export default router;
