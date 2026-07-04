"use client";

import Link from "next/link";
import { Trash2, ShoppingCart, Star } from "lucide-react";
import { useGetProductByIdQuery } from "@/store/public/products";
import { removeFromWishlist } from "@/utils/wishlist";
import { addToCart } from "@/utils/cart";

export default function WishlistItem({ id, compact = false }) {
  const { data, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex gap-3 border border-gray-200 rounded-lg p-3 animate-pulse">
        <div className={compact ? "w-16 h-16 bg-gray-200 rounded-lg" : "w-20 h-20 bg-gray-200 rounded-lg"} />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  const product = data?.data;
  if (!product) return null;

  const images = product.images || [];
  const price = parseFloat(product.discountPrice || product.price);
  const category = typeof product.category === "object" ? product.category?.name : product.category;
  const rating = product.reviews?.length
    ? product.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / product.reviews.length
    : 0;

  if (compact) {
    return (
      <div className="flex gap-3 border border-gray-200 rounded-lg p-3">
        <Link href={`/product/${product.id}`} className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
          <img src={images[0]} alt={product.name} className="w-full h-full object-cover" />
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/product/${product.id}`} className="font-medium text-sm text-gray-900 hover:text-[#042A55] transition-colors truncate block">
            {product.name}
          </Link>
          {category && <p className="text-xs text-gray-500">{category}</p>}
          <div className="flex items-center gap-1 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
            ))}
          </div>
          <p className="font-bold text-[#042A55] text-sm mt-0.5">${price.toFixed(2)}</p>
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={() => { addToCart(product.id, 1); }} className="p-1.5 bg-[#042A55] text-white rounded hover:bg-[#063C76] transition-colors">
            <ShoppingCart size={14} />
          </button>
          <button onClick={() => removeFromWishlist(product.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 border border-gray-200 rounded-lg p-4">
      <Link href={`/product/${product.id}`} className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
        <img src={images[0]} alt={product.name} className="w-full h-full object-cover" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/product/${product.id}`} className="font-medium text-gray-900 hover:text-[#042A55] transition-colors">
          {product.name}
        </Link>
        {category && <p className="text-xs text-gray-500">{category}</p>}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
          ))}
        </div>
        <p className="font-bold text-[#042A55] mt-1">${price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button className="p-2 bg-[#042A55] text-white rounded-lg hover:bg-[#063C76] transition-colors">
          <ShoppingCart size={16} />
        </button>
        <button onClick={() => removeFromWishlist(product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
