import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col h-full group transform hover:-translate-y-1 shadow-lg shadow-black/40">
      
      {/* CARD IMAGE CONTAINER */}
      <div className="relative overflow-hidden aspect-square bg-zinc-950 flex items-center justify-center border-b border-zinc-800/40">
        <img 
          src={product.image || product.imageUrl || "https://placeholder.com"} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out" 
        />
        {/* Dynamic Category Overlay Badge */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md text-zinc-300 text-[11px] px-2.5 py-1 rounded-md font-medium border border-zinc-800 tracking-wide">
            {product.category}
          </span>
        )}
      </div>

      {/* CARD CONTENT BODY CONTAINER */}
      <div className="p-5 flex flex-col grow justify-between space-y-4">
        <div className="space-y-2">
          {/* Product Title with a safety line-clamp text cap constraint to avoid layout breaking */}
          <h3 className="text-white font-bold text-base tracking-tight group-hover:text-blue-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* BOTTOM ACCENT ACTION LAYER TRIGGER RE-ROUTES */}
        <div className="flex justify-between items-center pt-3 border-t border-zinc-800/50">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 font-medium">Price</span>
            <span className="text-white font-extrabold text-base tracking-tight">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
          </div>

          <Link 
            to={`/product/${product._id}`} 
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            View Details
          </Link>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
