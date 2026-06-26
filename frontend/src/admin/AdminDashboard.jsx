import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; 

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/analytics");
        setStats(response.data);
      } catch (error) {
        console.error("Dashboard calculation link failure:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
        // Graceful error state reset data structures mapping
        setStats({
          totalOrders: 0,
          totalProducts: 0,
          totalUsers: 0,
          totalRevenue: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate]);

  if (!user || user.role !== "admin") return null;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 sm:px-6 lg:px-8 text-zinc-100">
      {/* HEADER MANAGEMENT LOGO TITLE PANEL */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-900 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <img
            src="/darkLogo.png" // FIXED: Branding sync
            alt="Logo"
            className="h-10 w-10 rounded-lg object-contain shadow-[0_0_15px_rgba(59,130,246,0.25)]"
          />
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Admin Control Hub
            </h2>
            <p className="text-zinc-500 text-sm mt-0.5">
              Welcome back,{" "}
              <span className="text-zinc-300 font-semibold">{user?.name}</span>
            </p>
          </div>
        </div>
      </div>

      {/* STATS METRIC GRID SYSTEM LAYOUT */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <span className="animate-spin h-7 w-7 border-3 border-blue-500 border-t-transparent rounded-full"></span>
          <p className="text-zinc-500 text-xs font-medium tracking-wide animate-pulse">
            Syncing store analytics metadata...
          </p>
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-zinc-900 border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-center items-center shadow-lg shadow-black/25">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Total Orders
            </h4>
            <div className="text-3xl font-black text-blue-500 tracking-tight">
              {stats.totalOrders}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-center items-center shadow-lg shadow-black/25">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Total Products
            </h4>
            <div className="text-3xl font-black text-teal-400 tracking-tight">
              {stats.totalProducts}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-center items-center shadow-lg shadow-black/25">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Total Users
            </h4>
            <div className="text-3xl font-black text-purple-400 tracking-tight">
              {stats.totalUsers}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800/80 p-6 rounded-2xl flex flex-col justify-center items-center shadow-lg shadow-black/25">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Total Revenue
            </h4>
            <div className="text-2xl font-black text-emerald-400 tracking-tight">
              ₹
              {Number(stats.totalRevenue || 0).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>
      ) : null}

      {/* ADMINISTRATIVE QUICK LINK PANEL SHORTCUTS */}
      <div className="mt-10 bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 mb-6 flex items-center gap-2">
          <span>🛠️</span> Administrative Sub-System Controls
        </h3>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/admin/add-product")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-900/10 transform hover:-translate-y-0.5 cursor-pointer"
          >
            ＋ Add New Product
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-600 text-xs font-bold px-5 py-3 rounded-xl transition-colors cursor-pointer"
          >
            📦 Manage Catalog Products
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-600 text-xs font-bold px-5 py-3 rounded-xl transition-colors cursor-pointer"
          >
            🚚 Monitor Shipping Orders
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-600 text-xs font-bold px-5 py-3 rounded-xl transition-colors cursor-pointer"
          >
            👥 System Users Directory
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
