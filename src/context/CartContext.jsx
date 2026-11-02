
import { createContext, useContext, useMemo, useState } from "react";

export const FREE_SHIPPING_AT = 150;

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product, options = {}) => {
    const qty = Math.max(1, Number(options.qty) || 1);
    const price = Number(product.price) || 0;

    const key = `${product.id}-${options.size ?? ""}-${options.color ?? ""}`;

    const newItem = {
      key,
      id: product.id,
      title: product.title,
      image: product.image,
      price,
      size: options.size,
      color: options.color,
      qty,
    };

    setItems((prev) => {
      const found = prev.find((item) => item.key === key);

      if (found) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }

      return [...prev, newItem];
    });

    setIsOpen(true);
  };

  const updateQty = (key, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) =>
            item.key === key
              ? { ...item, qty: Number(qty) }
              : item
          )
    );
  };

  const removeFromCart = (key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => setItems([]);

  const count = items.reduce((total, item) => total + item.qty, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const value = useMemo(
    () => ({
      items,
      isOpen,
      setIsOpen,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      count,
      subtotal,
    }),
    [items, isOpen, count, subtotal]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
