import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WishlistButton from "../Components/WishlistButton.jsx";
import AddToCartButton from "../Components/AddToCartButton.jsx";
import { getSingleProductAPI } from "../api/productAPI";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await getSingleProductAPI(id);

      setProduct(response.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* IMAGE */}

        <div>
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* DETAILS */}

        <div className="p-10 flex flex-col justify-between">
          <div>
            <p className="text-gray-500 uppercase mb-3">{product.category}</p>

            <h1 className="text-4xl font-bold mb-6">{product.title}</h1>

            <p className="text-gray-600 leading-7 mb-8">
              {product.description}
            </p>

            <p
              className={`font-semibold mb-6 ${
                product.isSold ? "text-red-500" : "text-green-600"
              }`}
            >
              {product.isSold ? "Out Of Stock" : "In Stock"}
            </p>

            <h2 className="text-5xl font-bold">₹{product.price}</h2>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <AddToCartButton product={product} />

              <WishlistButton product={product} />
            </div>

            <div className="flex gap-3">
              {product.isSale && (
                <span className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                  Sale
                </span>
              )}

              {product.sold && (
                <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                  Sold
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
