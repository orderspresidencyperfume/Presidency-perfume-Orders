"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import type { Product } from "../lib/products";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

type Props = {
  product: Product;
};

export default function ProductDetail({ product }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = product.sizes[selectedSize];

  const total = useMemo(() => {
    return selectedVariant.price * quantity;
  }, [selectedVariant.price, quantity]);

  function orderOnWhatsApp() {
    if (!WHATSAPP_NUMBER || !/^\d{8,15}$/.test(WHATSAPP_NUMBER)) {
      console.error("Missing or invalid NEXT_PUBLIC_WHATSAPP_NUMBER configuration");
      return;
    }
    const message = [
      "Hello Presidency Perfumes,",
      "",
      `I would like to order ${product.name}.`,
      `Size: ${selectedVariant.label}`,
      `Quantity: ${quantity}`,
      `Total: ₹${total.toLocaleString("en-IN")}`,
      "",
      "Please confirm my order.",
    ].join("\n");

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="product-detail">
      <div className="container">

        {/* Breadcrumb */}
        <div className="kicker" style={{ marginBottom: "28px" }}>
          <Link href="/">Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <Link href="/shop">Shop</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-detail-layout">

          {/* ================= GALLERY ================= */}
          <div className="product-gallery">

            <div className="product-gallery-main">
              <Image
                src={product.images[selectedImage]}
                alt={`${product.name} - Presidency Perfumes`}
                fill
                priority
                sizes="(max-width: 780px) 100vw, 58vw"
              />
            </div>

            <div className="product-gallery-thumbs">
              {product.images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`product-thumb ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View product image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt=""
                    width={84}
                    height={84}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ================= PRODUCT INFO ================= */}
          <div className="product-info">

            {product.inspiredBy ? (
              <div className="product-inspired">
                Inspired by {product.inspiredBy}
              </div>
            ) : (
              <div className="product-inspired">
                Presidency Signature
              </div>
            )}

            <h1>{product.name}</h1>

            <div className="product-short-copy">
              {product.description}
            </div>

            <div className="product-price">
              ₹{selectedVariant.price.toLocaleString("en-IN")}
            </div>

            {/* Sizes */}
            <div>
              <div className="variant-label">
                Select size
              </div>

              <div className="variant-row">
                {product.sizes.map((size, index) => (
                  <button
                    key={size.label}
                    type="button"
                    className={`variant-button ${
                      selectedSize === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize(index)}
                  >
                    {size.label} · ₹
                    {size.price.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div style={{ marginTop: "28px" }}>
              <div className="variant-label">
                Quantity
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  className="header-icon"
                  style={{
                    border: "1px solid rgba(20,20,20,.2)",
                  }}
                  onClick={() =>
                    setQuantity((value) => Math.max(1, value - 1))
                  }
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <span
                  style={{
                    minWidth: "48px",
                    height: "38px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTop: "1px solid rgba(20,20,20,.2)",
                    borderBottom:
                      "1px solid rgba(20,20,20,.2)",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "12px",
                  }}
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  className="header-icon"
                  style={{
                    border: "1px solid rgba(20,20,20,.2)",
                  }}
                  onClick={() =>
                    setQuantity((value) => value + 1)
                  }
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="product-actions">
              <button
                type="button"
                className="button-primary"
                onClick={() => {
                  alert(
                    `${product.name} — ${selectedVariant.label} added to your bag.`
                  );
                }}
              >
                Add to Bag
              </button>

              <button
                type="button"
                className="button-secondary"
                onClick={orderOnWhatsApp}
              >
                Buy on WhatsApp
              </button>
            </div>

            <div className="product-note">
              Online payment is not available. Orders are placed
              directly through WhatsApp.
            </div>

            {/* Information */}
            <div className="accordion-list">

              <details className="accordion-item" open>
                <summary className="accordion-trigger">
                  <span>Product Description</span>
                  <span>+</span>
                </summary>

                <div className="accordion-content">
                  {product.description}
                </div>
              </details>

              <details className="accordion-item">
                <summary className="accordion-trigger">
                  <span>Scent Story</span>
                  <span>+</span>
                </summary>

                <div className="accordion-content">
                  {product.scentStory}
                </div>
              </details>

              <details className="accordion-item">
                <summary className="accordion-trigger">
                  <span>Fragrance Notes</span>
                  <span>+</span>
                </summary>

                <div className="accordion-content">
                  <div className="note-grid">

                    <div className="note-box">
                      <strong>Top Notes</strong>
                      <span>
                        {product.notes.top.join(" · ")}
                      </span>
                    </div>

                    <div className="note-box">
                      <strong>Heart Notes</strong>
                      <span>
                        {product.notes.heart.join(" · ")}
                      </span>
                    </div>

                    <div className="note-box">
                      <strong>Base Notes</strong>
                      <span>
                        {product.notes.base.join(" · ")}
                      </span>
                    </div>

                  </div>
                </div>
              </details>

              <details className="accordion-item">
                <summary className="accordion-trigger">
                  <span>When to Wear</span>
                  <span>+</span>
                </summary>

                <div className="accordion-content">
                  {product.whenToWear.join(" · ")}
                </div>
              </details>

              <details className="accordion-item">
                <summary className="accordion-trigger">
                  <span>How to Use</span>
                  <span>+</span>
                </summary>

                <div className="accordion-content">
                  {product.howToUse}
                </div>
              </details>

              <details className="accordion-item">
                <summary className="accordion-trigger">
                  <span>Fragrance Character</span>
                  <span>+</span>
                </summary>

                <div className="accordion-content">
                  {product.fragranceFamily.join(" · ")}
                </div>
              </details>

              {product.inspiredBy && (
                <details className="accordion-item">
                  <summary className="accordion-trigger">
                    <span>Inspired By</span>
                    <span>+</span>
                  </summary>

                  <div className="accordion-content">
                    {product.inspiredBy}
                  </div>
                </details>
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
