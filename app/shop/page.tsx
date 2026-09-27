import ProductBrowser from "../../components/ProductBrowser";
import { products } from "../../lib/products";

export default function ShopPage() {
  return <ProductBrowser products={products} eyebrow="The complete archive" title="All fragrances." description="Explore the complete Presidency collection, filtered by the notes that speak to you." />;
}
