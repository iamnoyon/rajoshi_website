import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Electronics",
    href: "/shop?category=electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
  },
  {
    name: "Fashion",
    href: "/shop?category=fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
  },
  {
    name: "Home & Living",
    href: "/shop?category=home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
  },
  {
    name: "Sports",
    href: "/shop?category=sports",
    image: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400&q=80",
  },
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
            <div className="absolute inset-0 p-4 z-20 flex flex-col justify-end">
              <h3 className="text-white font-semibold text-lg">{cat.name}</h3>
              <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                Explore &rarr;
              </span>
            </div>
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
