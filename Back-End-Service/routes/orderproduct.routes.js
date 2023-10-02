import { Router } from "express";
const router = Router();

import upload from "../utils/multer.js";
import {
  addOrderProduct,
  getOrderProductById,
  updateOrderProduct,
  getAllOrderProduct,
  deleteOrderProduct,
  getOrdersListForPetShop,
} from "../controller/orderproduct.controller.js";

router.route("/").post(upload.single("avatar"), addOrderProduct);
router.route("/").get(getAllOrderProduct);
router.route("/:id").get(getOrderProductById);
router.route("/:id").put(upload.single("avatar"), updateOrderProduct);
router.route("/:id").delete(deleteOrderProduct);

export default router;
