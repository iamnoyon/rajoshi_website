"use client";

import Link from "next/link";
import { Heart, Trash2, ShoppingCart } from "lucide-react";

const wishlistItems = [
  { id: 3, name: "Running Shoes", price: 129.99, category: "Sports" },
  { id: 7, name: "Premium Sunglasses", price: 149.99, category: "Fashion" },
  { id: 10, name: "Coffee Maker", price: 89.99, category: "Home & Living" },
];

export default function WishlistPage() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Heart size={20} className="text-[#042A55]" />
        <h2 className="text-lg font-bold text-gray-900">My Wishlist</h2>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#042A55] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#063C76] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border border-gray-200 rounded-lg p-4"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.id}`}
                  className="font-medium text-gray-900 hover:text-[#042A55] transition-colors"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-gray-500">{item.category}</p>
                <p className="font-bold text-[#042A55] mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="p-2 bg-[#042A55] text-white rounded-lg hover:bg-[#063C76] transition-colors">
                  <ShoppingCart size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
