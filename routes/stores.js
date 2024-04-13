import express from "express";
import multer from "multer";
// import stores from "../controllers/js";
import { validateMyStoreRequest } from "../middleware/validation/storeMiddleware.js";
import {
  isAuthorize,
  admin,
} from "../middleware/validation/authMiddleware.mjs";
import { param } from "express-validator";
import {
  updateOrderStatus,
  getMyStoreOrders,
  getMyStore,
  createMyStore,
  updateMyStore,
  searchStore,
  getStore,
  getAllStores,
} from "../controllers/stores.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.get("/order", isAuthorize, admin, getMyStoreOrders);

router.patch("/order/:orderId/status", isAuthorize, admin, updateOrderStatus);

router.get("/", getAllStores);
// router.get("/", isAuthorize, admin, getAllStores);

router.get("/mystore", isAuthorize, admin, getMyStore);

router.post(
  "/",
  upload.single("imageFile"),
  validateMyStoreRequest,
  isAuthorize,
  admin,
  createMyStore
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyStoreRequest,
  isAuthorize,
  admin,
  updateMyStore
);

router.get(
  "/:storeId",
  param("storeId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("storeId parameter must be a valid string"),
  getStore
);

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  searchStore
);

export default router;
