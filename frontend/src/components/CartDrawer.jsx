import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, totalPrice, updateQty, removeFromCart, clearCart } = useContext(CartContext);

  // If the drawer state is closed, do not render anything on the screen
  if (!isOpen) return null;

  const handleCheckoutSimulation = () => {
    alert(`🎉 Order Simulated Successfully!\nTotal Amount: $${totalPrice.toFixed(2)}\nThank you for shopping with FreshCart!`);
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark semi-transparent backdrop overlay background */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col justify-between animate-slide-in">
          
          {/* Drawer Header Layout Panel */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <span>🛒 Your Cart</span>
              <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 font-bold text-2xl focus:outline-none"
            >
              ✕
            </button>
          </div>

          {/* Core Interactive Selection Items Scroll List Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 flex flex-col items-center justify-center h-full">
                <span className="text-5xl mb-3">🛍️</span>
                <p className="text-gray-500 font-medium">Your shopping cart is empty.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item._id} 
                  className="flex items-center justify-between border-b border-gray-50 pb-4"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                  />
                  <div className="flex-1 min-w-0 ml-4">
                    <h4 className="text-sm font-bold text-gray-800 truncate">{item.name}</h4>
                    <p className="text-xs text-gray-400 mb-1">{item.category}</p>
                    <span className="text-sm font-extrabold text-gray-900">${(item.price * item.qty).toFixed(2)}</span>
                  </div>

                  {/* Quantity Dynamic Incrementor Modifiers Panel */}
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button 
                        onClick={() => updateQty(item._id, item.qty - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-200 font-semibold transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-bold text-gray-800">{item.qty}</span>
                      <button 
                        onClick={() => updateQty(item._id, item.qty + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-200 font-semibold transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Running Calculation Total Footer Payment Checkout Panel */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-gray-500">Subtotal Order Total:</span>
                <span className="text-2xl font-black text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckoutSimulation}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-98 text-center block"
              >
                Proceed to Checkout
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;