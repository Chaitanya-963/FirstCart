import { useState, useEffect } from "react";
import API from "../api/axios"; // Centralized Axios interceptor instance
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filtering & Search local states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Categories list matching your backend database seeder setup
  const categories = [
    "All",
    "Electronics",
    "Accessories",
    "Mobiles",
    "Office Supplies",
  ];

  useEffect(() => {
    const fetchCatalogProducts = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/products");

        // Handle variations in array payload returns safely
        const productData = Array.isArray(response.data)
          ? response.data
          : response.data.products || [];
        setProducts(productData);
      } catch (err) {
        console.error("Catalog fetch error:", err);
        setError(
          "Could not connect to catalog index. Please check your database server.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogProducts();
  }, []);

  // FRONTEND FILTERING HANDSHAKE: Filters products instantly as the user types or clicks
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Radial Background Glow Nodes (Maintains layout alignment) */}
      <div className="absolute top-1/4 left-1/3 w-125 h-125 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-125 h-125 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* CATALOG HEADER BRANDING BANNER */}
        <div className="border-b border-zinc-900/80 pb-6">
          <h1 className="text-4xl font-black text-white tracking-tight">
            FirstCart{" "}
            <span className="bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Showcase
            </span>
          </h1>
          <p className="text-xs text-zinc-500 mt-1.5 uppercase tracking-wider font-semibold">
            Explore our high-performance full-stack inventory nodes.
          </p>
        </div>

        {/* CONTROLS HEADER BAR: SEARCH AND FILTER CONTROLS */}
        <div className="flex flex-col lg:flex-row gap-5 justify-between items-center backdrop-blur-md bg-zinc-900/40 p-5 border border-zinc-900/80 rounded-2xl shadow-xl">
          {/* Live Text Search input field */}
          <div className="w-full lg:w-96 relative group">
            <span className="absolute left-3.5 top-3.5 text-zinc-500 text-sm transition-colors group-hover:text-blue-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search premium tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dark-input-field pl-11 py-3 bg-zinc-950/50 hover:bg-zinc-950 transition-colors"
            />
          </div>

          {/* Responsive Category Selector Buttons list */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-start lg:justify-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all cursor-pointer tracking-wide ${
                  selectedCategory === category
                    ? "bg-linear-to-r from-blue-600 to-indigo-600 border-transparent text-white shadow-lg shadow-blue-500/20"
                    : "bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 hover:bg-zinc-850"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FEEDBACK STATE HANDLING WINDOWS */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <span className="animate-spin inline-block h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></span>
            <p className="text-zinc-500 text-xs font-medium tracking-wider uppercase animate-pulse">
              Syncing live inventory shards...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-950/40 border border-red-900/50 text-red-400 text-sm px-5 py-4 rounded-xl text-center max-w-xl mx-auto shadow-2xl">
            ⚠️ {error}
          </div>
        )}

        {/* ACTIVE DYNAMIC DATA PRODUCTS GRID */}
        {!loading && !error && (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty Search Query Fallback Container interface window */
              <div className="text-center py-20 bg-zinc-900/20 border border-dashed border-zinc-900/60 rounded-3xl max-w-md mx-auto p-8 shadow-2xl">
                <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl mx-auto mb-4 shadow-inner">
                  📦
                </div>
                <h3 className="text-white font-black text-lg tracking-tight">
                  No Items Matched
                </h3>
                <p className="text-xs text-zinc-500 px-4 mt-2 leading-relaxed">
                  We couldn't find anything matching "{searchQuery}" under{" "}
                  <span className="text-zinc-400 font-bold">
                    {selectedCategory}
                  </span>
                  . Try adjusting your parameters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
