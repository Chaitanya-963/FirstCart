import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios'; 

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        const res = await API.get('/api/orders/myorder');
        const orderList = res.data?.orders || (Array.isArray(res.data) ? res.data : []);
        setOrders(orderList);
      } catch (error) {
        console.error("Order profile link failed:", error);
        if (error.response?.status === 401) {
          logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchMyOrders();
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  // Modern status badge configuration maps
  const statusStyles = {
    delivered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    shipped: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  };

  // Derive metric configurations from state data values securely
  const completedOrdersCount = orders.filter(o => o.status?.toLowerCase() === 'delivered').length;
  const totalInvestedAmount = orders.reduce((acc, o) => acc + (o.status?.toLowerCase() !== 'cancelled' ? Number(o.totalAmount || 0) : 0), 0);

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Ambient Cyberpunk Radial Lighting Shards */}
      <div className="absolute top-1/4 left-1/4 w-100 h-100 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* UPPER SUMMARY GRID SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* USER MAIN METRICS CARD HEADER */}
          <div className="lg:col-span-2 backdrop-blur-md bg-zinc-900/40 border border-zinc-900 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl">
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Dynamic linear Avatar Core Frame */}
              <div className="h-16 w-16 rounded-2xl bg-linear-to-tr from-blue-600 to-teal-400 p-0.5 shadow-lg shadow-blue-500/10 shrink-0 flex items-center justify-center font-black text-xl text-white select-none">
                <div className="bg-zinc-950 w-full h-full rounded-[14px] flex items-center justify-center font-black tracking-wide text-transparent bg-clip-text bg-linear-to-tr from-blue-400 to-teal-400">
                  {(user?.name || "U").substring(0, 2).toUpperCase()}
                </div>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-white tracking-tight">{user?.name}</h2>
                <p className="text-xs text-zinc-500 font-semibold tracking-wider font-mono">{user?.email}</p>
                <span className="inline-flex bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider mt-1.5">
                  Node role: {user?.role || 'user'}
                </span>
              </div>
            </div>

            <button 
              onClick={handleLogout} 
              className="w-full sm:w-auto bg-zinc-900 hover:bg-red-950/40 border border-zinc-800 hover:border-red-900/40 text-zinc-400 hover:text-red-400 font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer focus:outline-none shadow-inner"
            >
              Logout Session
            </button>
          </div>

          {/* DYNAMIC ANALYTICS MINI STATS MATRICES CARD */}
          <div className="bg-zinc-900/60 border border-zinc-900 rounded-3xl p-6 flex justify-around lg:flex-col lg:justify-between lg:space-y-4 shadow-xl">
            <div>
              <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest block mb-0.5">Total Expenses</span>
              <span className="text-2xl font-black text-white tracking-tight">
                ₹{totalInvestedAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="lg:border-t lg:border-zinc-800/60 lg:pt-3">
              <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest block mb-0.5">Orders Cleared</span>
              <span className="text-2xl font-black text-blue-400 tracking-tight">
                {completedOrdersCount} <span className="text-zinc-600 font-medium text-xs">/ {orders.length} total</span>
              </span>
            </div>
          </div>

        </div>

        {/* DASHBOARD TRANSACTION TRACKING HISTORY LIST AREA */}
        <div className="space-y-5">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 pl-1">
            <span>📦</span> Order History logs
          </h3>
          
          {loading ? (
            <div className="flex items-center gap-3 py-16 justify-center text-zinc-500 text-xs uppercase font-bold tracking-widest">
              <span className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></span>
              Mapping local order shards...
            </div>
          ) : orders.length === 0 ? (
            /* EMPTY RECORD STATE INTERFACE BOX DROP */
            <div className="bg-zinc-900/20 border border-dashed border-zinc-900 rounded-3xl p-12 text-center max-w-md mx-auto shadow-xl">
              <div className="h-12 w-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4 text-lg shadow-inner select-none">🧾</div>
              <p className="text-zinc-500 text-xs font-semibold px-4 leading-relaxed mb-4">You haven't checked out any marketplace transactions yet.</p>
              <Link to="/shop" className="inline-block bg-linear-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5">
                Go to Store Catalog
              </Link>
            </div>
          ) : (
            /* ACTIVE DATA STREAM CARDS sub-grid wrapper */
            <div className="grid grid-cols-1 gap-4 animate-fade-in">
              {orders.map(order => {
                const currentStatus = order.status?.toLowerCase() || 'pending';
                return (
                  <div 
                    key={order._id} 
                    className="backdrop-blur-md bg-zinc-900/30 border border-zinc-900/80 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-zinc-800 transition-all duration-300 shadow-md group"
                  >
                    <div className="space-y-1.5 text-xs sm:text-sm text-zinc-400">
                      <p className="font-bold text-zinc-500">
                        Order ID: <span className="text-white font-mono font-medium tracking-wide">#{order._id}</span>
                      </p>
                      <div className="flex gap-4 text-zinc-500 font-medium text-2xs uppercase tracking-wider">
                        <p>Placed: <span className="text-zinc-300 font-sans font-normal lowercase">{new Date(order.createdAt).toLocaleDateString('en-IN')}</span></p>
                        <p>Items: <span className="text-zinc-300 font-sans font-normal">{order.items?.length || 1} unit(s)</span></p>
                      </div>
                      <p className="text-zinc-500 font-bold pt-1 flex items-baseline gap-1">
                        Total Checkout Amount: 
                        <strong className="text-white text-base font-black tracking-tight group-hover:text-blue-400 transition-colors">
                          ₹{Number(order.totalAmount).toLocaleString('en-IN')}
                        </strong>
                      </p>
                    </div>
                    
                    <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-zinc-900 pt-3 sm:pt-0">
                      <span className={`inline-block border text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider ${statusStyles[currentStatus] || statusStyles.pending}`}>
                        ● {order.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
