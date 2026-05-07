import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import ProductCard from "../Components/ProductCard.jsx";
import Filter from "../Components/Filter.jsx";

import { initializeWishlist } from "../Utils/initializeWishlist.js";
import { initializeCart } from "../Utils/initializeCart.js";

import { getProductsAPI, searchProductsAPI, filterProductsAPI,} from "../api/productAPI.js";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(1000);

  const isFetching = useRef(false);

  const dispatch = useDispatch();

  const LIMIT = 10;

  // FETCH PRODUCTS

  const fetchProducts = async () => {

    if (isFetching.current || loading || !hasMore) return;

    try {

      isFetching.current = true;
      setLoading(true);

      const response = await getProductsAPI(cursor, LIMIT);

      const newProducts = response.Product;
      const nextCursor = response.cursor;

      setProducts((prev) => [...prev, ...newProducts]);

      setCursor(nextCursor);

      if (nextCursor === null) setHasMore(false);

    } catch (error) {

      console.log(error);

    } finally {

      isFetching.current = false;
      setLoading(false);
    }
  };

  // SEARCH PRODUCTS

  const handleSearch = async (searchText) => {

    const trimmedSearch = searchText.trim();

    if (
      trimmedSearch === "" &&
      !selectedCategory &&
      priceRange === 1000
    ) {

      setProducts([]);
      setCursor(null);
      setHasMore(true);

      isFetching.current = false;

      return;
    }

    try {

      setLoading(true);

      const response = await searchProductsAPI(trimmedSearch);

      setProducts(response.data);

      setHasMore(false);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // FILTER PRODUCTS

  const handleFilterProducts = async () => {

    try {

      setLoading(true);

      const response = await filterProductsAPI(
        selectedCategory,
        priceRange
      );

      setProducts(response.products);

      setHasMore(false);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // INITIAL FETCH

  useEffect(() => {

    if (products.length === 0) {
      fetchProducts();
    }

    initializeWishlist(dispatch);
    initializeCart(dispatch);

  }, []);

  // AUTO FETCH

  useEffect(() => {

    if (
      search.trim() === "" &&
      !selectedCategory &&
      priceRange === 1000 &&
      products.length === 0 &&
      hasMore
    ) {

      fetchProducts();
    }

  }, [search, selectedCategory, priceRange, products, hasMore]);

  // SEARCH DEBOUNCE

  useEffect(() => {

    const timer = setTimeout(() => {
      handleSearch(search);
    }, 500);

    return () => clearTimeout(timer);

  }, [search]);

  // FILTER

  useEffect(() => {

    if (selectedCategory || priceRange !== 1000) {
      handleFilterProducts();
    }

  }, [selectedCategory, priceRange]);

  // INFINITE SCROLL

  useEffect(() => {

    const handleScroll = () => {

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight + 200 >= fullHeight) {

        if (search.trim() === "") {
          fetchProducts();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [cursor, loading, hasMore, search]);

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

        {/* FILTER */}

        <div>

          <Filter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-8">

          {/* SEARCH */}

          <div className="flex w-full overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products by title..."
              className="flex-1 px-5 py-3 text-sm outline-none"
            />

            <button
              onClick={() => handleSearch(search)}
              className="bg-black px-6 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Search
            </button>

          </div>

          {/* PRODUCTS */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {products.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
                mode="home"
              />

            ))}

          </div>

          {/* LOADING */}

          {loading && (
            <div className="mt-10 text-center text-xl">
              Loading Products...
            </div>
          )}

          {/* NO PRODUCTS */}

          {!loading && products.length === 0 && (
            <div className="mt-10 text-center text-gray-500">
              No products found
            </div>
          )}

          {/* END MESSAGE */}

          {!hasMore && search.trim() === "" && (
            <div className="mt-10 text-center text-gray-500">
              No more products available
            </div>
          )}

        </div>

      </div>

    </div>
  );
}