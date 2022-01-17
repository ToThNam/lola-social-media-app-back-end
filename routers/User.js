import express from "express";
import { getUser, searchUser, updateUser, deleteUser  } from "../controllers/User.js";

const router = express.Router();
 
router.get('/get',getUser);
router.put('/update',updateUser);
router.get('/search',searchUser);
router.delete('/delete',deleteUser);

export default router;