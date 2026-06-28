import Link from "next/link";
import { ArrowRight } from "lucide-react";

const bestSellers = [
  { id: 2, name: "Smart Watch Pro", price: 199.99, rank: 1, rating: 5, reviews: 312 },
  { id: 1, name: "Wireless Headphones", price: 79.99, rank: 2, rating: 4, reviews: 284 },
  { id: 3, name: "Running Shoes", price: 129.99, rank: 3, rating: 5, reviews: 198 },
  { id: 5, name: "Bluetooth Speaker", price: 59.99, rank: 4, rating: 4, reviews: 176 },
];

export default function BestSellers() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Best Sellers</h2>
        <Link
          href="/shop?sort=bestselling"
          className="text-sm font-medium text-[#042A55] hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bestSellers.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-square bg-gray-100">
              <span className="absolute top-2 left-2 z-10 text-xs font-semibold px-2 py-0.5 rounded bg-orange-500 text-white">
                #{product.rank} Best Seller
              </span>
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-gray-900 truncate group-hover:text-[#042A55] transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-xs ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}>
                    &#9733;
                  </span>
                ))}
                <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
              </div>
              <span className="font-bold text-[#042A55] mt-1 block">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
