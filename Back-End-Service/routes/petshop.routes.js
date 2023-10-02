import { Router } from "express";
const router = Router();
import upload from "../utils/multer.js";
import {
  addPetShop,
  getPetShopById,
  updatePetShop,
  getAllPetShop,
  deletePetShop,
} from "../controller/petshop.controller.js";

router.route("/").post(upload.single("avatar"), addPetShop);
router.route("/").get(getAllPetShop);
router.route("/:id").get(getPetShopById);
router.route("/:id").put(upload.single("avatar"), updatePetShop);
router.route("/:id").delete(deletePetShop);

export default router;
