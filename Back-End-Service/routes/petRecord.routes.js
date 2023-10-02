import { Router } from "express";
const router = Router();

import upload from "../utils/multer.js";
import {
  addPetRecord,
  getPetRecordById,
  updatePetRecord,
  getAllPetRecord,
  deletePetRecord,
} from "../controller/petRecord.controller.js";

router.route("/").post(upload.single("avatar"), addPetRecord);
router.route("/").get(getAllPetRecord);
router.route("/:id").get(getPetRecordById);
router.route("/:id").put(upload.single("avatar"), updatePetRecord);
router.route("/:id").delete(deletePetRecord);

export default router;
