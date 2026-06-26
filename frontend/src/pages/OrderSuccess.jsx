import { useState } from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  
  const [mockTrackingId] = useState(() => {
    return `FC-${Math.floor(100000 + Math.random() * 900000)}`;
  });

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-zinc-950 px-4 py-12">
      
      {/* CENTRAL COMPONENT CARD CONTAINER */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
        
        {/* SUCCESS ICON HEADER ANIMATION */}
        <div className="mb-6 relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl scale-120 animate-pulse"></div>
          <div className="relative h-20 w-20 bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-4xl rounded-full flex items-center justify-center shadow-lg shadow-emerald-950/40">
            🎉
          </div>
        </div>

        {/* FEEDBACK STATUS TEXT */}
        <div className="space-y-2 mb-6">
          <h2 className="text-3xl font-black text-white tracking-tight">
            Order Confirmed!
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
            Thank you for shopping with us! Your invoice and verification layout have been dispatched to your Mailtrap inbox dashboard.
          </p>
        </div>

        {/* METADATA TRACKING ID BOX */}
        <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 mb-8 flex flex-col items-center justify-center space-y-1">
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            Mock Reference Tracking Number
          </span>
          <span className="text-blue-400 font-mono font-bold text-base tracking-wider">
            {mockTrackingId}
          </span>
        </div>

        {/* DIRECTION ACTION ROUTING LINK BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            to="/profile" 
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-semibold py-3 rounded-xl border border-zinc-700 transition-colors text-center shadow-sm cursor-pointer"
          >
            Track Orders
          </Link>
          
          <Link 
            to="/shop" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-900/20 transform hover:-translate-y-0.5 text-center cursor-pointer"
          >
            Continue Shopping
          </Link>
        </div>

        {/* LOWER BRAND FOOTER ANCHOR */}
        <div className="mt-8 pt-5 border-t border-zinc-800/50 flex justify-center items-center gap-1.5 text-zinc-600 text-xs font-semibold uppercase tracking-wider">
          <span>🔒</span> Razorpay Secure Node Verification
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
