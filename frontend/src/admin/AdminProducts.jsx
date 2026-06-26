import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios'; 

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllCatalogItems = async () => {
      try {
        setLoading(true);
        const response = await API.get('/api/products');
        
        const productData = Array.isArray(response.data) ? response.data : response.data.products || [];
        setProducts(productData);
      } catch (err) {
        console.error("Error fetching administrative inventory logs:", err);
        setError('Failed to fetch store catalog arrays.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllCatalogItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you strictly sure you want to remove this product from the database catalog?')) {
      try {
        const response = await API.delete(`/api/products/${id}`);
        
        if (response.status === 200 || response.status === 204) {
          setProducts(products.filter(p => p._id !== id));
        }
      } catch (err) {
        console.error("Deletion task execution exception error:", err);
        alert(err.response?.data?.message || 'Error deleting target data record entry.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8 text-zinc-100">
      
      {/* HEADER CONTROLS SECTION */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-900 pb-5 mb-8">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>📦</span> Manage Catalog Products
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Maintain inventory stock allocations, update data profiles, or clear invalid system entries.
          </p>
        </div>
        
        <Link 
          to="/admin/add-product" 
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-900/10 text-center transform hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
        >
          ＋ Add New Product
        </Link>
      </div>

      {/* FEEDBACK STATE LAYOUTS */}
      {loading ? (
        <div className="flex items-center gap-3 py-20 justify-center text-zinc-500 text-sm">
          <span className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></span>
          Streaming catalog inventory tables...
        </div>
      ) : error ? (
        <div className="bg-red-950/40 border border-red-900/50 text-red-400 text-sm p-4 rounded-xl text-center max-w-md mx-auto shadow-md">
          ⚠️ {error}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl max-w-md mx-auto text-zinc-500 text-sm">
          No inventory products found inside database indices yet. Click above to add one.
        </div>
      ) : (
        /* RESPONSIVE ADMINISTRATIVE DATA LIST TABLE CONTAINER WINDOW */
        <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Hex ID</th>
                  <th className="px-6 py-4">Item Name</th>
                  <th className="px-6 py-4">Price Matrix</th>
                  <th className="px-6 py-4">Category Group</th>
                  <th className="px-6 py-4">Stock Units Available</th>
                  <th className="px-6 py-4 text-center">Action Handlers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 bg-zinc-900/20">
                {products.map(product => (
                  <tr key={product._id} className="hover:bg-zinc-800/30 transition-colors text-zinc-300">
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">
                      #{product._id}
                    </td>
                    
                    <td className="px-6 py-4 font-bold text-white tracking-tight max-w-xs truncate">
                      {product.name}
                    </td>
                    
                    <td className="px-6 py-4 font-semibold text-zinc-200">
                      ₹{Number(product.price || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className="bg-zinc-950/60 border border-zinc-800 text-zinc-400 text-[11px] px-2.5 py-1 rounded-md font-medium tracking-wide">
                        {product.category || 'General'}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      {product.stock > 0 ? (
                        <span className="text-emerald-400 font-bold text-xs bg-emerald-950/20 border border-emerald-900/30 px-2 py-0.5 rounded-md">
                          {product.stock} Left
                        </span>
                      ) : (
                        <span className="text-red-400 font-bold text-xs bg-red-950/20 border border-red-900/30 px-2 py-0.5 rounded-md">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <Link 
                          to={`/admin/edit-product/${product._id}`} 
                          className="bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-900/40 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer"
                        >
                          Modify
                        </Link>
                        <button 
                          onClick={() => handleDelete(product._id)} 
                          className="bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white border border-red-900/40 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
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

export default AdminProducts;
