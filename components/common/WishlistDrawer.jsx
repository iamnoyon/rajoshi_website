"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Heart } from "lucide-react";
import { getWishlistIds, onWishlistUpdate } from "@/utils/wishlist";
import { addToCart } from "@/utils/cart";
import WishlistItem from "@/components/common/WishlistItem";

export default function WishlistDrawer({ isOpen, onClose }) {
  const router = useRouter();
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    setWishlistIds(getWishlistIds());
    return onWishlistUpdate(() => setWishlistIds(getWishlistIds()));
  }, []);

  const handleAddAllToCart = useCallback(() => {
    wishlistIds.forEach((id) => addToCart(id, 1));
    onClose();
    router.push("/cart");
  }, [wishlistIds, onClose, router]);

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
          ) : (
            <div className="p-4 space-y-3">
              {wishlistIds.map((id) => (
                <WishlistItem key={id} id={id} compact />
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
