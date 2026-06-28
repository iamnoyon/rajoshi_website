"use client";

import Link from "next/link";
import { Package, Eye, ChevronRight } from "lucide-react";

const orders = [
  {
    id: "ORD-2024-001",
    date: "Jan 15, 2024",
    status: "Delivered",
    total: 279.98,
    items: 2,
  },
  {
    id: "ORD-2024-002",
    date: "Jan 22, 2024",
    status: "Shipped",
    total: 149.99,
    items: 1,
  },
  {
    id: "ORD-2024-003",
    date: "Feb 1, 2024",
    status: "Processing",
    total: 89.99,
    items: 3,
  },
];

const statusColors = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Package size={20} className="text-[#042A55]" />
        <h2 className="text-lg font-bold text-gray-900">My Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-[#042A55] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {order.id}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {order.date} &middot; {order.items} items
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                  <span className="font-bold text-[#042A55]">
                    ${order.total.toFixed(2)}
                  </span>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="p-2 text-gray-400 hover:text-[#042A55] hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
