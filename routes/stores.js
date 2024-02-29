import express from "express";
import multer from "multer";
import stores from "../controllers/stores";
import { validateMyStoreRequest } from "../middleware/validation/storeMiddleware.js";
import {
  isAuthorize,
  admin,
} from "../middleware/validation/authMiddleware.mjs";
import { param } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.get("/order", isAuthorize, admin, stores.getMyStoreOrders);

router.patch(
  "/order/:orderId/status",
  isAuthorize,
  admin,
  stores.updateOrderStatus
);

router.get("/", isAuthorize, admin, stores.getMyStore);

router.post(
  "/",
  upload.single("imageFile"),
  validateMyStoreRequest,
  isAuthorize,
  admin,
  stores.createMyStore
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyStoreRequest,
  isAuthorize,
  admin,
  stores.updateMyStore
);

router.get(
  "/:storeId",
  param("storeId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("storeId parameter must be a valid string"),
  stores.getStore
);

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  stores.searchStore
);

export default router;
