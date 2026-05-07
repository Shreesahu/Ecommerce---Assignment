import { Router } from "express";
import { completePaymentController, cancelPaymentController } from "../controllers/payment.controller.js";
import jwtTokenValidator from "../middleware/validator.middleware.js";
import userInDBChecker from "../middleware/userInDBChecker.middleware.js";


const router = Router();

router.patch("/pay/:id", jwtTokenValidator, userInDBChecker,completePaymentController);

router.patch("/payment-cancel/:id", jwtTokenValidator, userInDBChecker,
  cancelPaymentController
);

export default router;