import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDataFields = async () => {
      try {
        const response = await API.get(`/api/products/${id}`);
        const data = response.data;

        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "",
          stock: data.stock || "",
        });
      } catch (err) {
        console.error(
          "Failed to load catalog modifications target profile:",
          err,
        );
        setError("Error tracing product item parameters data shards.");
      }
    };

    if (id) fetchProductDataFields();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    if (image) data.append("image", image);
    try {
      const response = await API.put(`/api/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Product updated successfully!");
        navigate("/admin/products");
      }
    } catch (err) {
      console.error("Modification pipeline failure:", err);
      setError(
        err.response?.data?.message ||
          "Error pushing database update parameters.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-[calc(100vh-140px)] px-4 py-12 sm:px-6 lg:px-8 text-zinc-300">
      {/* MODIFIER CARD WRAPPER CONTAINER */}
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl">
        {/* HEADER BAR TITLE */}
        <div className="border-b border-zinc-800 pb-4 mb-6">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>📝</span> Modify Product Specifications
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Update active inventory catalog values. Unchanged fields remain
            completely secure.
          </p>
        </div>

        {/* FEEDBACK ERROR CARDS */}
        {error && (
          <div className="mb-6 bg-red-950/40 border border-red-900/50 text-red-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* INTERFACE INPUT CAPTURE FORM ELEMENT */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Item Title Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="dark-input-field" // Reuses your clean index.css forms preset style rules!
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Hardware Details Sheet Description
            </label>
            <textarea
              required
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="dark-input-field resize-none"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Price (INR ₹)
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="dark-input-field"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Category Placement
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="dark-input-field"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Stock Allocation
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="dark-input-field"
                disabled={loading}
              />
            </div>
          </div>

          {/* DYNAMIC MEDIA REPLACEMENT ZONE DROPAREA */}
          <div className="p-5 border border-dashed border-zinc-800 bg-zinc-950/40 rounded-xl transition-all hover:border-zinc-700">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Replace Media Image Asset (Cloudinary Gateway Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-zinc-800 file:bg-zinc-950 file:text-zinc-300 file:text-xs file:font-semibold hover:file:bg-zinc-800 transition-all cursor-pointer file:cursor-pointer"
              disabled={loading}
            />
          </div>

          {/* DISPATCH CONTROL TRIGGER ACTIONS */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-blue-900/10 text-sm transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer pt-2"
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Synchronizing Database Modifications...
              </>
            ) : (
              "Save Configuration Updates"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
