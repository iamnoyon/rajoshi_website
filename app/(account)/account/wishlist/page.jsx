"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Heart, Trash2, ShoppingCart, Star } from "lucide-react";
import products from "@/data/products.json";
import { getWishlistIds, removeFromWishlist, onWishlistUpdate } from "@/utils/wishlist";

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    setWishlistIds(getWishlistIds());
    return onWishlistUpdate(() => setWishlistIds(getWishlistIds()));
  }, []);

  const handleRemove = useCallback((id) => {
    removeFromWishlist(id);
  }, []);

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Heart size={20} className="fill-red-500 text-red-500" />
        <h2 className="text-lg font-bold text-gray-900">
          Wishlist ({wishlistProducts.length})
        </h2>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {wishlistProducts.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border border-gray-200 rounded-lg p-4"
            >
              <Link href={`/product/${item.id}`} className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.id}`}
                  className="font-medium text-gray-900 hover:text-[#042A55] transition-colors"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-gray-500">{item.category}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < Math.floor(item.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="font-bold text-[#042A55] mt-1">
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button className="p-2 bg-[#042A55] text-white rounded-lg hover:bg-[#063C76] transition-colors">
                  <ShoppingCart size={16} />
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
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
