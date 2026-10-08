import { Router } from "express";
import {
  createPost,
  getAllPosts,
  updatePost,
  deletePost,
} from "../controlers/post.controller.js";

const router = Router();

router.route("/create").post(createPost);
router.route("/getPosts").get(getAllPosts);
router.route("/updatePost/:id").put(updatePost);
router.route("/deletePost/:id").delete(deletePost);

export default router;
