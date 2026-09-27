import ProductBrowser from "../../../components/ProductBrowser";
import { getInspiredProducts } from "../../../lib/products";

export default function InspiredFragrancesPage() {
  const products = getInspiredProducts();

  return <ProductBrowser products={products} eyebrow="Collection 01" title="Inspired fragrances." description="Familiar olfactive moods retold through Presidency bottles and imagery." />;
}
