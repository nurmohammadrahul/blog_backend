import express from "express";
import {
  createBlog, getBlogs, getBlog, updateBlog, deleteBlog, getMyBlogs
} from "../controllers/blogController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/myblogs", verifyToken, getMyBlogs);
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.post("/", verifyToken, createBlog);
router.put("/:id", verifyToken, updateBlog);
router.delete("/:id", verifyToken, deleteBlog);



export default router;


