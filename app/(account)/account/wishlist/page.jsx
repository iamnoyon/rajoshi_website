"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { getWishlistIds, onWishlistUpdate } from "@/utils/wishlist";
import { useGetProductsByMultipleIdsQuery } from "@/store/public/products";
import ProductCard from "@/components/common/ProductCard";

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    setWishlistIds(getWishlistIds());
    return onWishlistUpdate(() => setWishlistIds(getWishlistIds()));
  }, []);

  const { data: productsData, isLoading } = useGetProductsByMultipleIdsQuery(wishlistIds, { skip: wishlistIds.length === 0 });
  const products = productsData?.data || [];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Heart size={20} className="fill-red-500 text-red-500" />
        <h2 className="text-lg font-bold text-gray-900">Wishlist ({wishlistIds.length})</h2>
      </div>

      {wishlistIds.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">Your wishlist is empty.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
            Continue Shopping
          </Link>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#042A55]" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
