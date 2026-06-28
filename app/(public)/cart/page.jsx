"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight, Tag } from "lucide-react";

const sampleCart = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    quantity: 1,
    color: "Black",
    image: "/products/headphones.jpg",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 199.99,
    quantity: 2,
    color: "Silver",
    image: "/products/watch.jpg",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(sampleCart);
  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-[#042A55] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#063C76] transition-colors"
        >
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#042A55]">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Shopping Cart</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Shopping Cart ({cartItems.length} items)
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <Link
                      href={`/product/${item.id}`}
                      className="font-medium text-gray-900 hover:text-[#042A55] transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Color: {item.color}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-bold text-[#042A55]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Link
              href="/shop"
              className="text-sm font-medium text-[#042A55] hover:underline"
            >
              &larr; Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            {/* Promo Code */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Tag
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                />
              </div>
              <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Apply
              </button>
            </div>

            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-xl text-[#042A55]">
                ${total.toFixed(2)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-[#042A55] hover:bg-[#063C76] text-white font-semibold py-3 rounded-lg text-center transition-colors"
            >
              Proceed to Checkout
            </Link>

            <p className="text-xs text-gray-500 text-center mt-4">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
