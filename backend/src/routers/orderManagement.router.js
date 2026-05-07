import Router from "express";
import { createOrderController, getOrderByIdController, cancelOrderController, getAllOrdersController } from "../controllers/orderManagement.controller.js";
import jwtTokenValidator from "../middleware/validator.middleware.js";
import userInDBChecker from "../middleware/userInDBChecker.middleware.js";

const router = Router();

router.post("/add", jwtTokenValidator, userInDBChecker, createOrderController);
router.get("/get/:id", jwtTokenValidator, userInDBChecker, getOrderByIdController);
router.get("/all", jwtTokenValidator, userInDBChecker, getAllOrdersController);
router.patch("/cancel/:id", jwtTokenValidator, userInDBChecker, cancelOrderController);

export default router;