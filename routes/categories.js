import express from "express";
import {
 addCategory, 
 deleteCategory, 
 getCategories, 
 getCategory, 
 updateCategories} from "../controllers/categories.js"

const router = express.Router();


router.get('/', getCategories);
router.get('/:categoryId', getCategory);
router.post('/', addCategory);
router.put('/:categoryId', updateCategories);
router.delete('/:categoryId', deleteCategory);

export default router;