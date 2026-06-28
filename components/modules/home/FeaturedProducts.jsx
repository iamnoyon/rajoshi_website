import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  { id: 1, name: "Wireless Headphones", price: 79.99, originalPrice: 99.99, badge: "Sale" },
  { id: 2, name: "Smart Watch Pro", price: 199.99, badge: "New" },
  { id: 3, name: "Running Shoes", price: 129.99 },
  { id: 4, name: "Laptop Backpack", price: 49.99, originalPrice: 69.99, badge: "Sale" },
  { id: 5, name: "Bluetooth Speaker", price: 59.99 },
  { id: 6, name: "Fitness Tracker", price: 89.99, originalPrice: 119.99, badge: "Trending" },
  { id: 7, name: "Premium Sunglasses", price: 149.99 },
  { id: 8, name: "Portable Charger", price: 34.99, badge: "New" },
];

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
        <Link
          href="/shop"
          className="text-sm font-medium text-[#042A55] hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-square bg-gray-100">
              {product.badge && (
                <span
                  className={`absolute top-2 left-2 z-10 text-xs font-semibold px-2 py-0.5 rounded ${
                    product.badge === "Sale"
                      ? "bg-red-500 text-white"
                      : product.badge === "New"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {product.badge}
                </span>
              )}
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-gray-900 truncate group-hover:text-[#042A55] transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-[#042A55]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
