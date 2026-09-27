import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <Image
              src="/images/presidency-logo.png"
              alt="Presidency Perfumes"
              width={160}
              height={80}
              className="footer-logo"
            />

            <p className="footer-description">
              Discover a refined world of fragrances from Presidency Perfumes,
              created for every mood, moment and memory.
            </p>
          </div>

          {/* Shop */}
          <div>
            <div className="footer-column-title">Shop</div>

            <div className="footer-links">
              <Link href="/shop">All Fragrances</Link>
              <Link href="/men">Men</Link>
              <Link href="/women">Women</Link>
              <Link href="/unisex">Unisex</Link>
            </div>
          </div>

          {/* Collections */}
          <div>
            <div className="footer-column-title">Collections</div>

            <div className="footer-links">
              <Link href="/collections/inspired-fragrances">
                Inspired Fragrances
              </Link>

              <Link href="/collections/presidency-signatures">
                Presidency Signatures
              </Link>

              <Link href="/about">About Presidency</Link>
            </div>
          </div>

          {/* Customer */}
          <div>
            <div className="footer-column-title">Customer</div>

            <div className="footer-links">
              <Link href="/bag">Bag</Link>
              <Link href="/search">Search</Link>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Presidency Perfumes
          </span>

          <span>
            Orders placed through WhatsApp
          </span>
        </div>
      </div>
    </footer>
  );
}