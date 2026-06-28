import { Truck, Shield, RotateCcw, Headphones } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected transactions" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated customer service" },
];

export default function Features() {
  return (
    <section className="border-b border-gray-200 bg-white lg:py-5">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="group flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-125 transition-transform duration-200">
                <feat.icon size={20} className="text-[#042A55]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">{feat.title}</p>
                <p className="text-xs text-gray-500">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
