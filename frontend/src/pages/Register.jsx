import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FIXED: Destructured registerUser from our updated context configuration
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // FIXED: Swapped out raw fetch blocks for the centralized context handler
      const result = await registerUser(name, email, password);

      if (result.success) {
        // FLOW CORRECTION: Send unverified accounts to type the Mailtrap 6-digit code!
        navigate("/verify-otp", { state: { email } }); // Passes the email state into the next window
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during account creation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        {/* LOGO TITLE SECTION */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Create Account
          </h2>
          <p className="text-zinc-500 text-sm mt-2">
            Join FirstCart to explore high-end electronics.
          </p>
        </div>

        {/* ERROR BOX FEEDBACK CONTAINER */}
        {error && (
          <div className="mb-6 bg-red-950/40 border border-red-900/50 text-red-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* INTERFACE INPUT FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Alex Morgan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="dark-input-field" // Reuses your clean index.css form styles!
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="dark-input-field"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Secure Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="dark-input-field"
              disabled={isSubmitting}
              required
            />
          </div>

          {/* ACTION BUTTON TRIGGER CONTROL */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors shadow-md shadow-blue-900/10 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-sm flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Creating Profile...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {/* REDIRECTION ACCESSIBILITY LINKS */}
          <div className="text-center pt-4 border-t border-zinc-800/60 text-sm">
            <p className="text-zinc-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
