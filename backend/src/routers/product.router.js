import { Router } from "express";
import { getAllProductController , getProductByIDController , getProductByTitleController, getFilteredProductsController , getMostBoughtProductsController} from "../controllers/product.controller.js";

const router = Router();


router.get("/get-all-product" , getAllProductController);
router.get("/get-product/:id" , getProductByIDController);
router.get("/search-product", getProductByTitleController);
router.get("/filter", getFilteredProductsController);
router.get("/most-bought", getMostBoughtProductsController);


export default router;