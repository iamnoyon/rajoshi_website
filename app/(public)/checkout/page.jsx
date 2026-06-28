"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Truck,
  CheckCircle,
  ChevronRight,
  Lock,
  MapPin,
  Package,
} from "lucide-react";

const steps = [
  { id: 1, label: "Shipping", icon: Truck },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Confirmation", icon: CheckCircle },
];

const sampleCart = [
  { id: 1, name: "Wireless Headphones", price: 79.99, quantity: 1, color: "Black" },
  { id: 2, name: "Smart Watch Pro", price: 199.99, quantity: 2, color: "Silver" },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = sampleCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#042A55]">
          Home
        </Link>
        <ChevronRight size={14} className="inline mx-1" />
        <Link href="/cart" className="hover:text-[#042A55]">
          Cart
        </Link>
        <ChevronRight size={14} className="inline mx-1" />
        <span className="text-gray-900 font-medium">Checkout</span>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, idx) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  currentStep > step.id
                    ? "bg-green-500 text-white"
                    : currentStep === step.id
                    ? "bg-[#042A55] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircle size={18} />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`text-sm font-medium hidden sm:block ${
                  currentStep >= step.id ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`w-16 sm:w-24 h-0.5 mx-2 ${
                  currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <form onSubmit={handleShippingSubmit}>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin size={20} className="text-[#042A55]" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Shipping Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingForm.firstName}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingForm.lastName}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingForm.email}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={shippingForm.phone}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingForm.address}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          address: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingForm.city}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          city: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingForm.state}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          state: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingForm.zipCode}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          zipCode: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      value={shippingForm.country}
                      onChange={(e) =>
                        setShippingForm({
                          ...shippingForm,
                          country: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Shipping Method
                  </h3>
                  <div className="space-y-2">
                    {[
                      {
                        id: "standard",
                        name: "Standard Shipping",
                        time: "5-7 business days",
                        price: subtotal > 50 ? "Free" : "$9.99",
                      },
                      {
                        id: "express",
                        name: "Express Shipping",
                        time: "2-3 business days",
                        price: "$19.99",
                      },
                      {
                        id: "overnight",
                        name: "Overnight Shipping",
                        time: "1 business day",
                        price: "$39.99",
                      },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#042A55] has-[:checked]:border-[#042A55] has-[:checked]:bg-blue-50"
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={method.id}
                          defaultChecked={method.id === "standard"}
                          className="w-4 h-4 text-[#042A55] focus:ring-[#042A55]"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {method.name}
                          </p>
                          <p className="text-xs text-gray-500">{method.time}</p>
                        </div>
                        <span className="text-sm font-semibold text-[#042A55]">
                          {method.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="bg-[#042A55] hover:bg-[#063C76] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={handlePaymentSubmit}>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard size={20} className="text-[#042A55]" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Payment Details
                  </h2>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 flex items-center gap-2">
                  <Lock size={16} className="text-[#042A55]" />
                  <span className="text-sm text-[#042A55]">
                    Your payment is secured with SSL encryption
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={paymentForm.cardNumber}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          cardNumber: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={paymentForm.cardName}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          cardName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={paymentForm.expiry}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            expiry: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={paymentForm.cvv}
                        onChange={(e) =>
                          setPaymentForm({
                            ...paymentForm,
                            cvv: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-sm font-medium text-[#042A55] hover:underline"
                  >
                    &larr; Back to Shipping
                  </button>
                  <button
                    type="submit"
                    className="bg-[#042A55] hover:bg-[#063C76] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Order Confirmed!
              </h2>
              <p className="text-gray-500 mb-2">
                Thank you for your purchase. Your order has been placed
                successfully.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Order ID: <span className="font-mono font-semibold">#ORD-2024-001</span>
              </p>
              <p className="text-sm text-gray-500 mb-8">
                A confirmation email has been sent to your email address.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/account/orders"
                  className="inline-flex items-center justify-center gap-2 bg-[#042A55] hover:bg-[#063C76] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <Package size={18} />
                  View My Orders
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              {sampleCart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate mr-2">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-medium whitespace-nowrap">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
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
            <div className="flex justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-xl text-[#042A55]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
