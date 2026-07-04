"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { getWishlistItems, onWishlistUpdate } from "@/utils/wishlist";
import WishlistItem from "@/components/common/WishlistItem";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    setWishlistItems(getWishlistItems());
    return onWishlistUpdate(() => setWishlistItems(getWishlistItems()));
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Heart size={20} className="fill-red-500 text-red-500" />
        <h2 className="text-lg font-bold text-gray-900">Wishlist ({wishlistItems.length})</h2>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {wishlistItems.map((item) => (
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
