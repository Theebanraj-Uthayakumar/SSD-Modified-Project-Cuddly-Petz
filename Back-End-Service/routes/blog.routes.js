import { Router } from "express";
const router = Router();

import upload from "../utils/multer.js";
import {
    addBlog,
    getBlogById,
    updateBlog,
    getAllBlog,
    deleteBlog
} from "../controller/blog.controller.js";

router.route('/').post(upload.single("avatar"), addBlog)
router.route('/').get(getAllBlog)
router.route('/:id').get(getBlogById)
router.route('/:id').put(upload.single("avatar"), updateBlog)
router.route('/:id').delete(deleteBlog)

export default router;

