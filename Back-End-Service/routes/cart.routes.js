import { Router } from "express";
const router = Router();

import upload from "../utils/multer.js";
import {
    addCartProduct,
    getCartProductById,
    updateCartProduct,
    getAllCartProduct,
    deleteCartProduct
} from "../controller/cart.controller.js";

router.route('/').post(upload.single("avatar"), addCartProduct)
router.route('/').get(getAllCartProduct)
router.route('/:id').get(getCartProductById)
router.route('/:id').put(upload.single("avatar"), updateCartProduct)
router.route('/:id').delete(deleteCartProduct)

export default router;

