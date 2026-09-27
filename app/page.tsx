import Image from "next/image";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { getInspiredProducts, getSignatureProducts } from "../lib/products";

export default function HomePage() {
  const inspiredProducts = getInspiredProducts();
  const signatureProducts = getSignatureProducts();
  return <main className="page-shell">
    <div className="editorial-grid" aria-hidden="true"><i /><i /><i /><i /></div>
    <section className="hero">
      <Image src="/perfumes/VANILLA RAPTURE/1.webp" alt="Vanilla Rapture perfume by Presidency" fill priority sizes="100vw" className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-content container"><div className="hero-copy"><div className="eyebrow line-label">Presidency Perfumes / Est. 2024</div><h1 className="hero-title">Wear your<br /><em>presence.</em></h1><p className="hero-description">Distinctive fragrances made for the rituals, moments and memories that become your signature.</p><Link href="/shop" className="button-primary"><span className="button-fill" /><span>Explore fragrances</span></Link></div><span className="hero-edition">A fragrance journal<br />Vol. 01</span><div className="hero-scroll">Scroll to discover <span /></div></div>
    </section>
    <section className="intro-section section"><div className="container intro-layout"><div className="eyebrow">The Presidency Way</div><p className="intro-copy"><span className="drop-cap">W</span>e believe fragrance should feel personal. An atmosphere that arrives before you speak, and stays a little after you leave.</p><Link href="/about" className="text-link">Read our story <span>→</span></Link></div></section>
    <section className="category-strip" aria-label="Shop by collection">
      <Link href="/men" className="category-tile category-men"><span className="category-number">01</span><div className="category-tile-content"><div className="eyebrow">Collection</div><h3>For him.</h3><span>Discover collection →</span></div></Link>
      <Link href="/women" className="category-tile category-women"><span className="category-number">02</span><div className="category-tile-content"><div className="eyebrow">Collection</div><h3>For her.</h3><span>Discover collection →</span></div></Link>
      <Link href="/unisex" className="category-tile category-unisex"><span className="category-number">03</span><div className="category-tile-content"><div className="eyebrow">Collection</div><h3>For all.</h3><span>Discover collection →</span></div></Link>
    </section>
    <section className="section collection-section"><div className="container"><div className="section-heading"><div><div className="eyebrow line-label">The Collection</div><h2 className="section-title">Inspired <em>expressions.</em></h2></div><p className="section-copy">Beloved olfactive profiles, interpreted in the distinctive language of Presidency.</p><Link href="/collections/inspired-fragrances" className="text-link">View all <span>→</span></Link></div><div className="product-grid">{inspiredProducts.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section>
    <section className="editorial-feature"><div className="feature-image-wrap"><Image src="/perfumes/OCEAN/1.webp" alt="Ocean perfume by Presidency" fill sizes="(max-width: 780px) 100vw, 52vw" className="feature-image" /><span className="vertical-label">The art of atmosphere</span></div><div className="editorial-copy"><div className="eyebrow line-label">A considered ritual</div><h2>Fragrance becomes<br /><em>presence.</em></h2><p>Each composition is created to become part of your everyday language: quiet, memorable and entirely yours.</p><Link href="/about" className="button-secondary">Discover our story</Link></div></section>
    <section className="section collection-section signature-section"><div className="container"><div className="section-heading"><div><div className="eyebrow line-label">Presidency Originals</div><h2 className="section-title">Signature <em>scents.</em></h2></div><p className="section-copy">Original blends for a refined, lasting impression.</p><Link href="/collections/presidency-signatures" className="text-link">Explore all <span>→</span></Link></div><div className="product-grid">{signatureProducts.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section>
    <section className="final-cta"><div className="container"><div className="eyebrow line-label">Find your fragrance</div><h2>Your next<br /><em>signature</em> awaits.</h2><p>Explore a world of scents made to leave an impression.</p><Link href="/shop" className="button-primary"><span className="button-fill" /><span>Shop all fragrances</span></Link></div></section>
  </main>;
}
