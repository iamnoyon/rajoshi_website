"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ChevronRight, Tag, X } from "lucide-react";
import {
  getCartItems,
  getCartCount,
  onCartUpdate,
} from "@/utils/cart";
import {
  applyCoupon,
  getAppliedCoupon,
  removeCoupon,
  calculateDiscount,
  onCouponUpdate,
} from "@/utils/coupon";
import CartItem from "@/components/common/CartItem";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    setCartItems(getCartItems());
    setCoupon(getAppliedCoupon());
    const unsubCart = onCartUpdate(() => setCartItems(getCartItems()));
    const unsubCoupon = onCouponUpdate(() => setCoupon(getAppliedCoupon()));
    return () => { unsubCart(); unsubCoupon(); };
  }, []);

  const itemCount = cartItems.length;

  const subtotal = 0;
  const shipping = 0;
  const discount = 0;
  const total = 0;

  const handleApplyCoupon = () => {
    setCouponError("");
    const result = applyCoupon(couponCode);
    if (result.valid) {
      setCoupon(result);
      setCouponCode("");
    } else {
      setCouponError(result.message);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCoupon(null);
  };

  if (itemCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#042A55]">Home</Link>
          <ChevronRight size={14} className="inline mx-1" />
          <span className="text-gray-900 font-medium">Cart</span>
        </div>
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag size={64} className="text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-6">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/shop" className="bg-[#042A55] hover:bg-[#063C76] text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#042A55]">Home</Link>
        <ChevronRight size={14} className="inline mx-1" />
        <span className="text-gray-900 font-medium">Cart</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({itemCount} items)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} id={item.id} quantity={item.quantity} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
            </div>

            <div className="mb-4">
              {coupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-green-600" />
                    <span className="text-sm font-medium text-green-700">{coupon.code}</span>
                    <span className="text-xs text-green-600">({coupon.label})</span>
                  </div>
                  <button onClick={handleRemoveCoupon} className="text-green-600 hover:text-red-500 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value); setCouponError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                      placeholder="Coupon code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55]"
                    />
                    <button onClick={handleApplyCoupon} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                </div>
              )}
            </div>

            <Link href="/checkout" className="block w-full text-center bg-[#042A55] hover:bg-[#063C76] text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-3">
              Proceed to Checkout
            </Link>
            <Link href="/shop" className="block text-center text-sm text-[#042A55] hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
