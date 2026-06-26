import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // REAL APPLICATION STATES ROUTING HANDSHAKES
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems) || [];

  const isLoggedIn = !!user;
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  // Helper utility to apply active link indicators dynamically
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/70 border-b border-zinc-900/80 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* BRANDING LOGO */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-3 group relative"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {/* Subtle pulsing background logo glow filter layout */}
              <div className="absolute -inset-1 bg-linear-to-r from-blue-500/20 to-teal-500/20 rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-500"></div>

              <div className="relative p-2 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/darkLogo.png"
                  alt="FirstCart"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-lg tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                  First<span className="text-teal-400">Cart</span>
                </span>
                <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase mt-0.5">
                  NEXT-GEN TECH
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP NAVIGATION LINKS */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/shop"
              className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                isActive("/shop")
                  ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 border border-transparent"
              }`}
            >
              Shop Catalog
            </Link>

            {/* DYNAMIC CART CONTAINER ELEMENT LAYER */}
            <Link
              to="/cart"
              className={`px-4 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all flex items-center gap-2 relative ${
                isActive("/cart")
                  ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 border border-transparent"
              }`}
            >
              <span>🛒</span>
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-linear-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-black rounded-full h-5 px-1.5 flex items-center justify-center min-w-5 shadow-lg shadow-blue-500/30 scale-100 animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* RIGHT ACTION PROFILE SHELLS AREA */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4 bg-zinc-900/40 border border-zinc-900/80 p-1.5 pl-4 rounded-2xl">
                <div className="flex flex-col text-right">
                  <Link
                    to="/profile"
                    className="text-sm font-bold text-zinc-100 hover:text-teal-400 transition-colors"
                  >
                    {user?.name || "User"}
                  </Link>

                  {user?.role === "admin" ? (
                    <Link
                      to="/admin"
                      className="text-[10px] text-red-400 font-black uppercase tracking-wider hover:underline"
                    >
                      🛡️ System Admin
                    </Link>
                  ) : (
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                      Premium Member
                    </span>
                  )}
                </div>

                {/* Minimalist Profile Initials Avatar circle bubble asset */}
                <Link
                  to="/profile"
                  className="h-9 w-9 bg-zinc-800 border border-zinc-700/60 rounded-xl flex items-center justify-center font-bold text-sm text-blue-400 select-none hover:border-blue-500 transition-colors"
                >
                  {(user?.name || "U").substring(0, 2).toUpperCase()}
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-zinc-400 hover:text-white bg-zinc-800 hover:bg-red-950/40 hover:text-red-400 p-2.5 rounded-xl border border-zinc-800 hover:border-red-900/40 transition-all cursor-pointer focus:outline-none text-sm"
                  title="Logout Session"
                >
                  🚪
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-zinc-400 hover:text-white text-sm font-semibold tracking-wide px-4 py-2.5 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="relative group bg-linear-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transform hover:-translate-y-0.5 overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE INTERFACE BREAKPOINT METRICS HAMBURGER SWITCH TOGGLE */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-zinc-400 hover:text-blue-400 transition-all focus:outline-none cursor-pointer"
            >
              <span className="text-xl font-bold">
                {isMobileMenuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE COLLAPSIBLE DRAWER PANEL */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-900 px-4 py-6 space-y-4 shadow-2xl">
          <div className="space-y-1">
            <Link
              to="/shop"
              className={`block px-4 py-3 rounded-xl font-semibold text-sm ${isActive("/shop") ? "bg-blue-500/10 text-blue-400" : "text-zinc-400"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop Catalog
            </Link>
            <Link
              to="/cart"
              className={`px-4 py-3 rounded-xl font-semibold text-sm flex justify-between items-center ${isActive("/cart") ? "bg-blue-500/10 text-blue-400" : "text-zinc-400"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <span>🛒</span>
                <span>Cart Container</span>
              </div>
              {cartCount > 0 && (
                <span className="bg-blue-600 text-white text-xs font-black px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <div className="pt-4 border-t border-zinc-900">
            {isLoggedIn ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="h-9 w-9 bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center font-bold text-xs text-blue-400">
                    {(user?.name || "U").substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-200 font-bold text-sm">
                      {user?.name}
                    </span>
                    <span className="text-zinc-500 text-xs uppercase font-semibold tracking-wider">
                      {user?.role} Profile
                    </span>
                  </div>
                </div>

                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block w-full text-center bg-red-950/40 text-red-400 border border-red-900/50 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    🛡️ System Admin Panel
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold py-3 rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Logout Session
                </button>
              </div>
            ) : (
              /* FIXED: Re-injected the missing fallback colon separator here to fix the syntax crash */
              <div className="grid grid-cols-2 gap-3 px-2">
                <Link
                  to="/login"
                  className="w-full text-center text-zinc-400 hover:text-white font-semibold py-3 border border-zinc-800 rounded-xl text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center bg-blue-600 text-white font-bold py-3 rounded-xl text-sm shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
