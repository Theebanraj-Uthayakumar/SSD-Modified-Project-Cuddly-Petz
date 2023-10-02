import { Router } from "express";
const router = Router();

import {
  addPetOwner,
  getPetOwnerById,
  updatePetOwner,
  getAllPetOwner,
  deletePetOwner,
} from "../controller/petOwner.controller.js";

router.route("/").post(addPetOwner);
router.route("/").get(getAllPetOwner);
router.route("/:id").get(getPetOwnerById);
router.route("/:id").put(updatePetOwner);
router.route("/:id").delete(deletePetOwner);

export default router;
