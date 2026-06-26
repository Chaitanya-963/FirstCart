import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0 && qty <= (item.stock || 99)) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  // Safe numerical aggregation accumulator
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0,
  );

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium Glassmorphic Aesthetic Ambient Glow Nodes */}
      <div className="absolute top-1/4 right-1/4 w-100 h-100 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-100 h-100 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER BRANDING SECTION */}
        <div className="border-b border-zinc-900/80 pb-6 mb-10">
          <h1 className="text-3xl font-black text-white tracking-tight">
            Shopping Bag
          </h1>
          <p className="text-xs text-zinc-500 mt-1.5 uppercase tracking-wider font-semibold">
            Review and manage your pending{" "}
            <span className="text-blue-400 font-bold">FirstCart</span> checkout
            manifests.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* EMPTY STATE FALLBACK VIEW */
          <div className="text-center py-20 bg-zinc-900/20 border border-dashed border-zinc-900/60 rounded-3xl max-w-md mx-auto p-8 shadow-2xl">
            <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-2xl mx-auto mb-5 shadow-inner">
              🛒
            </div>
            <h3 className="text-white font-black text-xl tracking-tight">
              Your Cart is Empty
            </h3>
            <p className="text-xs text-zinc-500 px-4 mt-2 leading-relaxed">
              Looks like you haven't added any premium tech nodes to your basket
              collection yet.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-linear-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white text-xs font-bold px-6 py-3 rounded-xl mt-6 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-blue-500/10"
            >
              Discover Products
            </Link>
          </div>
        ) : (
          /* ACTIVE SHOPPING LIST LAYOUT */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* LEFT CONTAINER: CART ITEMS STREAM */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.productId || item._id}
                  className="bg-zinc-900/50 backdrop-blur-md border border-zinc-900/80 rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-6 items-center hover:border-zinc-800 transition-all duration-300 shadow-md group"
                >
                  {/* ITEM MEDIA CROP THUMBNAIL */}
                  <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-900/40 shrink-0 flex items-center justify-center shadow-inner relative">
                    <img
                      src={
                        item.image || item.imageUrl || "https://unsplash.com"
                      }
                      alt={item.name}
                      className="h-full w-full object-cover transform group-hover:scale-102 transition-transform duration-500"
                    />
                  </div>

                  {/* ITEM META DESCRIPTIONS COLUMN */}
                  <div className="grow grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="space-y-1">
                      <h4 className="text-white font-bold text-sm sm:text-base tracking-tight group-hover:text-blue-400 transition-colors line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-sm font-semibold bg-linear-to-r from-zinc-300 to-zinc-400 bg-clip-text text-transparent">
                        ₹{Number(item.price).toLocaleString("en-IN")}
                      </p>
                    </div>

                    {/* CONTROLS ROW SUB-GRID CONTAINER */}
                    <div className="flex sm:justify-end items-center gap-6 justify-between w-full">
                      {/* STEP INCREMENT MANIFEST SWITCH ROW */}
                      <div className="flex items-center bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-0.5 overflow-hidden shadow-inner">
                        <button
                          onClick={() => handleUpdateQty(item, item.qty - 1)}
                          className="h-8 w-8 text-zinc-500 hover:text-white font-bold text-center text-sm transition-colors cursor-pointer focus:outline-none"
                        >
                          －
                        </button>
                        <span className="w-8 text-center text-xs font-black text-white select-none">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => handleUpdateQty(item, item.qty + 1)}
                          className="h-8 w-8 text-zinc-500 hover:text-white font-bold text-center text-sm transition-colors cursor-pointer focus:outline-none"
                        >
                          ＋
                        </button>
                      </div>

                      {/* CLEAR DELETION ACTION BINDER */}
                      <button
                        onClick={() => handleRemove(item.productId || item._id)}
                        className="text-xs font-bold text-red-400/80 hover:text-red-400 bg-red-950/10 hover:bg-red-950/30 border border-red-900/30 hover:border-red-900/60 transition-all py-2 px-3.5 rounded-xl cursor-pointer focus:outline-none"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT CONTAINER: TRANSACTION CHECKOUT SUMMARY SUMMARY BOX */}
            <div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-900 rounded-2xl p-6 space-y-6 shadow-2xl sticky top-28">
              <h3 className="text-base font-bold text-white tracking-wider uppercase border-b border-zinc-800 pb-3">
                Order Summary
              </h3>

              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between text-zinc-400">
                  <span>Bag Quantity Total</span>
                  <span className="font-bold text-zinc-200">
                    {cartItems.length} Product(s)
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Priority Logistics</span>
                  <span className="text-teal-400 font-bold uppercase text-xs tracking-wider bg-teal-950/30 border border-teal-900/30 px-2 py-0.5 rounded-md">
                    Free
                  </span>
                </div>
                <div className="pt-4 border-t border-zinc-800 flex justify-between items-baseline">
                  <span className="font-bold text-zinc-300">Total Price</span>
                  <span className="text-2xl font-black bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* ACTION DISPATCH TRIGGER */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-blue-500/10 text-sm transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
              >
                <span>Proceed to Checkout</span> <span>➔</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
