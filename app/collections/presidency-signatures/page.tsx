import ProductBrowser from "../../../components/ProductBrowser";
import { getSignatureProducts } from "../../../lib/products";

export default function PresidencySignaturesPage() {
  const products = getSignatureProducts();

  return <ProductBrowser products={products} eyebrow="Collection 02" title="Presidency signatures." description="Original scents with a character that belongs distinctly to Presidency." />;
}
