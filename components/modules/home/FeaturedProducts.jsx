import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";

const products = [
  { id: 1, name: "Wireless Headphones", price: 79.99, originalPrice: 99.99, badge: "Sale", category: "Electronics", rating: 4, reviews: 284 },
  { id: 2, name: "Smart Watch Pro", price: 199.99, badge: "New", category: "Electronics", rating: 5, reviews: 312 },
  { id: 3, name: "Running Shoes", price: 129.99, category: "Sports", rating: 4, reviews: 198 },
  { id: 4, name: "Laptop Backpack", price: 49.99, originalPrice: 69.99, badge: "Sale", category: "Fashion", rating: 4, reviews: 156 },
  { id: 5, name: "Bluetooth Speaker", price: 59.99, category: "Electronics", rating: 4, reviews: 176 },
  { id: 6, name: "Fitness Tracker", price: 89.99, originalPrice: 119.99, badge: "Trending", category: "Electronics", rating: 4, reviews: 143 },
  { id: 7, name: "Premium Sunglasses", price: 149.99, category: "Fashion", rating: 5, reviews: 98 },
  { id: 8, name: "Portable Charger", price: 34.99, badge: "New", category: "Electronics", rating: 4, reviews: 221 },
];

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Products</h2>
        <Link
          href="/shop"
          className="text-sm font-medium text-[#042A55] hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
