import express from "express"
import { getUsers, addUser, updateUser, getUser, deleteUser } from "../controllers/users.js"

const router = express.Router()


router.post('/', addUser);
router.get('/', getUsers);
router.get('/:userId', getUser)
router.put('/', updateUser);
router.delete('/', deleteUser);


export default router;