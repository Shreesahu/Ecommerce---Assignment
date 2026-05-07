import { Router } from "express";
import jwtTokenValidator from "../middleware/validator.middleware.js";
import userInDBChecker from "../middleware/userInDBChecker.middleware.js";
import { getUserCartController, addToCartController , updateCartItemController , removeFromCartController, clearCartController} from "../controllers/cart.controller.js";


const router = Router();

//for showing cart item
router.get("/items" , jwtTokenValidator , userInDBChecker , getUserCartController);

//add product
router.post("/items/add" , jwtTokenValidator , userInDBChecker , addToCartController);


//increase/decrease quantity
router.patch("/items/update" , jwtTokenValidator , userInDBChecker , updateCartItemController);


//remove product
router.delete("/items/remove" , jwtTokenValidator , userInDBChecker , removeFromCartController);


//remove all product
router.delete("/clear", jwtTokenValidator, userInDBChecker, clearCartController);


export default router;
