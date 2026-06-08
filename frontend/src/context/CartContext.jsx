import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Automatically recalculate the dynamic order total whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // Function to add an item to the shopping cart
  const addToCart = (product) => {
    const itemExists = cartItems.find((x) => x._id === product._id);

    if (itemExists) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...itemExists, qty: itemExists.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  // Function to modify item quantities dynamically (plus/minus buttons)
  const updateQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(cartItems.map((item) => (item._id === id ? { ...item, qty } : item)));
  };

  // Function to delete an item entirely from the cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  // Function to clear out the cart completely after checkout simulation
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};