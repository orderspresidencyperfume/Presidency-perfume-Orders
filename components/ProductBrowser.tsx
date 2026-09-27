"use client";

import { useMemo, useState } from "react";
import type { Product } from "../lib/products";
import ProductCard from "./ProductCard";

type Props = { products: Product[]; title: string; eyebrow: string; description: string };

export default function ProductBrowser({ products, title, eyebrow, description }: Props) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("All notes");
  const notes = ["All notes", ...Array.from(new Set(products.flatMap((product) => product.fragranceFamily))).sort()];
  const visible = useMemo(() => products.filter((product) => {
    const searchable = `${product.name} ${product.type} ${product.fragranceFamily.join(" ")}`.toLowerCase();
    return searchable.includes(query.toLowerCase()) && (family === "All notes" || product.fragranceFamily.includes(family));
  }), [products, query, family]);

  return <main className="catalog-page">
    <section className="catalog-heading container"><p className="mono-label">{eyebrow}</p><h1>{title}</h1><p>{description}</p></section>
    <section className="catalog-controls"><div className="container controls-inner"><label className="search-field"><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a fragrance" aria-label="Search fragrances" /></label><div className="filter-list" aria-label="Filter by fragrance family">{notes.map((note) => <button type="button" key={note} onClick={() => setFamily(note)} aria-pressed={family === note}>{note}</button>)}</div></div></section>
    <section className="container catalog-results"><div className="results-meta"><span>{visible.length} fragrances</span><span>Curated for your presence</span></div>{visible.length ? <div className="product-grid">{visible.map((product) => <ProductCard key={product.slug} product={product} />)}</div> : <p className="no-results">No fragrance matches that search.</p>}</section>
  </main>;
}
