import { Router } from "express";
import jwtTokenValidator from "../middleware/validator.middleware.js";
import userInDBChecker from "../middleware/userInDBChecker.middleware.js";
import { addToWishlistController, removeFromWishlistController, getWishlistController } from "../controllers/wishlist.controller.js";

const router = Router();

router.get("/user", jwtTokenValidator, userInDBChecker, getWishlistController);
router.post("/add", jwtTokenValidator, userInDBChecker, addToWishlistController);
router.delete("/remove/:productId", jwtTokenValidator, userInDBChecker, removeFromWishlistController);

export default router;