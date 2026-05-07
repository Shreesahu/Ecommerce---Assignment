import { Router } from "express";
import jwtTokenValidator from "../middleware/validator.middleware.js";
import userInDBChecker from "../middleware/userInDBChecker.middleware.js";
import { getUserCartController, addToCartController , updateCartItemController , removeFromCartController, clearCartController} from "../controllers/cart.controller.js";


const router = Router();

router.get("/items" , jwtTokenValidator , userInDBChecker , getUserCartController);
router.post("/items/add" , jwtTokenValidator , userInDBChecker , addToCartController);
router.patch("/items/update" , jwtTokenValidator , userInDBChecker , updateCartItemController);
router.delete("/items/remove" , jwtTokenValidator , userInDBChecker , removeFromCartController);
router.delete("/clear", jwtTokenValidator, userInDBChecker, clearCartController);

export default router;
