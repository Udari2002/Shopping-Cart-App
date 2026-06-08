import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = ({ onCartClick }) => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Pull the logged-in user details out of local browser storage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // Handle logging out cleanly by clearing local records and redirecting home
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // Calculate the sum total of individual items inside the cart array
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Main Logo Application Title Links Back Home */}
          <Link to="/" className="text-2xl font-bold text-green-600 tracking-wide flex items-center">
            🍏 <span className="ml-2 text-gray-800 font-extrabold text-xl">FreshCart</span>
          </Link>

          {/* Right Navigation Actions Control Pane */}
          <div className="flex items-center space-x-6">
            
            {/* Dynamic Interactive Shopping Cart Button Badge Icon */}
            <button 
              onClick={onCartClick} 
              className="relative p-2 text-gray-600 hover:text-green-600 transition-colors duration-200 focus:outline-none"
            >
              <span className="text-2xl">🛒</span>
              {totalCartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1 -translate-y-1 animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Authentication Condition Handling Status Display */}
            {userInfo ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full">
                  👤 {userInfo.name}
                </span>
                <button
                  onClick={logoutHandler}
                  className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg shadow transition-all"
              >
                Sign In
              </Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;