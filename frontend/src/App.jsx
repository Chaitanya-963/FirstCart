import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/CheckOut';
import Login from './pages/Login';
import Register from './pages/Register';
// NEW ADDITION: Import the verification handler screen
import VerifyOtp from './pages/VerifyOtp'; 
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';
import About from './pages/About';
import Disclaimer from './pages/Disclaimer';
import ReturnPolicy from './pages/ReturnPolicy';
import AdminDashboard from './admin/AdminDashboard';
import AddProduct from './admin/AddProduct';
import AdminProducts from './admin/AdminProducts';
import EditProduct from './admin/EditProduct';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from './admin/AdminUsers';

function App() {
  return (
    <Router>
      
      <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-600 selection:text-white">
        

        <Navbar />
        
        
        <main className="grow">
          <Routes>
            {/* Core Consumer Navigation Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* ROUTE: Crucial bridge step between registering accounts and logging in */}
            <Route path="/verify-otp" element={<VerifyOtp />} /> 
            
            <Route path="/profile" element={<Profile />} />
            <Route path="/ordersuccess" element={<OrderSuccess />} />
            <Route path="/about" element={<About />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/return" element={<ReturnPolicy />} />
            
            {/* Management Board Admin Administration Portals */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/edit-product/:id" element={<EditProduct />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Routes>
        </main>
        
        {/* Sticky Bottom Footer Summary Details Layout */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
