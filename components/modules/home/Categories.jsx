import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Electronics", href: "/shop?category=electronics" },
  { name: "Fashion", href: "/shop?category=fashion" },
  { name: "Home & Living", href: "/shop?category=home" },
  { name: "Sports", href: "/shop?category=sports" },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
        <Link
          href="/shop"
          className="text-sm font-medium text-[#042A55] hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-white font-semibold text-lg">{cat.name}</h3>
              <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                Explore &rarr;
              </span>
            </div>
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200" />
          </Link>
        ))}
      </div>
    </section>
  );
}
