import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import checkUser from "../middleware/checkUser.js";
import {uploadImgMiddleware} from "../middleware/uploadImgMiddleware.js";
const router = express.Router();

router.post("/", verifyToken, checkUser, uploadImgMiddleware("image"));

export default router;
