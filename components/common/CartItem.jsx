"use client";

import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { useGetProductByIdQuery } from "@/store/public/products";
import { updateCartQuantity, removeFromCart } from "@/utils/cart";

export default function CartItem({ id, quantity }) {
  const { data, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4 animate-pulse">
        <div className="w-24 h-24 bg-gray-200 rounded-lg" />
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

  return (
    <div className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4">
      <Link href={`/product/${product.id}`} className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
        <img src={images[0]} alt={product.name} className="w-full h-full object-cover" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/product/${product.id}`} className="font-medium text-gray-900 hover:text-[#042A55] transition-colors block truncate">
          {product.name}
        </Link>
        {category && <p className="text-xs text-gray-500 mt-0.5">{category}</p>}
        <p className="font-bold text-[#042A55] mt-1">${price.toFixed(2)}</p>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button onClick={() => updateCartQuantity(product.id, quantity - 1)} className="p-2 hover:bg-gray-50 transition-colors">
              <Minus size={14} />
            </button>
            <span className="w-10 text-center text-sm font-medium">{quantity}</span>
            <button onClick={() => updateCartQuantity(product.id, quantity + 1)} className="p-2 hover:bg-gray-50 transition-colors">
              <Plus size={14} />
            </button>
          </div>
          <button onClick={() => removeFromCart(product.id)} className="text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-gray-900">${(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
}
