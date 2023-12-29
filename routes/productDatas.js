import express from "express";
import {
  addproductData,
  deleteProductData,
  getproductData,
  getProductDatas,
  updateProductDatas,
} from "../controllers/productData.js";

const router = express.Router();

router.get("/", getProductDatas);
router.get("/:ProductDataId", getproductData);
router.post("/", addproductData);
router.put("/:ProductDataId", updateProductDatas);
router.delete("/:ProductDataId", deleteProductData);

export default router;
