import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios"; 

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllSystemOrders = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/orders");

        const orderList =
          response.data?.orders ||
          (Array.isArray(response.data) ? response.data : []);
        setOrders(orderList);
      } catch (err) {
        console.error("Failed to fetch administrative logs:", err);
        setError("Error mapping system transaction arrays.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchAllSystemOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      const response = await API.put(`/api/orders/${id}/status`, { status });

      if (response.status === 200) {
        setOrders(
          orders.map((order) =>
            order._id === id ? { ...order, status } : order,
          ),
        );
      }
    } catch (err) {
      console.error("Status synchronization crash:", err);
      alert(
        err.response?.data?.message ||
          "Error updating target status constraints.",
      );
    }
  };

  // Color mapping presets matching structural order status rules cleanly
  const badgeStyles = {
    delivered: "text-emerald-400 bg-emerald-950/30 border-emerald-900/50",
    shipped: "text-blue-400 bg-blue-950/30 border-blue-900/50",
    cancelled: "text-red-400 bg-red-950/30 border-red-900/50",
    pending: "text-amber-400 bg-amber-950/30 border-amber-900/50",
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 text-zinc-100">
      {/* HEADER SECTION */}
      <div className="border-b border-zinc-900 pb-5 mb-8">
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <span>🚚</span> Manage Shipping Orders
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Monitor global store transactions and update tracking status tags
          live.
        </p>
      </div>

      {/* FEEDBACK SYSTEM CARD PANELS */}
      {loading ? (
        <div className="flex items-center gap-3 py-20 justify-center text-zinc-500 text-sm">
          <span className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></span>
          Streaming platform data rows...
        </div>
      ) : error ? (
        <div className="bg-red-950/40 border border-red-900/50 text-red-400 text-sm p-4 rounded-xl text-center max-w-md mx-auto shadow-md">
          ⚠️ {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl max-w-md mx-auto text-zinc-500 text-sm">
          No global system order records discovered inside database indices yet.
        </div>
      ) : (
        /* RESPONSIVE DATA TABLE CONTAINER ELEMENT WINDOW */
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Transaction Date</th>
                  <th className="px-6 py-4">Logistics Tracking Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 bg-zinc-900/20">
                {orders.map((order) => {
                  const normalizedStatus =
                    order.status?.toLowerCase() || "pending";
                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-zinc-800/30 transition-colors text-zinc-300"
                    >
                      {/* Shortened hex block view tracking number parameters */}
                      <td className="px-6 py-4 font-mono text-xs text-zinc-400 font-semibold tracking-wide">
                        #{order._id}
                      </td>

                      {/* FIXED: Swapped 'order.userId' tracking key over to 'order.user' to avoid null rendering crashes */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-sm">
                          {order.user?.name || "Anonymous Guest"}
                        </div>
                        <div className="text-xs text-zinc-500 mt-0.5">
                          {order.user?.email || "unlinked@profile.com"}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-extrabold text-white text-sm">
                        ₹
                        {Number(order.totalAmount || 0).toLocaleString(
                          "en-IN",
                          { minimumFractionDigits: 2 },
                        )}
                      </td>

                      <td className="px-6 py-4 text-xs text-zinc-400 font-medium">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </td>

                      <td className="px-6 py-4">
                        {/* FIXED: Standardized options parameters down to lowercase strings to suit backend validation rules */}
                        <div className="flex items-center gap-2">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateStatus(order._id, e.target.value)
                            }
                            className={`text-xs font-bold px-3 py-1.5 border rounded-xl outline-none transition-all cursor-pointer bg-zinc-950 text-center uppercase tracking-wider ${badgeStyles[normalizedStatus] || badgeStyles.pending}`}
                          >
                            <option
                              value="pending"
                              className="bg-zinc-900 text-amber-400 font-bold"
                            >
                              pending
                            </option>
                            <option
                              value="shipped"
                              className="bg-zinc-900 text-blue-400 font-bold"
                            >
                              shipped
                            </option>
                            <option
                              value="delivered"
                              className="bg-zinc-900 text-emerald-400 font-bold"
                            >
                              delivered
                            </option>
                            <option
                              value="cancelled"
                              className="bg-zinc-900 text-red-400 font-bold"
                            >
                              cancelled
                            </option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
