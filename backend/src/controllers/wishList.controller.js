import { addToWishlistService, removeFromWishlistService, getWishlistService } from "../services/wishlist.service.js";


export const getWishlistController = async (req, res) => {
  try {
    const userId = req.dbUser.id;

    const wishlist = await getWishlistService({ userId });
    console.log(wishlist , "wishlist")
    return res.json({ success: true, wishlist });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

export const addToWishlistController = async (req, res) => {
  try {
    const userId = req.dbUser.id;
    const { productId } = req.body;

    const result = await addToWishlistService({ userId, productId });

    return res.json({ success: true, result });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

export const removeFromWishlistController = async (req, res) => {
  try {
    const userId = req.dbUser.id;
    const productId = parseInt(req.params.productId);

    const result = await removeFromWishlistService({ userId, productId });

    return res.json({ success: true, result });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to remove from wishlist" });
  }
};


