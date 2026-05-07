import prisma from "../db/prisma.js";
import {
  getAllProductService,
  getProductByIDService,
  getProductByTitleService,
  getAllProductsByFilterService,
  getMostBoughtProductsService,
} from "../services/product.service.js";

export const getAllProductController = async (req, res) => {
  try {

    let { cursor, limit } = req.query;
    limit = limit ? parseInt(limit) : 10;

    const getProduct = await getAllProductService({
      cursor,
      limit,
    });
    const { getProductFromDB: products, nextProductCursor } = getProduct;
    cursor = nextProductCursor;

    console.log(products, "products", cursor, "cursor");

    res.json({
      success: true,
      cursor: cursor,
      Product: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductByIDController = async (req, res) => {
  try {
    let productId = parseInt(req.params.id, 10);

    if (!productId) {
      return res.status(400).json({
        message: "Product id is required",
      });
    }

    const productById = await getProductByIDService({ productId });

    res.json({
      success: true,
      product: productById.productDetails,
    });
  } catch (error) {
    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ message: "Product not found" });
    } else {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const getProductByTitleController = async (req, res) => {
  try {
    const { title } = req.query;

    // validation
    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Search title is required",
      });
    }

    const result = await getProductByTitleService({ title });

    res.json({
      success: true,
      data: result.products,
      nextCursor: result.nextCursor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to search products",
    });
  }
};

export const getFilteredProductsController = async (req, res) => {
  try {
    let { cursor, limit, category, minPrice, maxPrice, isSold } = req.query;

    limit = limit ? parseInt(limit) : 10;

    const result = await getAllProductsByFilterService({
      cursor,
      limit,
      category,
      minPrice,
      maxPrice,
      isSold,
    });

    res.json({
      success: true,
      cursor: result.nextCursor,
      products: result.products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch filtered products" });
  }
};

export const getMostBoughtProductsController = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 5;

    const products = await getMostBoughtProductsService(limit);

    return res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch most bought products",
    });
  }
};
