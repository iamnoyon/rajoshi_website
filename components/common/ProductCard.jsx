"use client";

import Link from "next/link";
import { Star, Heart, ShoppingCart, Check } from "lucide-react";
import { getWishlistIds, toggleWishlistItem, onWishlistUpdate } from "@/utils/wishlist";
import { addToCart, isInCart, onCartUpdate } from "@/utils/cart";
import { useState, useEffect, useCallback } from "react";

const badgeColors = {
  Sale: "bg-red-500 text-white",
  New: "bg-green-500 text-white",
};

export default function ProductCard({ product, variant = "grid" }) {
  const [wishlist, setWishlist] = useState([]);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setWishlist(getWishlistIds());
    setInCart(isInCart(product.id));
    const unsubWishlist = onWishlistUpdate(() => setWishlist(getWishlistIds()));
    const unsubCart = onCartUpdate(() => setInCart(isInCart(product.id)));
    return () => { unsubWishlist(); unsubCart(); };
  }, [product.id]);

  const handleToggleWishlist = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleWishlistItem(product.id);
    setWishlist(updated);
  }, [product.id]);

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    setInCart(true);
  }, [product.id]);

  const isWishlisted = wishlist.includes(product.id);

  const badgeClass = product.badge
    ? badgeColors[product.badge] || "bg-yellow-500 text-white"
    : null;

  const hasImage = product.images && product.images.length > 0;

  if (variant === "list") {
    return (
      <div className="group flex gap-4 bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow p-3 relative">
        <Link href={`/product/${product.id}`} className="w-32 h-32 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
          {product.badge && (
            <span
              className={`absolute top-1 left-1 z-10 text-xs font-semibold px-2 py-0.5 rounded ${badgeClass}`}
            >
              {product.badge}
            </span>
          )}
          {hasImage ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
          )}
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/product/${product.id}`}>
            <p className="text-xs text-gray-500">{product.category}</p>
            <h3 className="font-medium text-gray-900 group-hover:text-[#042A55] transition-colors">
              {product.name}
            </h3>
          </Link>
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
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold text-[#042A55] text-lg">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5 absolute top-2 right-2">
          <button
            onClick={handleToggleWishlist}
            className="p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <Heart
              size={16}
              className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}
            />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            {inCart ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <ShoppingCart size={16} className="text-gray-500" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square bg-gray-100">
          {product.badge && (
            <span
              className={`absolute top-2 left-2 z-10 text-xs font-semibold px-2 py-0.5 rounded ${badgeClass}`}
            >
              {product.badge}
            </span>
          )}
          {hasImage ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform" />
          )}
        </div>
        <div className="p-3">
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
          <h3 className="font-medium text-sm text-gray-900 truncate group-hover:text-[#042A55] transition-colors">
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
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold text-[#042A55]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
        <button
          onClick={handleToggleWishlist}
          className="p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <Heart
            size={16}
            className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}
          />
        </button>
        <button
          onClick={handleAddToCart}
          className="p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          {inCart ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <ShoppingCart size={16} className="text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
}
