import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Home from './views/Home';
import Login from './views/Login';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
          
          {/* Main App Navigation Header Area Layout */}
          <Navbar onCartClick={() => setIsCartOpen(true)} />

          {/* Slide-out Persistent Global Shopping Cart Overlays */}
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

          {/* Dynamic Core Route View Ports Switching Context Area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>

          {/* Clean Academic Application Footer Layout Standard */}
          <footer className="bg-white border-t border-gray-100 text-center py-4 text-xs font-semibold text-gray-400">
            © {new Date().getFullYear()} FreshCart Mart System. All Rights Reserved.
          </footer>

        </div>
      </Router>
    </CartProvider>
  );
}

export default App;