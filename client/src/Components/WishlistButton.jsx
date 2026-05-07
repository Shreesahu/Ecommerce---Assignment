import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist,} from "../ReduxSlice/user/wishlistSlice.js";
import { addWishlistAPI, removeWishlistAPI } from "../api/WishListAPICALL.js";

export default function WishlistButton({ product }) {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist);

  const isWishlisted = wishlistItems.some(
    (item) => item.product.id === product.id,
  );

  const handleWishlist = async (e) => {
    e.stopPropagation();

    try {
      if (isWishlisted) {
        await removeWishlistAPI(product.id);

        dispatch(removeFromWishlist(product.id));
      } else {
        await addWishlistAPI(product.id);

        dispatch(addToWishlist({ product }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleWishlist}
      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
        isWishlisted
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      {isWishlisted ? "Saved" : "Save"}
    </button>
  );
}
