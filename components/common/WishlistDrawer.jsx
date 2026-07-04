"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Heart, Trash2, ShoppingCart } from "lucide-react";
import { getWishlistIds, removeFromWishlist, onWishlistUpdate } from "@/utils/wishlist";
import { addToCart } from "@/utils/cart";
import { useGetProductsByMultipleIdsQuery } from "@/store/public/products";

export default function WishlistDrawer({ isOpen, onClose }) {
  const router = useRouter();
  const [wishlistIds, setWishlistIds] = useState([]);

  const refreshWishlist = useCallback(() => {
    setWishlistIds(getWishlistIds());
  }, []);

  useEffect(() => {
    refreshWishlist();
    return onWishlistUpdate(refreshWishlist);
  }, [refreshWishlist]);

  useEffect(() => {
    if (isOpen) refreshWishlist();
  }, [isOpen, refreshWishlist]);

  const { data: productsData, refetch } = useGetProductsByMultipleIdsQuery(wishlistIds, { skip: wishlistIds.length === 0 });

  useEffect(() => {
    if (isOpen && wishlistIds.length > 0) refetch();
  }, [isOpen, wishlistIds.length, refetch]);

  const products = productsData?.data?.content || productsData?.data || [];

  const handleRemove = useCallback((id) => {
    removeFromWishlist(id);
  }, []);

  const handleAddAllToCart = useCallback(() => {
    products.forEach((p) => addToCart(p.id, 1));
    onClose();
    router.push("/cart");
  }, [products, onClose, router]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />}

      <div className={`fixed top-0 right-0 h-full w-100 bg-white shadow-xl z-[70] transform transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Heart size={20} className="fill-red-500 text-red-500" />
            <h2 className="text-lg font-bold text-gray-900">Wishlist ({wishlistIds.length})</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {wishlistIds.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4 text-center">
              <Heart size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Your wishlist is empty</p>
              <Link href="/shop" onClick={onClose} className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Continue Shopping
              </Link>
            </div>
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#042A55]" />
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {products.map((product) => (
                <div key={product.id} className="flex gap-3 border border-gray-200 rounded-lg p-3">
                  <Link href={`/product/${product.id}`} onClick={onClose} className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    {product.images?.[0] ? <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${product.id}`} onClick={onClose} className="font-medium text-sm text-gray-900 hover:text-[#042A55] transition-colors truncate block">
                      {product.name}
                    </Link>
                    <p className="font-bold text-[#042A55] text-sm mt-0.5">${parseFloat(product.discountPrice || product.price).toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button onClick={() => addToCart(product.id, 1)} className="p-1.5 bg-[#042A55] text-white rounded hover:bg-[#063C76] transition-colors">
                      <ShoppingCart size={14} />
                    </button>
                    <button onClick={() => handleRemove(product.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {wishlistIds.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <button onClick={handleAddAllToCart} className="w-full flex hover:cursor-pointer items-center justify-center gap-2 bg-[#042A55] hover:bg-[#063C76] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Add All to Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
