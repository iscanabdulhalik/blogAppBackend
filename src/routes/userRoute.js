import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import checkUser from "../middleware/checkUser.js";
import {uploadImgMiddleware} from "../middleware/uploadImgMiddleware.js";
import {
    update, getUserById, getAllUsers, deleteUser 
} from "../controllers/user.js";

const router = express.Router();

router.get("/:id", verifyToken, checkUser, getUserById);
router.get("/", verifyToken, checkUser, getAllUsers);
router.patch("/:id", verifyToken, checkUser, update, uploadImgMiddleware("profileImg"));
router.delete("/:id", verifyToken, checkUser, deleteUser);


export default router;
