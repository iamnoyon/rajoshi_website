"use client"

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGetCategoryListQuery } from "@/store/public/productCategory";
import { useRouter } from "next/navigation";

export default function Categories() {
  const router = useRouter()
  const {data: categories} = useGetCategoryListQuery()

  const handleClick = (href) => {
    router.push(href)
  }
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Shop by Category</h2>
        <Link
          href="/categories"
          className="text-sm font-medium text-[#042A55] hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories?.data?.map((cat) => (
          <button
            key={cat.id}
            onClick={()=>handleClick(`/shop?category=${cat.slug}`)}
            className="group relative aspect-square hover:cursor-pointer rounded-xl overflow-hidden bg-gray-100"
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
              unoptimized
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
