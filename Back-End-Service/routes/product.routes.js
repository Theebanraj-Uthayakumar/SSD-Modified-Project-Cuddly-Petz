import { Router } from "express";
const router = Router();

import upload from "../utils/multer.js";
import {
  addProduct,
  getProductById,
  updateProduct,
  getAllProduct,
  deleteProduct,
} from "../controller/product.controller.js";

router.route("/").post(upload.single("avatar"), addProduct);
router.route("/").get(getAllProduct);
router.route("/:id").get(getProductById);
router.route("/:id").put(upload.single("avatar"), updateProduct);
router.route("/:id").delete(deleteProduct);

export default router;
