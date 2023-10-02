import { Router } from "express";
const router = Router();

import upload from "../utils/multer.js";
import {
  addPet,
  getPetById,
  updatePet,
  getAllPet,
  deletePet,
} from "../controller/pet.controller.js";

router.route("/").post(upload.single("avatar"), addPet);
router.route("/").get(getAllPet);
router.route("/:id").get(getPetById);
router.route("/:id").put(upload.single("avatar"), updatePet);
router.route("/:id").delete(deletePet);

export default router;
