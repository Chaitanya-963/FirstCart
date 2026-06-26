import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import API from "../api/axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Product detail fetch error:", err);
        setError(
          "Failed to load product details. It may have been removed from inventory.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "inc" && quantity < (product?.stock || 5)) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      // Small intentional latency buffer to preserve realistic dashboard animations feel
      await new Promise((resolve) => setTimeout(resolve, 300));

      dispatch(
        addToCart({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image || product.imageUrl,
          qty: quantity,
          stock: product.stock,
        }),
      );

      navigate("/cart");
    } catch (err) {
      console.error("Redux dispatch exception handler failure:", err);
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] bg-zinc-950 text-zinc-100 space-y-4">
        <span className="animate-spin inline-block h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></span>
        <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase animate-pulse">
          Assembling asset specifications...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
        <div className="text-center py-12 bg-zinc-900 border border-zinc-800/80 rounded-3xl max-w-md w-full px-6 shadow-2xl">
          <span className="text-4xl block mb-3">⚠️</span>
          <h3 className="text-white font-black text-xl tracking-tight">
            Product Unavailable
          </h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            {error || "Product records could not be traced."}
          </p>
          <Link
            to="/shop"
            className="inline-block bg-linear-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-6 py-3 rounded-xl mt-6 transition-all shadow-md"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium Sci-Fi Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-125 h-125 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* BREADCRUMB ROUTING BACK LINKS */}
        <div className="mb-8">
          <Link
            to="/shop"
            className="text-xs font-bold text-zinc-500 hover:text-blue-400 uppercase tracking-widest transition-colors flex items-center gap-2 w-fit group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">
              ⬅️
            </span>{" "}
            Back to Shop Catalog
          </Link>
        </div>

        {/* PRIMARY LAYOUT MATRIX CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start backdrop-blur-md bg-zinc-900/30 border border-zinc-900/80 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
          {/* LEFT CONTAINER LAYER: PRODUCT IMAGE MEDIA FRAME */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/60 flex items-center justify-center group shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10"></div>
            <img
              src={product.image || product.imageUrl || "https://unsplash.com"}
              alt={product.name}
              className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            {product.category && (
              <span className="absolute top-4 left-4 bg-zinc-950/90 backdrop-blur-md text-zinc-300 text-[10px] font-black px-3 py-1.5 rounded-lg border border-zinc-800 tracking-widest uppercase">
                {product.category}
              </span>
            )}
          </div>

          {/* RIGHT CONTAINER LAYER: SPECIFICATIONS AND PURCHASING CONTROLS */}
          <div className="space-y-8 lg:py-4">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                {product.stock > 0 ? (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                    ● In Stock — {product.stock} Units Available
                  </span>
                ) : (
                  <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                    ✕ Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* HIGH CONTRAST PRICE BOX MATRIX */}
            <div className="p-5 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl flex flex-col justify-center shadow-inner">
              <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">
                Total Valuation Matrix
              </span>
              <span className="text-3xl font-black text-white tracking-tight">
                ₹
                {Number(product.price).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                Product Summary Specifications
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed antialiased">
                {product.description ||
                  "No supplemental hardware data sheets have been furnished for this catalog record profile instance yet."}
              </p>
            </div>

            {/* PURCHASING BUTTON HANDSHAKES */}
            {product.stock > 0 && (
              <div className="space-y-5 pt-6 border-t border-zinc-900">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    Quantity:
                  </span>

                  {/* QUANTITY PICKER ROW SELECTOR */}
                  <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1 shadow-inner overflow-hidden">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange("dec")}
                      disabled={quantity <= 1 || isAdding}
                      className="h-9 w-9 text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed font-black text-center text-sm transition-colors cursor-pointer focus:outline-none"
                    >
                      －
                    </button>
                    <span className="w-10 text-center font-black text-white text-sm select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange("inc")}
                      disabled={quantity >= product.stock || isAdding}
                      className="h-9 w-9 text-zinc-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed font-black text-center text-sm transition-colors cursor-pointer focus:outline-none"
                    >
                      ＋
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-blue-500/10 transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
                >
                  {isAdding ? (
                    <>Syncing Bag Shards...</>
                  ) : (
                    <>
                      <span>🛒</span> Add to Shopping Bag
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
