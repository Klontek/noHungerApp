import express from "express";
import {
  addOrder,
  deleteOrder,
  getOrderById,
  getOrderCount,
  getOrders,
  getTotalSales,
  getUserOrders,
  updateOrder,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orders.js";
import {
  isAuthorize,
  admin,
} from "../middleware/validation/authMiddleware.mjs";

const router = express.Router();

router.post("/", isAuthorize, addOrder);
router.get("/", isAuthorize, admin, getOrders);
router.get("/:orderId", isAuthorize, getOrderById);
router.get("/get/count", getOrderCount);
router.get("/get/userorders/:userId", getUserOrders);
router.get("/get/totalsales", getTotalSales);
router.put("/:orderId", updateOrder);
router.put("/:id/pay", isAuthorize, admin, updateOrderToPaid);
router.put("/:id/deliver", isAuthorize, admin, updateOrderToDelivered);
router.delete("/:orderId", deleteOrder);

export default router;

// router
//   .route("/")
//   .post(protect, addOrderItems)
//   .get(isAuthorize, admin, getOrders);
// router.route("/myorders").get(protect, getMyOrders);
// router.route("/:id").get(protect, getOrderById);
// router.route("/:id/pay").put(protect, admin, updateOrderToPaid);
// router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
