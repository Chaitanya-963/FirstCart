import  { useEffect, useState } from "react";
import API from "../api/axios"; 

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsersDirectory = async () => {
      try {
        setLoading(true);
        const res = await API.get("/api/auth/users");

        const userList =
          res.data?.data || (Array.isArray(res.data) ? res.data : []);
        setUsers(userList);
      } catch (err) {
        console.error("Error loading user matrix:", err);
        setError("Failed to fetch platform user directories.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersDirectory();
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 text-zinc-100">
      {/* HEADER SECTION */}
      <div className="border-b border-zinc-900 pb-5 mb-8">
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <span>👥</span> User Directory
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Review, trace, and audit registered administrator and consumer profile
          accounts.
        </p>
      </div>

      {/* STATE VIEW SEPARATORS */}
      {loading ? (
        <div className="flex items-center gap-3 py-20 justify-center text-zinc-500 text-sm">
          <span className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></span>
          Streaming account node vectors...
        </div>
      ) : error ? (
        <div className="bg-red-950/40 border border-red-900/50 text-red-400 text-sm p-4 rounded-xl text-center max-w-md mx-auto shadow-md">
          ⚠️ {error}
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl max-w-md mx-auto text-zinc-500 text-sm">
          No consumer user accounts discovered inside database records.
        </div>
      ) : (
        /* DATA TABLE DISPLAY FRAME */
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  <th className="px-6 py-4">User ID</th>
                  <th className="px-6 py-4">Profile Name</th>
                  <th className="px-6 py-4">Email Coordinates</th>
                  <th className="px-6 py-4">System Access Role</th>
                  <th className="px-6 py-4">Registration Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 bg-zinc-900/20 text-zinc-300">
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">
                      #{u._id}
                    </td>
                    <td className="px-6 py-4 font-bold text-white tracking-tight">
                      {u.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-400">
                      {u.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border ${
                          u.role === "admin"
                            ? "bg-blue-950/40 text-blue-400 border-blue-900/40"
                            : "bg-zinc-950/60 text-zinc-400 border-zinc-800"
                        }`}
                      >
                        {u.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-500 font-medium">
                      {new Date(u.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
