"use client";

import { useState } from "react";
import { MapPin, Plus, Edit2, Trash2 } from "lucide-react";

const addresses = [
  {
    id: 1,
    label: "Home",
    name: "John Doe",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "US",
    isDefault: true,
  },
  {
    id: 2,
    label: "Office",
    name: "John Doe",
    address: "456 Business Ave, Suite 200",
    city: "New York",
    state: "NY",
    zip: "10002",
    country: "US",
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-[#042A55]" />
          <h2 className="text-lg font-bold text-gray-900">My Addresses</h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#042A55] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#063C76] transition-colors"
        >
          <Plus size={16} />
          Add Address
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`border rounded-lg p-4 ${
              addr.isDefault
                ? "border-[#042A55] bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-900">
                {addr.label}
              </span>
              {addr.isDefault && (
                <span className="text-xs bg-[#042A55] text-white px-2 py-0.5 rounded-full">
                  Default
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{addr.name}</p>
            <p className="text-sm text-gray-600">{addr.address}</p>
            <p className="text-sm text-gray-600">
              {addr.city}, {addr.state} {addr.zip}
            </p>
            <div className="flex gap-2 mt-3">
              <button className="p-1.5 text-gray-400 hover:text-[#042A55] hover:bg-blue-50 rounded transition-colors">
                <Edit2 size={16} />
              </button>
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
