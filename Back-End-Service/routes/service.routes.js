import { Router } from "express";
const router = Router();

import upload from "../utils/multer.js";
import {
    addService,
    getServiceById,
    updateService,
    getAllService,
    deleteService
} from "../controller/service.controller.js";

router.route('/').post(upload.single("avatar"), addService)
router.route('/').get(getAllService)
router.route('/:id').get(getServiceById)
router.route('/:id').put(upload.single("avatar"), updateService)
router.route('/:id').delete(deleteService)

export default router;

