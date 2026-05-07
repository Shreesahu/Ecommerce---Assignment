import { Router } from "express";
import { getAllProductController , getProductByIDController , getProductByTitleController, getFilteredProductsController , getMostBoughtProductsController} from "../controllers/product.controller.js";

const router = Router();


router.get("/get-all-product" , getAllProductController);
router.get("/get-product/:id" , getProductByIDController);
router.get("/search-product", getProductByTitleController);
// 1 more route is yet to be made for filtering purpose 
router.get("/filter", getFilteredProductsController);
//This one i made for most bought
router.get("/most-bought", getMostBoughtProductsController);


export default router;