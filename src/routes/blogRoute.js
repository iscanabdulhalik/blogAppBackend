import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import checkUser from "../middleware/checkUser.js";
import { uploadImgMiddleware } from "../middleware/uploadImgMiddleware.js";
import {
  createBlog,
  getAllBlogs,
  getUserBlogById,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.js";

const router = express.Router();

router.post("/", verifyToken, checkUser, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", verifyToken, checkUser, getUserBlogById); // Belirli bir kullanıcının bloglarını görmek için user ID
router.get("/:id", verifyToken, checkUser, getBlogById); // Belirli bir blogu görmek için blog ID
router.delete("/:id", verifyToken, checkUser, deleteBlog);
router.patch("/:id", verifyToken, checkUser, uploadImgMiddleware("blogImg"), updateBlog);

export default router;
