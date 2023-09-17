import express from "express";
import { getUsers, addUser, updateUser, getUser, deleteUser, loginUser, getUserCount } from "../controllers/users.js";

const router = express.Router();


router.post('/', addUser);
router.get('/', getUsers);
router.get('/get/count', getUserCount);
router.get('/:userId', getUser);
router.post('/login', loginUser);
router.put('/', updateUser);
router.delete('/', deleteUser);


export default router;