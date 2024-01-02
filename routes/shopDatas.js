import express from "express";
import {
  addShopData,
  deleteShopData,
  getShopData,
  getShopDatas,
  updateShopDatas,
} from "../controllers/shopData.js";

const router = express.Router();

router.get("/", getShopDatas);
router.get("/:ShopDataId", getShopData);
router.post("/", addShopData);
router.put("/:ShopDataId", updateShopDatas);
router.delete("/:ShopDataId", deleteShopData);

export default router;
