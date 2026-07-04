"use client";

import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { updateCartQuantity, removeFromCart } from "@/utils/cart";

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

export default function CartItem({ item }) {
  const price = formatPrice(item.discountPrice || item.price);
  const categoryName = getCategoryName(item.category);
  const imageUrl = item.images?.[0] || null;

  return (
    <div className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4">
      <Link href={`/product/${item.id}`} className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
        {imageUrl ? <img src={imageUrl} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />}
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-[#042A55] transition-colors block truncate">
          {item.name}
        </Link>
        {categoryName && <p className="text-xs text-gray-500 mt-0.5">{categoryName}</p>}
        <p className="font-bold text-[#042A55] mt-1">${price}</p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-50 transition-colors">
              <Minus size={14} />
            </button>
            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
            <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-50 transition-colors">
              <Plus size={14} />
            </button>
          </div>
          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-gray-900">${(parseFloat(price) * item.quantity).toFixed(2)}</p>
      </div>
    </div>
  );
}
