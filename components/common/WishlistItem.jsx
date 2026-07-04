"use client";

import Link from "next/link";
import { Trash2, ShoppingCart, Star } from "lucide-react";
import { removeFromWishlist } from "@/utils/wishlist";
import { addToCart } from "@/utils/cart";

function formatPrice(val) {
  if (val == null) return null;
  const num = typeof val === "string" ? parseFloat(val) : val;
  return isNaN(num) ? null : num.toFixed(2);
}

function getCategoryName(category) {
  if (!category) return "";
  if (typeof category === "string") return category;
  return category.name || "";
}

export default function WishlistItem({ item, compact = false }) {
  const price = formatPrice(item.discountPrice || item.price);
  const categoryName = getCategoryName(item.category);
  const imageUrl = item.images?.[0] || null;

  if (compact) {
    return (
      <div className="flex gap-3 border border-gray-200 rounded-lg p-3">
        <Link href={`/product/${item.id}`} className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
          {imageUrl ? <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />}
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/product/${item.id}`} className="font-medium text-sm text-gray-900 hover:text-[#042A55] transition-colors truncate block">
            {item.name}
          </Link>
          {categoryName && <p className="text-xs text-gray-500">{categoryName}</p>}
          <p className="font-bold text-[#042A55] text-sm mt-0.5">${price}</p>
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={() => addToCart(item, 1)} className="p-1.5 bg-[#042A55] text-white rounded hover:bg-[#063C76] transition-colors">
            <ShoppingCart size={14} />
          </button>
          <button onClick={() => removeFromWishlist(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 border border-gray-200 rounded-lg p-4">
      <Link href={`/product/${item.id}`} className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
        {imageUrl ? <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />}
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-[#042A55] transition-colors">
          {item.name}
        </Link>
        {categoryName && <p className="text-xs text-gray-500">{categoryName}</p>}
        <p className="font-bold text-[#042A55] mt-1">${price}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button onClick={() => addToCart(item, 1)} className="p-2 bg-[#042A55] text-white rounded-lg hover:bg-[#063C76] transition-colors">
          <ShoppingCart size={16} />
        </button>
        <button onClick={() => removeFromWishlist(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
