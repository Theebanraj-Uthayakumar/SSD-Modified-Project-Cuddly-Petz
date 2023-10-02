import { Router } from "express";
const router = Router();

import upload from "../utils/multer.js";
import {
  addPetHospital,
  getPetHospitalById,
  updatetPetHospital,
  getAllPetHospital,
  deletePetHospital,
} from "../controller/petHospital.controller.js";

router.route("/").post(upload.single("avatar"), addPetHospital);
router.route("/").get(getAllPetHospital);
router.route("/:id").get(getPetHospitalById);
router.route("/:id").put(upload.single("avatar"), updatetPetHospital);
router.route("/:id").delete(deletePetHospital);

export default router;
