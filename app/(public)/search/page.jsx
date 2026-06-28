"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Star, SlidersHorizontal, X } from "lucide-react";

const sampleProducts = [
  { id: 1, name: "Wireless Headphones", price: 79.99, rating: 4.5, category: "Electronics" },
  { id: 2, name: "Smart Watch Pro", price: 199.99, rating: 4.8, category: "Electronics" },
  { id: 3, name: "Running Shoes", price: 129.99, rating: 4.3, category: "Sports" },
  { id: 4, name: "Laptop Backpack", price: 49.99, rating: 4.6, category: "Fashion" },
  { id: 5, name: "Bluetooth Speaker", price: 59.99, rating: 4.4, category: "Electronics" },
  { id: 6, name: "Fitness Tracker", price: 89.99, rating: 4.2, category: "Electronics" },
  { id: 7, name: "Premium Sunglasses", price: 149.99, rating: 4.7, category: "Fashion" },
  { id: 8, name: "Portable Charger", price: 34.99, rating: 4.1, category: "Electronics" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const results = query
    ? sampleProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Search Products
        </h1>
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search for products, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {query && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </p>
        </div>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-100">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500">{product.category}</p>
                <h3 className="font-medium text-sm text-gray-900 truncate group-hover:text-[#042A55]">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="font-bold text-[#042A55] mt-1 block">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-2">
            No results found for &quot;{query}&quot;
          </p>
          <p className="text-sm text-gray-400">
            Try different keywords or browse our{" "}
            <Link href="/shop" className="text-[#042A55] hover:underline">
              shop
            </Link>
          </p>
        </div>
      ) : (
        <div className="text-center py-16">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">
            Start typing to search for products
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["Headphones", "Watch", "Shoes", "Backpack"].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
