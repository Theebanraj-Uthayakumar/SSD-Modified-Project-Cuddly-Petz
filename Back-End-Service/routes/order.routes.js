import { Router } from "express";
const router = Router();
import upload from "../utils/multer.js";
import {
  addOrder,
  getOrderById,
  updateOrder,
  getAllOrder,
  deleteOrder,
} from "../controller/order.controller.js";

router.route("/").post(upload.single("avatar"), addOrder);
router.route("/").get(getAllOrder);
router.route("/:id").get(getOrderById);
router.route("/:id").put(upload.single("avatar"), updateOrder);
router.route("/:id").delete(deleteOrder);

export default router;
