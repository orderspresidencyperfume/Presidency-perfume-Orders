"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export default function BagContents() {
  const { items, itemCount, total, updateQuantity, removeItem } = useCart();
  function buyOnWhatsApp() {
    if (!whatsappNumber || !/^\d{8,15}$/.test(whatsappNumber) || !items.length) return;
    const lines = items.flatMap((item, index) => [
      `${index + 1}. ${item.name}`,
      `   Size: ${item.size}`,
      `   Quantity: ${item.quantity}`,
      `   Subtotal: ${money(item.unitPrice * item.quantity)}`,
    ]);
    const message = ["Hello Presidency Perfumes,", "", "I would like to order the following perfumes:", "", ...lines, "", `Total: ${money(total)}`, "", "Please confirm my order."].join("\n");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  if (!items.length) return <main className="empty-page"><div className="container"><p className="mono-label">Your bag</p><h1>Begin with a<br /><em>signature.</em></h1><p>Your selected fragrances will appear here. Browse the collection and place your final order directly on WhatsApp.</p><Link href="/shop" className="button-primary">Explore fragrances →</Link></div></main>;

  return <main className="bag-page"><div className="container"><div className="bag-heading"><p className="mono-label">Your bag / {itemCount} items</p><h1>Selected<br /><em>fragrances.</em></h1></div><div className="bag-layout"><section className="bag-items">{items.map((item) => <article className="bag-item" key={`${item.slug}-${item.size}`}><div className="bag-item-image"><Image src={item.image} alt={item.name} fill sizes="120px" /></div><div><p className="mono-label">{item.size}</p><h2>{item.name}</h2><p>{money(item.unitPrice)} each</p><div className="bag-quantity"><button type="button" onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)} aria-label={`Decrease ${item.name}`}><Minus size={15} /></button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)} aria-label={`Increase ${item.name}`}><Plus size={15} /></button></div></div><div className="bag-item-end"><strong>{money(item.unitPrice * item.quantity)}</strong><button type="button" onClick={() => removeItem(item.slug, item.size)} aria-label={`Remove ${item.name}`}><Trash2 size={16} /></button></div></article>)}</section><aside className="bag-summary"><p className="mono-label">Order summary</p><div><span>Items</span><span>{itemCount}</span></div><div className="bag-total"><strong>Total</strong><strong>{money(total)}</strong></div><button type="button" className="button-primary" onClick={buyOnWhatsApp}>Buy on WhatsApp →</button><p>Payment is arranged directly with Presidency Perfumes on WhatsApp.</p></aside></div></div></main>;
}
