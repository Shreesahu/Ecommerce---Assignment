export default function Filter({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
}) {

  const categories = [
    "Electronics",
    "Fashion",
    "Furniture",
    "Home Appliances",
  ];

  return (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="mb-3 text-lg font-semibold">
          Categories
        </h2>

        <div className="flex flex-wrap gap-3">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(
                  category === selectedCategory
                    ? ""
                    : category
                )
              }
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>

          ))}

        </div>
      </div>

      <div>

        <div className="mb-3 flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            Price Range
          </h2>

          <span className="font-medium text-gray-700">
            ₹0 - ₹{priceRange}
          </span>

        </div>

        <input
          type="range"
          min="0"
          max="1000"
          step="50"
          value={priceRange}
          onChange={(e) =>
            setPriceRange(Number(e.target.value))
          }
          className="w-full"
        />

      </div>

    </div>
  );
}