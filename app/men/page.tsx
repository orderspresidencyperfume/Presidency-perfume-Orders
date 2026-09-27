import ProductBrowser from "../../components/ProductBrowser";
import { getProductsByGender } from "../../lib/products";

export default function MenPage() {
  const products = getProductsByGender("Men");

  return <ProductBrowser products={products} eyebrow="The men’s edit" title="For him." description="Fresh, aromatic and warm expressions for every part of the day." />;
}
