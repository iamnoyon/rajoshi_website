"use client";

import Link from "next/link";
import { Star, Heart, ShoppingCart, Check } from "lucide-react";
import { getWishlistItems, toggleWishlistItem, onWishlistUpdate } from "@/utils/wishlist";
import { addToCart, isInCart, onCartUpdate } from "@/utils/cart";
import { useState, useEffect, useCallback } from "react";

const tagColors = {
  "New": "bg-green-500 text-white",
  "Sale": "bg-red-500 text-white",
  "Best Seller": "bg-orange-500 text-white",
  "Trending": "bg-purple-500 text-white",
  "Offer": "bg-blue-500 text-white",
};

function getTag(product) {
  return product.tags || product.badge || "";
}

function getTagColor(tag) {
  return tagColors[tag] || "bg-gray-500 text-white";
}

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

export default function ProductCard({ product, variant = "grid" }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setWishlistItems(getWishlistItems());
    setInCart(isInCart(product.id));
    const unsubWishlist = onWishlistUpdate(() => setWishlistItems(getWishlistItems()));
    const unsubCart = onCartUpdate(() => setInCart(isInCart(product.id)));
    return () => { unsubWishlist(); unsubCart(); };
  }, [product.id]);

  const handleToggleWishlist = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleWishlistItem(product);
    setWishlistItems(updated);
  }, [product]);

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setInCart(true);
  }, [product]);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const categoryName = getCategoryName(product.category);
  const price = formatPrice(product.price);
  const originalPrice = formatPrice(product.originalPrice || product.discountPrice);
  const hasImage = product?.images && product.images.length > 0;
  const rating = product?.rating || 0;
  const reviews = product?.reviews || 0;
  const tag = getTag(product);

  if (variant === "list") {
    return (
      <div className="group flex gap-4 bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow p-3 relative">
        <Link href={`/product/${product.id}`} className="w-32 h-32 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
          {tag && (
            <span className={`absolute top-1 left-1 z-10 text-xs font-semibold px-2 py-0.5 rounded ${getTagColor(tag)}`}>
              {tag}
            </span>
          )}
          {hasImage ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/product/${product.id}`}>
            {categoryName && <p className="text-xs text-gray-500">{categoryName}</p>}
            <h3 className="font-medium text-gray-900 group-hover:text-[#042A55] transition-colors">
              {product?.name}
            </h3>
          </Link>
          {rating > 0 && (
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
              ))}
              {reviews > 0 && <span className="text-xs text-gray-500 ml-1">({reviews})</span>}
            </div>
          )}
          <div className="flex items-center gap-2 mt-2">
            {price != null && <span className="font-bold text-[#042A55] text-lg">${price}</span>}
            {originalPrice != null && <span className="text-sm text-gray-400 line-through">${originalPrice}</span>}
          </div>
        </div>
        <div className="flex flex-col gap-1.5 absolute top-2 right-2">
          <button onClick={handleToggleWishlist} className="p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors">
            <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"} />
          </button>
          <button onClick={handleAddToCart} className="p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors">
            {inCart ? <Check size={16} className="text-green-500" /> : <ShoppingCart size={16} className="text-gray-500" />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square bg-gray-100">
          {tag && (
            <span className={`absolute top-2 left-2 z-10 text-xs font-semibold px-2 py-0.5 rounded ${getTagColor(tag)}`}>
              {tag}
            </span>
          )}
          {hasImage ? (
            <img src={product?.images[0]} alt={product?.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform" />
          )}
        </div>
        <div className="p-3">
          {categoryName && <p className="text-xs text-gray-500 mb-1">{categoryName}</p>}
          <h3 className="font-medium text-sm text-gray-900 truncate group-hover:text-[#042A55] transition-colors">
            {product?.name}
          </h3>
          {rating > 0 && (
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className={i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
              ))}
              {reviews > 0 && <span className="text-xs text-gray-500 ml-1">({reviews})</span>}
            </div>
          )}
          <div className="flex items-center gap-2 mt-2">
            {price != null && <span className="font-bold text-[#042A55]">${price}</span>}
            {originalPrice != null && <span className="text-xs text-gray-400 line-through">${originalPrice}</span>}
          </div>
        </div>
      </Link>
      <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
        <button onClick={handleToggleWishlist} className="p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors">
          <Heart size={16} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
        <button onClick={handleAddToCart} className="p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors">
          {inCart ? <Check size={16} className="text-green-500" /> : <ShoppingCart size={16} className="text-gray-500" />}
        </button>
      </div>
    </div>
  );
}
