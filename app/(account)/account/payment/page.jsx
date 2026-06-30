"use client";

import { CreditCard, Plus, Trash2, CheckCircle } from "lucide-react";

const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "12/25",
    isDefault: true,
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "8888",
    expiry: "06/26",
    isDefault: false,
  },
];

const cardIcons = {
  Visa: "💳",
  Mastercard: "💳",
  Amex: "💳",
};

export default function PaymentMethodsPage() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CreditCard size={20} className="text-[#042A55]" />
          <h2 className="text-lg font-bold text-gray-900">
            Payment Methods
          </h2>
        </div>
        <button className="flex items-center gap-2 bg-[#042A55] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#063C76] transition-colors">
          <Plus size={16} />
          Add Card
        </button>
      </div>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 flex items-center justify-between ${
              method.isDefault
                ? "border-[#042A55] bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{cardIcons[method.type]}</span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {method.type} ending in {method.last4}
                </p>
                <p className="text-xs text-gray-500">
                  Expires {method.expiry}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {method.isDefault && (
                <span className="flex items-center gap-1 text-xs text-[#042A55] font-medium">
                  <CheckCircle size={14} />
                  Default
                </span>
              )}
              <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
