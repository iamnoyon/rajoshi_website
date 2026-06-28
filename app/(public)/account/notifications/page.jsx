"use client";

import { Bell, Save } from "lucide-react";
import { useState } from "react";

export default function NotificationsPage() {
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    smsAlerts: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell size={20} className="text-[#042A55]" />
        <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
      </div>

      <div className="space-y-4">
        {[
          {
            key: "orderUpdates",
            label: "Order Updates",
            desc: "Get notified about your order status",
          },
          {
            key: "promotions",
            label: "Promotions & Deals",
            desc: "Receive exclusive offers and discounts",
          },
          {
            key: "newsletter",
            label: "Newsletter",
            desc: "Weekly digest of new products and trends",
          },
          {
            key: "smsAlerts",
            label: "SMS Alerts",
            desc: "Get text messages for important updates",
          },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900 text-sm">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <button
              onClick={() => toggle(item.key)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings[item.key] ? "bg-[#042A55]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings[item.key] ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button className="flex items-center gap-2 bg-[#042A55] hover:bg-[#063C76] text-white font-semibold py-2.5 px-6 rounded-lg transition-colors text-sm">
          <Save size={16} />
          Save Preferences
        </button>
      </div>
    </div>
  );
}
