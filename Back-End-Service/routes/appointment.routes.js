import { Router } from "express";
const router = Router();

import upload from "../utils/multer.js";
import {
  addAppointment,
  getAppointmentById,
  updateAppointment,
  getAllAppointment,
  getAllAppointment_V2,
  deleteAppointment,
  getAllAppoinmentDetails,
  getAppoinmentWithDetails,
} from "../controller/appointment.controller.js";

router.route("/").post(upload.single("avatar"), addAppointment);
router.route("/").get(getAllAppoinmentDetails);
router.route("/:id").get(getAppointmentById);
router.route("/:id").put(upload.single("avatar"), updateAppointment);
router.route("/:id").delete(deleteAppointment);

export default router;
