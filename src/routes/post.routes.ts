import { Router } from "express";
import { createPosts, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller";

const router:Router = Router();

router.route('/').get(getPosts).post(createPosts);
router.route("/:id").get(getPost).delete(deletePost).put(updatePost);

export default router;