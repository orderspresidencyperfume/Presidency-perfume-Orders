"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartProvider";

const navItems = [
  { label: "SHOP", href: "/shop" },
  { label: "MEN", href: "/men" },
  { label: "WOMEN", href: "/women" },
  { label: "UNISEX", href: "/unisex" },
  { label: "COLLECTIONS", href: "/collections" },
  { label: "ABOUT", href: "/about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <>
      <header className="site-header">
        <div className="announcement-bar">
          Orders are placed securely through WhatsApp
        </div>

        <div className="container">
          <div className="header-main">
            <div className="header-left">
              <button
                type="button"
                className="mobile-menu-toggle"
                onClick={() => setMobileOpen((value) => !value)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={19} /> : <Menu size={19} />}
              </button>

              <nav className="header-nav">
                {navItems.slice(0, 3).map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <Link href="/" aria-label="Presidency Perfumes">
              <Image
                src="/images/presidency-logo.png"
                alt="Presidency Perfumes"
                width={160}
                height={80}
                className="header-logo"
                priority
              />
            </Link>

            <div className="header-actions">
              <nav className="header-nav">
                {navItems.slice(3).map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>

              <Link
                href="/search"
                className="header-icon"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </Link>

              <Link
                href="/collections"
                className="header-icon"
                aria-label="Collections"
              >
                <Heart size={18} strokeWidth={1.5} />
              </Link>

              <Link
                href="/bag"
                className="header-icon header-bag"
                aria-label="Bag"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                <span className="header-bag-count">{itemCount}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-menu-panel">
          <nav className="mobile-menu-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="mobile-menu-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
