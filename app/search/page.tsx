import ProductBrowser from "../../components/ProductBrowser";
import { products } from "../../lib/products";
export default function SearchPage(){return <ProductBrowser products={products} eyebrow="Search the archive" title="Find your scent." description="Search by fragrance name, type or note family."/>}
