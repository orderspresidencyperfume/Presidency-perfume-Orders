"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  slug: string;
  name: string;
  image: string;
  size: string;
  unitPrice: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  removeItem: (slug: string, size: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "presidency-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed.filter(isCartItem));
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    total: items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    addItem(item, quantity = 1) {
      setItems((current) => {
        const existing = current.find((entry) => entry.slug === item.slug && entry.size === item.size);
        return existing
          ? current.map((entry) => entry === existing ? { ...entry, quantity: entry.quantity + quantity } : entry)
          : [...current, { ...item, quantity }];
      });
    },
    updateQuantity(slug, size, quantity) {
      setItems((current) => quantity < 1
        ? current.filter((item) => item.slug !== slug || item.size !== size)
        : current.map((item) => item.slug === slug && item.size === size ? { ...item, quantity } : item));
    },
    removeItem(slug, size) {
      setItems((current) => current.filter((item) => item.slug !== slug || item.size !== size));
    },
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.slug === "string" && typeof item.name === "string" && typeof item.image === "string" && typeof item.size === "string" && typeof item.unitPrice === "number" && Number.isFinite(item.unitPrice) && typeof item.quantity === "number" && Number.isInteger(item.quantity) && item.quantity > 0;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
