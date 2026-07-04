import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";

const bestSellers = [
  { id: 2, name: "Smart Watch Pro", price: 199.99, category: "Electronics", rating: 5, reviews: 312 },
  { id: 1, name: "Wireless Headphones", price: 79.99, category: "Electronics", rating: 4, reviews: 284 },
  { id: 3, name: "Running Shoes", price: 129.99, category: "Sports", rating: 5, reviews: 198 },
  { id: 5, name: "Bluetooth Speaker", price: 59.99, category: "Electronics", rating: 4, reviews: 176 },
];

export default function BestSellers() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Best Sellers</h2>
        <Link
          href="/shop?sort=bestselling"
          className="text-sm font-medium text-[#042A55] hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
