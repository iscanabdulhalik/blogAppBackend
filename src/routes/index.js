import express from "express";
import blogRouter from "./blogRoute.js";
import authRouter from "./authRoute.js";
import userRouter from "./userRoute.js";
import uploadRouter from "./uploadRoute.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/blog", blogRouter);
router.use("/user", userRouter);
router.use("/upload", uploadRouter);



export default router;
