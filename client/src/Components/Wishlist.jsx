import { useSelector } from "react-redux";

import ProductCard from "../Components/ProductCard.jsx";

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold">Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <p className="text-lg text-gray-500">No products in wishlist</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map((item) => (
              <ProductCard
                key={item.product.id}
                product={item.product}
                mode="wishlist"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
