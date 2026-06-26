import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900/80 text-zinc-400 mt-auto relative overflow-hidden">
      {/* Background Decorative Blur Node (Enforces premium tech theme symmetry) */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        {/* UPPER GRID CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-16">
          {/* COLUMN 1: BRAND LOGO & MOTTO */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/darkLogo.png"
                  alt="FirstCart Logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <span className="text-white font-black text-xl tracking-tight">
                First<span className="text-teal-400">Cart</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed antialiased">
              Your ultimate gateway to next-gen electronics, luxury hardware
              arrays, and automated workstation gear. Engineered for reliable
              full-stack deployment.
            </p>
          </div>

          {/* COLUMN 2: QUICK SHOP LINK ACCESSIBILITY */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-5 border-l-2 border-blue-500 pl-3">
              Shop Categories
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link
                  to="/shop?category=Mobiles"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 text-xs">
                    ➔
                  </span>{" "}
                  Mobiles & Phones
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=Electronics"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 text-xs">
                    ➔
                  </span>{" "}
                  High-End Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=Accessories"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 text-xs">
                    ➔
                  </span>{" "}
                  Premium Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=Office"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 text-xs">
                    ➔
                  </span>{" "}
                  Office Workstations
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: CORPORATE ASSISTANCE POLICIES */}
          <div>
            <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-5 border-l-2 border-teal-400 pl-3">
              Platform & Legal
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link
                  to="/profile"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 text-xs">
                    ➔
                  </span>{" "}
                  Order Verification Tracker
                </Link>
              </li>
              <li>
                <Link
                  to="/return"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 text-xs">
                    ➔
                  </span>{" "}
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 text-xs">
                    ➔
                  </span>{" "}
                  Legal System Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 group"
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 text-xs">
                    ➔
                  </span>{" "}
                  Meet the Developer
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: FUTURISTIC NEWSLETTER JOIN AREA */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase border-l-2 border-indigo-500 pl-3">
              Stay in the Loop
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Subscribe to unlock flash launch updates and cryptographic token
              discount alerts.
            </p>
            <form
              className="flex relative max-w-sm mt-2 group"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Enter workspace email"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-16"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white font-bold px-3 text-xs rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* LOWER SECTION: COPYRIGHT METADATA & COMPLIANCE BADGES */}
        <div className="mt-16 pt-8 border-t border-zinc-900/80 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start space-y-1 text-center md:text-left">
            <p className="text-xs text-zinc-600">
              &copy; {new Date().getFullYear()} FirstCart Inc. All rights
              reserved.
            </p>
            <p className="text-[10px] text-zinc-700 font-semibold tracking-wider uppercase">
              MERN Stack Architecture Performance Sandbox
            </p>
          </div>

          {/* PAYMENTS SECURITY TRUST CHANNELOVERLAYS */}
          <div className="flex items-center gap-4 bg-zinc-900/40 border border-zinc-900/60 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest text-zinc-600 uppercase select-none">
            <span className="hover:text-zinc-500 transition-colors">Visa</span>
            <span className="text-zinc-800">•</span>
            <span className="hover:text-zinc-500 transition-colors">
              Mastercard
            </span>
            <span className="text-zinc-800">•</span>
            <span className="text-blue-500/80 tracking-normal font-sans">
              Razorpay Secure
            </span>
            <span className="text-zinc-800">•</span>
            <span className="hover:text-zinc-500 transition-colors">
              UPI Node
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
