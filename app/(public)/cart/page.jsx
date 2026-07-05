"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { getCartItems, onCartUpdate } from "@/utils/cart";
import { useGetProductsByMultipleIdsQuery } from "@/store/public/products";
import CartItem from "@/components/common/CartItem";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCartItems());
    const unsubCart = onCartUpdate(() => setCartItems(getCartItems()));
    return () => { unsubCart(); };
  }, []);

  const ids = cartItems.map((item) => item.id);
  const { data: productsData, isLoading: productsLoading } = useGetProductsByMultipleIdsQuery(ids, { skip: ids.length === 0 });
  const products = productsData?.data || [];

  const mergedCart = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.id);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean);

  const itemCount = mergedCart.length;

  const subtotal = mergedCart.reduce((sum, item) => {
    const price = parseFloat(item.discountPrice || item.price) || 0;
    return sum + price * item.quantity;
  }, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

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
          {productsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#042A55]" />
            </div>
          ) : (
            mergedCart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-[#042A55] text-lg">${total.toFixed(2)}</span>
              </div>
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
