import express from "express";
import checkUser from "../middleware/checkUser.js";

import {
  register,
  login,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login" ,login);


export default router;
