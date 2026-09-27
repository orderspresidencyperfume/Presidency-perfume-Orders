import ProductBrowser from "../../components/ProductBrowser";
import { getProductsByGender } from "../../lib/products";

export default function WomenPage() {
  const products = getProductsByGender("Women");

  return <ProductBrowser products={products} eyebrow="The women’s edit" title="For her." description="Floral, warm and radiant expressions created to leave a beautiful trace." />;
}
