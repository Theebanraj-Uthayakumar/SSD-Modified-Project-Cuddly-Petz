import { Router } from "express";
const router = Router();

import upload from "../utils/multer.js";
import {
  addDoctor,
  getDoctorById,
  updateDoctor,
  getAllDoctor,
  deleteDoctor,
} from "../controller/doctor.controller.js";

router.route("/").post(upload.single("avatar"), addDoctor);
router.route("/").get(getAllDoctor);
router.route("/:id").get(getDoctorById);
router.route("/:id").put(upload.single("avatar"), updateDoctor);
router.route("/:id").delete(deleteDoctor);

export default router;
