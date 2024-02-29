import express from "express";
import {
  addOrder,
  deleteOrder,
  getOrder,
  getOrderCount,
  getOrders,
  getTotalSales,
  getUserOrders,
  updateOrder,
} from "../controllers/orders.js";
import {
  isAuthorize,
  admin,
} from "../middleware/validation/authMiddleware.mjs";

const router = express.Router();

router.post("/", isAuthorize, addOrder);
router.get("/", getOrders);
router.get("/:orderId", getOrder);
router.get("/get/count", getOrderCount);
router.get("/get/userorders/:userId", getUserOrders);
router.get("/get/totalsales", getTotalSales);
router.put("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);

export default router;
