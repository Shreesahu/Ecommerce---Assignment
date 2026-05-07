import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard.jsx";
import { getMostBoughtProductsAPI } from "../api/mostBoughtAPICall.js";

export default function MostBoughtProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMostBoughtProducts = async () => {
    try {
      setLoading(true);
      const data = await getMostBoughtProductsAPI();
      console.log(data, "most bought products");
      setProducts(data.products);

    } catch (error) {
      console.error(error);
      setError("Failed to fetch products");
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMostBoughtProducts();
  }, []);

  if (loading) {
    return <div className="mt-10 text-center text-2xl">Loading...</div>;
  }

  if (error) {
    return <div className="mt-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Most Bought Products
          </h1>

          <p className="mt-2 text-gray-600">
            Top purchased products by customers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item) => (
            <ProductCard
              key={item.product.id}
              product={item.product}
              totalSold={item.totalSold}
              mode="home"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
