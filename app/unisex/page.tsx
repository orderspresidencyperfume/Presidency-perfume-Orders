import ProductBrowser from "../../components/ProductBrowser";
import { getProductsByGender } from "../../lib/products";

export default function UnisexPage() {
  const products = getProductsByGender("Unisex");

  return <ProductBrowser products={products} eyebrow="The unisex edit" title="For all." description="A fluid collection of scents chosen without rules or labels." />;
}
