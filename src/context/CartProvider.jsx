import { useState } from 'react';
import { CartContext } from './cart-context.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { useNavigate } from 'react-router'; // We will need this for routing later

export function CartProvider({ children }) {
  // Use localStorage instead of plain useState
  const [cart, setCart] = useLocalStorage('campus-eats-cart', []);
  const [orders, setOrders] = useLocalStorage('campus-eats-orders', []); // Part of B2 lab instructions

  const count = cart.reduce((total, line) => total + line.qty, 0);
  const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0);

  function addToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id);
      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        );
      } else {
        // MATRIC NUMBER ASSIGNMENT: note included
        return [...prevCart, { item, qty: 1, note: '' }];
      }
    });
  }

  function changeQty(itemId, delta) {
    setCart((prev) => {
      return prev
        .map((line) => line.item.id === itemId ? { ...line, qty: line.qty + delta } : line)
        .filter((line) => line.qty > 0);
    });
  }
  
  function changeNote(itemId, newNote) {
    setCart((prev) => 
      prev.map((line) => line.item.id === itemId ? { ...line, note: newNote } : line)
    )
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  }

  function placeOrder(details) {
    // Add the final order to the orders array
    setOrders((prev) => [...prev, { ...details, total, items: cart }]);
    setCart([]); // Clear cart
  }

  // Provide the values
  const value = {
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    changeNote,
    removeFromCart,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}