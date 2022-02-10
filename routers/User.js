import express from "express";
import { getUser, searchUser, updateUser, deleteUser, getUserByID  } from "../controllers/User.js";

const router = express.Router();
 
router.get('/get',getUser);
router.get('/findid/:id', getUserByID);
router.put('/update/:id',updateUser);
router.post('/search',searchUser);
router.delete('/delete/:id',deleteUser);

export default router;