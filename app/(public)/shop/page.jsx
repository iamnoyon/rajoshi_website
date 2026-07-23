"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Grid3X3,
  LayoutList,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Filter,
} from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import { useGetProductsQuery } from "@/store/public/products";
import { useGetCategoryListQuery } from "@/store/public/productCategory";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
  { label: "Best Rating", value: "rating" },
];

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#042A55]" /></div>}>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const { data: categoryData } = useGetCategoryListQuery();
  const categoryFilters = ["All", ...(categoryData?.data?.map((c) => c.name) || [])];

  useEffect(() => {
    if (urlCategory && categoryData?.data) {
      const matched = categoryData.data.find((c) => c.slug === urlCategory);
      if (matched) setSelectedCategory(matched.name);
      else setSelectedCategory("All");
    }
  }, [urlCategory, categoryData]);

  const queryParams = {};
  if (sortBy === "price_asc") { queryParams.sortBy = "price"; queryParams.order = "asc"; }
  else if (sortBy === "price_desc") { queryParams.sortBy = "price"; queryParams.order = "desc"; }
  else if (sortBy === "newest") { queryParams.sortBy = "createdAt"; queryParams.order = "desc"; }
  else if (sortBy === "rating") { queryParams.sortBy = "rating"; queryParams.order = "desc"; }

  if (selectedCategory !== "All") {
    const cat = categoryData?.data?.find((c) => c.name === selectedCategory);
    if (cat) queryParams.categoryId = cat.id;
  }

  const { data: apiProducts, isLoading } = useGetProductsQuery(queryParams);

  const allProducts = apiProducts?.data?.content || [];

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const paginatedProducts = allProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const activeFiltersCount = selectedCategory !== "All" ? 1 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#042A55]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Shop</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
          <p className="text-sm text-gray-500 mt-1">{allProducts.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            <Filter size={16} />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-[#042A55] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{activeFiltersCount}</span>
            )}
          </button>
          <div className="relative">
            <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }} className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#042A55]">
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
          </div>
          <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-[#042A55] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}><Grid3X3 size={16} /></button>
            <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-[#042A55] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}><LayoutList size={16} /></button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="font-semibold text-sm text-gray-900 mb-3">Category</h3>
              <div className="space-y-1">
                {categoryFilters.map((cat, inx) => (
                  <button key={inx} onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? "bg-[#042A55] text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            {activeFiltersCount > 0 && (
              <button onClick={() => { setSelectedCategory("All"); setCurrentPage(1); }} className="text-sm text-red-500 hover:text-red-600 font-medium">Clear all filters</button>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#042A55] rounded-full text-sm">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")} className="hover:text-red-500"><X size={14} /></button>
              </span>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#042A55]"></div>
            </div>
          ) : paginatedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">No products found.</p>
              <button onClick={() => setSelectedCategory("All")} className="text-[#042A55] hover:underline">Clear filters</button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="list" />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-600">
              <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#042A55]/10 text-[#042A55]"><ChevronsLeft size={18} /></button>
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#042A55]/10 text-[#042A55]"><ChevronLeft size={18} /></button>
              <span className="px-3">{`${(currentPage - 1) * productsPerPage + 1}-${Math.min(currentPage * productsPerPage, allProducts.length)} of ${allProducts.length}`}</span>
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#042A55]/10 text-[#042A55]"><ChevronRight size={18} /></button>
              <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#042A55]/10 text-[#042A55]"><ChevronsRight size={18} /></button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setFilterOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setFilterOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button>
              </div>
              <div className="mb-6">
                <h3 className="font-semibold text-sm text-gray-900 mb-3">Category</h3>
                <div className="space-y-1">
                  {categoryFilters.map((cat) => (
                    <button key={cat} onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }} className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? "bg-[#042A55] text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setFilterOpen(false)} className="w-full bg-[#042A55] text-white py-2.5 rounded-lg font-medium hover:bg-[#063C76] transition-colors">Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
