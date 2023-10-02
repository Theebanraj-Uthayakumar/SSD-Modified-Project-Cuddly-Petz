import { Router } from "express";
const router = Router();
import upload from "../utils/multer.js";
import {
  addComments,
  getCommentsById,
  updateComments,
  getAllComments,
  deleteComments,
} from "../controller/comments.controller.js";

router.route("/").post(upload.single("avatar"), addComments);
router.route("/").get(getAllComments);
router.route("/:id").get(getCommentsById);
router.route("/:id").put(upload.single("avatar"), updateComments);
router.route("/:id").delete(deleteComments);

export default router;
