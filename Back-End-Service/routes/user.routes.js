import { Router } from "express";
const router = Router();
import upload from "../utils/multer.js";
import {
  addUser,
  getUserById,
  updateUser,
  getAllUser,
  deleteUser,
} from "../controller/user.controller.js";

router.route("/").post(upload.single("avatar"), addUser);
router.route("/").get(getAllUser);
router.route("/:id").get(getUserById);
router.route("/:id").put(upload.single("avatar"), updateUser);
router.route("/:id").delete(deleteUser);

export default router;
