import express from "express";
import { searchProducts, searchFilterProducts } from "../controllers/search.js";

const router = express.Router();

// Route for searching products by name
router.get("/search", searchProducts);

// Route for searching products by category
router.get("/search/category", searchFilterProducts);

export default router;
