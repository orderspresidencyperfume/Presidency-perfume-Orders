"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../lib/products";
import { useCart } from "./CartProvider";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const startingPrice = Math.min(
    ...product.sizes.map((item) => item.price)
  );

  const { addItem } = useCart();
  const defaultSize = product.sizes[0];

  function handleAddToBag() {
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.images?.[0] ?? "",
      size: defaultSize.label,
      unitPrice: defaultSize.price,
    });
  }

  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`}>
        <div className="product-card-media">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={`${product.name} - Presidency Perfumes`}
              fill
              sizes="(max-width: 520px) 100vw, (max-width: 1050px) 50vw, 25vw"
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "#777",
              }}
            >
              IMAGE UNAVAILABLE
            </div>
          )}
        </div>

        <div className="product-card-meta">
          <div className="product-card-kicker">
            {product.collection === "inspired"
              ? `Inspired by ${product.inspiredBy ?? ""}`
              : "Presidency Signature"}
          </div>

          <h3 className="product-card-title">
            {product.name}
          </h3>

          <div className="product-card-subtitle">
            {product.fragranceFamily
              .slice(0, 3)
              .join(" · ")}
          </div>

          <div className="product-card-bottom">
            <span className="product-card-price">
              From ₹
              {startingPrice.toLocaleString("en-IN")}
            </span>

            <span className="product-card-link">
              View fragrance →
            </span>
          </div>
        </div>
      </Link>

      <button
        type="button"
        className="card-add-button"
        onClick={handleAddToBag}
      >
        Add to Bag
      </button>
    </article>
  );
}