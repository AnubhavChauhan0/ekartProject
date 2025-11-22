import { Router } from "express";
import { addAddress, deleteAddress, getAddress, getAddresses, updateAddress } from "../../controllers/shop/address.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import addressSchema from "../../models/address.model.js"
import { validate } from "../../middlewares/validate.middleware.js";

const router = Router();

router.post("/add-address",validate(addressSchema), authenticate, addAddress)
router.get("/all-addresses",getAddresses)
router.get("/user-address",authenticate,getAddress)
router.patch("/update-address",authenticate,updateAddress)
router.patch("/delete-address",authenticate,deleteAddress)

export default router;