import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios"; // Centralized Axios interceptor instance

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/products");

        // Handle array mapping extraction variations safely based on backend response layout
        const allProducts = Array.isArray(response.data)
          ? response.data
          : response.data.products || [];

        // Slices the last 3 newly created/uploaded products from database to display as trending releases
        setTrendingProducts(allProducts.slice(-3).reverse());
      } catch (err) {
        console.error("Error fetching homepage dashboard nodes:", err);
        setError("Unable to sync trending metrics right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  // Isolated spotlight object reference node derived cleanly from the database array
  const spotlightProduct = trendingProducts[0] || null;

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen relative overflow-hidden">
      {/* Ambient Radial Background Glow Nodes (Maintains dark-theme symmetry) */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-150 h-150 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* 1. HERO BANNER SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <span className="inline-flex bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              🚀 2026 Tech Collection Launch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              Next-Gen Tech, <br />
              <span className="bg-linear-to-r from-blue-500 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
                Delivered First.
              </span>
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore unbeatable deals on premium smartphones, custom mechanical
              gear, audio gadgets, and premium workspace supplies.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/shop"
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-500/20 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Shop Catalog
              </Link>
              <a
                href="#trending"
                className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-0.5"
              >
                View Deals
              </a>
            </div>
          </div>

          {/* HERO ASSET SPOTLIGHT */}
          <div className="flex justify-center items-center relative">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              <div className="absolute -inset-1.5 bg-linear-to-r from-blue-500 to-teal-400 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>

              <div className="relative bg-zinc-900/90 backdrop-blur-md border border-zinc-800/80 rounded-3xl p-6 shadow-2xl">
                <div className="overflow-hidden rounded-2xl aspect-square bg-zinc-950 flex items-center justify-center border border-zinc-800/30 mb-5">
                  <img
                    src={
                      spotlightProduct?.image ||
                      spotlightProduct?.imageUrl ||
                      "https://unsplash.com"
                    }
                    alt={spotlightProduct?.name || "Spotlight product"}
                    className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase block mb-1">
                      Database Spotlight
                    </span>
                    <h3 className="text-white font-black text-xl tracking-tight line-clamp-1">
                      {spotlightProduct?.name || "FirstCart Flagship Node"}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Explore Next-Gen Specs
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-0.5">
                      Price
                    </span>
                    <span className="text-teal-400 font-black text-lg tracking-tight">
                      {spotlightProduct
                        ? `₹${Number(spotlightProduct.price).toLocaleString("en-IN")}`
                        : "₹0.00"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST MARKETING GRID BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-900 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg hover:border-zinc-800 transition-colors group">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h4 className="text-white font-bold mb-1.5 tracking-tight">
              Instant Delivery
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Free priority shipping across India regions dispatched securely.
            </p>
          </div>
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-900 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg hover:border-zinc-800 transition-colors group">
            <div className="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              🔒
            </div>
            <h4 className="text-white font-bold mb-1.5 tracking-tight">
              Razorpay Secured
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              100% encrypted sandbox payment validation node handshakes.
            </p>
          </div>
          <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-900 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg hover:border-zinc-800 transition-colors group">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
              📩
            </div>
            <h4 className="text-white font-bold mb-1.5 tracking-tight">
              Mailtrap Alerts
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Automated HTML system tracking invoices delivered inside your
              inbox.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TRENDING PRODUCTS CATALOG GRID */}
      <section
        id="trending"
        className="max-w-7xl mx-auto px-4 pb-24 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="flex justify-between items-end mb-10 border-b border-zinc-900/80 pb-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Trending Releases
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1.5">
              Our top-rated products updated live from your MongoDB collections
              database.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-sm text-blue-400 hover:text-blue-300 font-bold transition-colors flex items-center gap-1.5 group"
          >
            See All Catalog{" "}
            <span className="transform group-hover:translate-x-1 transition-transform">
              ➔
            </span>
          </Link>
        </div>

        {/* COMPONENT LOADING METRIC TRACKER STATE PANEL */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <span className="animate-spin h-7 w-7 border-3 border-blue-500 border-t-transparent rounded-full"></span>
            <p className="text-zinc-500 text-xs font-medium tracking-wide animate-pulse">
              Querying live inventory shards...
            </p>
          </div>
        )}

        {/* SYSTEM ERRORS FALLBACK WINDOW */}
        {error && !loading && (
          <div className="bg-red-950/40 border border-red-900/50 text-red-400 text-sm p-4 rounded-xl text-center max-w-md mx-auto shadow-md">
            ⚠️ {error}
          </div>
        )}

        {/* PRODUCT GRID MAP RENDER INTERFACE */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingProducts.length > 0 ? (
              trendingProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/60 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col group transform hover:-translate-y-1 shadow-xl"
                >
                  <div className="relative overflow-hidden aspect-video bg-zinc-950 flex items-center justify-center border-b border-zinc-800/40">
                    <img
                      src={
                        product.image ||
                        product.imageUrl ||
                        "https://unsplash.com"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    {product.category && (
                      <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md text-zinc-300 text-[11px] px-2.5 py-1 rounded-md font-bold border border-zinc-800 tracking-wide uppercase">
                        {product.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col grow space-y-4 justify-between">
                    <div className="space-y-1.5">
                      <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-blue-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed grow">
                        {product.description || "No descriptions attached."}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-zinc-800/60">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                          Price
                        </span>
                        <span className="text-white font-black text-lg tracking-tight">
                          ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <Link
                        to={`/product/${product._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm focus:outline-none"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              /* EMPTY RELEASES FALLBACK INTERFACE */
              <div className="text-center py-12 col-span-full border border-dashed border-zinc-800 rounded-2xl max-w-sm mx-auto text-zinc-500 text-sm">
                No database catalog files discovered yet. Use the admin portal
                to publish some!
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
