import express from "express";
import { 
 getProducts, 
 getProduct, 
 addProduct, 
 updateProduct, 
 deleteProduct, 
 getCountProduct,
 getFeaturedProduct
} from "../controllers/products.js";

const router = express.Router();

router.get('/', getProducts);
router.get('/:productId', getProduct);
router.get('/get/count', getCountProduct);
router.get('/get/featured/:countId', getFeaturedProduct);
router.post('/', addProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

export default router;