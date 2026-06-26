import  { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmailOtp } = useContext(AuthContext);

  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  
  // FIXED: Initialized the error state conditionally based on the initial value 
  // instead of changing it inside a separate useEffect loop
  const [error, setError] = useState(!location.state?.email ? 'Please provide your registered email address along with the 6-digit OTP.' : '');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const result = await verifyEmailOtp(email, otp);

      if (result.success) {
        setSuccess('Email verified successfully! Redirecting to login screen...');
        setTimeout(() => {
          navigate('/login');
        }, 2500); 
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error(err);
      setError('Connection to security server timed out. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        
        {/* LOGO HEADER LAYOUT SECTION */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-950 text-blue-400 border border-blue-900 mb-4 text-xl">
            ✉️
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Verify Your Email
          </h2>
          <p className="text-zinc-500 text-sm mt-2">
            We sent a 6-digit verification code to your Mailtrap inbox dashboard.
          </p>
        </div>

        {/* FEEDBACK SYSTEM MESSAGE CARDS */}
        {error && (
          <div className="mb-6 bg-red-950/40 border border-red-900/50 text-red-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="mb-6 bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
            <span>✅</span> {success}
          </div>
        )}

        {/* INTERFACE ACTION INPUT FORMS */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Email Coordinates
            </label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value);
                // Clear the default manual entry prompt if the user types an email
                if (e.target.value) setError('');
              }} 
              className="dark-input-field" 
              disabled={isSubmitting || location.state?.email} 
              required 
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 flex justify-between">
              <span>One-Time Password (OTP)</span>
              <span className="text-blue-400 text-xs normal-case tracking-normal">6-digit number</span>
            </label>
            <input 
              type="text" 
              maxLength="6"
              pattern="\d{6}"
              placeholder="123456" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
              className="dark-input-field text-center tracking-[10px] text-lg font-bold" 
              disabled={isSubmitting}
              required 
            />
          </div>

          {/* SYSTEM INTERACTION ACTION BUTTON */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors shadow-md shadow-blue-900/10 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-sm flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Validating Security Hash...
              </>
            ) : (
              'Verify Account'
            )}
          </button>

          <div className="text-center pt-4 border-t border-zinc-800/60 text-sm">
            <p className="text-zinc-500">
              Didn't receive the code?{' '}
              <Link to="/login" className="text-zinc-400 hover:text-zinc-300 font-semibold transition-colors">
                Back to Login
              </Link>
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

export default VerifyOtp;
