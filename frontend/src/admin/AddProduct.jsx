import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
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

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!image)
      return setError("Please select a product thumbnail image to upload.");

    setLoading(true);

    // Construct standard binary form body payload wrapper objects
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("image", image);

    try {
      const response = await API.post("/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Product created successfully with Cloudinary Image URL!");
        navigate("/shop");
      }
    } catch (err) {
      console.error("Product upload exception:", err);
      setError(
        err.response?.data?.message ||
          "Error processing product file media uploads.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-[calc(100vh-140px)] px-4 py-12 sm:px-6 lg:px-8 text-zinc-300">
      {/* CARD FORM CONTAINER */}
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl">
        {/* HEADER BRAND TITLE */}
        <div className="border-b border-zinc-800 pb-4 mb-6">
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>📦</span> Add New Product Node
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Publish a new inventory entry. Media elements upload straight to
            your cloud Cloudinary buckets.
          </p>
        </div>

        {/* FEEDBACK SYSTEM ERROR PANEL */}
        {error && (
          <div className="mb-6 bg-red-950/40 border border-red-900/50 text-red-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2 animate-pulse">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* DATA CAPTURE INPUT FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Product Identifier Title
            </label>
            <input
              type="text"
              placeholder="e.g. Samsung Galaxy S25 Ultra"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="dark-input-field" // Reuses your clean index.css forms preset!
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Specification Description Overview
            </label>
            <textarea
              placeholder="Provide a comprehensive technical product summary layout parameters..."
              required
              rows="4"
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
                placeholder="119999"
                required
                min="0"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="dark-input-field"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Category Group
              </label>
              <input
                type="text"
                placeholder="e.g. Mobiles"
                required
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="dark-input-field"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Stock Quantity Allocation
              </label>
              <input
                type="number"
                placeholder="15"
                required
                min="0"
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="dark-input-field"
                disabled={loading}
              />
            </div>
          </div>

          {/* UPLOAD FILE CONTAINER DROP ZONE */}
          <div className="p-5 border border-dashed border-blue-900/50 bg-blue-950/5 rounded-xl transition-all hover:bg-blue-950/10">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Upload Product Thumbnail (Cloudinary Gateway)
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-xs text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-zinc-700 file:bg-zinc-800 file:text-zinc-200 file:text-xs file:font-semibold hover:file:bg-zinc-700 transition-all cursor-pointer file:cursor-pointer"
              disabled={loading}
            />
          </div>

          {/* SUBMIT TRIGGERS BUTTONS CONTROLS */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-blue-900/10 text-sm transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Streaming Asset to Cloudinary Bucket...
              </>
            ) : (
              "Publish Product to FirstCart"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
