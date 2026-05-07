import { addToCartService, getUserCartService, updateCartItemService, removeFromCartService, clearCartService } from "../services/cart.service.js";


export const getUserCartController = async (req, res) => {
  try {
    const result = await getUserCartService({
      userId: req.dbUser.id
    });

    res.json({ success: true, ...result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const addToCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const result = await addToCartService({
      userId: req.dbUser.id,
      productId,
      quantity
    });

    res.json({ success: true, ...result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add item" });
  }
};

export const updateCartItemController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const result = await updateCartItemService({
      userId: req.dbUser.id,
      productId,
      quantity
    });

    res.json({ success: true,  message: "Cart updated", ...result });

  } catch (error) {

    if (error.message === "CART_NOT_FOUND") {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (error.message === "ITEM_NOT_FOUND") {
      return res.status(404).json({ message: "Item not found" });
    }

    console.error(error);
    res.status(500).json({ message: "Failed to update cart" });
  }
};

export const removeFromCartController = async (req, res) => {
  try {
    const { productId } = req.body;

    const result = await removeFromCartService({
      userId: req.dbUser.id,
      productId
    });

    res.json({ success: true, ...result });

  } catch (error) {

    if (error.message === "CART_NOT_FOUND") {
      return res.status(404).json({ message: "Cart not found" });
    }

    console.error(error);
    res.status(500).json({ message: "Failed to remove item" });
  }
};

export const clearCartController = async (req,res) => {
  
  try {

    await clearCartService(
      req.dbUser.id
    );

    return res.json({
      success: true,
      message: "Cart cleared",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Failed to clear cart",
    });
  }
};