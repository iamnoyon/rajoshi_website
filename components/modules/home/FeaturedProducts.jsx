"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import { useGetProductsQuery } from "@/store/public/products";

export default function FeaturedProducts() {
  const { data: featuredProducts } = useGetProductsQuery({tag: "Featured"});

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Featured Products</h2>
        <Link
          href="/shop"
          className="text-sm font-medium text-[#042A55] hover:underline flex items-center gap-1"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {featuredProducts?.data?.content?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
