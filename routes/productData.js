import express from "express";
import {
  addProductData,
  deleteProductData,
  getProductDatas,
  getProductData,
  updateProductData,
} from "../controllers/productDatas.js";

const router = express.Router();

router.get("/", getProductDatas);
router.get("/:ProductDataId", getProductData);
router.post("/", addProductData);
router.put("/:ProductDataId", updateProductData);
router.delete("/:ProductDataId", deleteProductData);

export default router;
