import express from "express";
import {
  getUser,
  searchUser,
  updateUser,
  deleteUser,
  getUserByID,
} from "../controllers/User.js";

const router = express.Router();

router.get("/get", getUser);
router.post("/findid", getUserByID);
router.put("/update", updateUser);
router.post("/search", searchUser);
router.delete("/delete", deleteUser);

export default router;
