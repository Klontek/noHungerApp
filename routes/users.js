import express from "express";
import {
  getUsers,
  addUser,
  updateUser,
  getUser,
  deleteUser,
  loginUser,
  getUserCount,
  uploadProfile,
  getProfile,
} from "../controllers/users.js";
import {
  userValidation,
  validateUserSignIn,
  validatorUserSignUp,
} from "../middleware/validation/userMiddleware.cjs";

const router = express.Router();

router.post("/register", validatorUserSignUp, userValidation, addUser);
router.get("/", getUsers);
router.get("/get/count", getUserCount);
router.get("/:userId", getUser);
router.post("/login", validateUserSignIn, userValidation, loginUser);
router.put("/", updateUser);
router.delete("/", deleteUser);
router.get(`/profile`, getProfile);

export default router;
