import { Router } from "express";
import { signupController , loginController } from "../controllers/auth.controller.js";
import jwtTokenValidator from "../middleware/validator.middleware.js";
import userInDBChecker from "../middleware/userInDBChecker.middleware.js";
import { autoLoginController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginController);
router.post("/signup", signupController);
router.get("/auto-login", jwtTokenValidator,userInDBChecker, autoLoginController);
export default router;  


