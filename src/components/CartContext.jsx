
import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext(null);

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() =>
    readStorage('myntra-cart', [])
  );

  const [wishlist, setWishlist] = useState(() =>
    readStorage('myntra-wishlist', [])
  );

  // Save cart and wishlist after changes
  useEffect(() => {
    localStorage.setItem('myntra-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('myntra-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add a product or increase its quantity
  function handleCart(product) {
    if (!product || product.id == null) return;

    setCart((prevCart) => {
      const exists = prevCart.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  }

  // Increase quantity
  function handleIncrease(productId) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  // Decrease quantity; remove item if quantity reaches zero
  function handleDelete(productId) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove product completely
  function removeFromCart(productId) {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  }

  // Wishlist toggle
  function toggleWishlist(product) {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some(
        (item) => item.id === product.id
      );

      return exists
        ? prevWishlist.filter((item) => item.id !== product.id)
        : [...prevWishlist, product];
    });
  }

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        handleCart,
        handleIncrease,
        handleDelete,
        removeFromCart,
        toggleWishlist,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
