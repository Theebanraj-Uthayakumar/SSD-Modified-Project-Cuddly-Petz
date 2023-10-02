import { Router } from "express";
const router = Router();

import upload from "../utils/multer.js";
import {
  addCategory,
  getCategoryById,
  updateCategory,
  getAllCategory,
  deleteCategory,
} from "../controller/category.contoller.js";

router.route("/").post(upload.single("avatar"), addCategory);
router.route("/").get(getAllCategory);
router.route("/:id").get(getCategoryById);
router.route("/:id").put(upload.single("avatar"), updateCategory);
router.route("/:id").delete(deleteCategory);

export default router;
