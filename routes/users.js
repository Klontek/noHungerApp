import express from "express";
import {
  isAuthorize,
  admin,
} from "../middleware/validation/authMiddleware.mjs";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signOut,
  uploadProfile,
  getUserCount,
} from "../controllers/users.js";
import {
  userValidation,
  validateUserSignIn,
  validatorUserSignUp,
} from "../middleware/validation/userMiddleware.cjs";

const router = express.Router();

// Public Routes
router.post("/register", userValidation, validatorUserSignUp, registerUser);
router.post("/login", userValidation, validateUserSignIn, loginUser);
router.get("/sign-out", isAuthorize, signOut);

// Private Routes
router.get("/profile", isAuthorize, getUserProfile);
router.put("/update-profile", isAuthorize, updateUserProfile);
router.post("/upload-profile", isAuthorize, uploadProfile);

// Admin Routes
router.get("/", isAuthorize, admin, getUsers);
router.get("/count", isAuthorize, admin, getUserCount);
router.get("/:id", isAuthorize, admin, getUser);
router.put("/:id", isAuthorize, admin, updateUser);
router.delete("/:id", isAuthorize, admin, deleteUser);

export default router;

// const router = express.Router();

// router
//   .route("/")
//   .post(validatorUserSignUp, userValidation, registerUser)
//   .get(userValidation, isAuthorize, admin, getUsers);
// router.get("/get/count", getUserCount);
// router.get("/:id", getUser);
// router.post("/login", validateUserSignIn, userValidation, loginUser);
// router.put("/", updateUser);
// router.delete("/delete", deleteUser);
// router.get(`/profile`, getUserProfile);
// router.post("/upload-profile", uploadProfile);
// router.post("/sign-out", isAuthorize, signOut);

// export default router;

// router.post("/register", addUser);
// router.get("/", userValidation, admin,getUsers);\
// router.post("/login", loginUser);
