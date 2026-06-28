"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
  Minus,
  Plus,
  Share2,
} from "lucide-react";

const sampleProduct = {
  id: 1,
  name: "Wireless Noise Cancelling Headphones",
  price: 79.99,
  originalPrice: 99.99,
  rating: 4.5,
  reviews: 284,
  sku: "WH-1000XM4",
  brand: "AudioTech",
  category: "Electronics",
  inStock: true,
  stockCount: 15,
  description:
    "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable design for all-day listening.",
  features: [
    "Active Noise Cancellation (ANC)",
    "30-hour battery life",
    "Bluetooth 5.2 connectivity",
    "Foldable design with carrying case",
    "Built-in microphone for calls",
    "Touch controls on ear cup",
  ],
  images: ["/products/headphones.jpg", "/products/headphones2.jpg"],
  colors: ["Black", "Silver", "Navy Blue"],
  sizes: [],
};

const reviews = [
  {
    id: 1,
    author: "John D.",
    rating: 5,
    date: "2 days ago",
    title: "Best headphones I've owned",
    comment:
      "The noise cancellation is incredible. Battery lasts forever and the sound quality is top-notch.",
  },
  {
    id: 2,
    author: "Sarah M.",
    rating: 4,
    date: "1 week ago",
    title: "Great value for money",
    comment:
      "Very comfortable to wear for long periods. Sound quality is excellent. Only wish the case was a bit smaller.",
  },
  {
    id: 3,
    author: "Alex K.",
    rating: 5,
    date: "2 weeks ago",
    title: "Perfect for work from home",
    comment:
      "Blocks out all background noise. Crystal clear calls. Highly recommend for remote workers.",
  },
];

const relatedProducts = [
  { id: 5, name: "Bluetooth Speaker", price: 59.99, rating: 4.4 },
  { id: 6, name: "Fitness Tracker", price: 89.99, rating: 4.2 },
  { id: 8, name: "Portable Charger", price: 34.99, rating: 4.1 },
  { id: 2, name: "Smart Watch Pro", price: 199.99, rating: 4.8 },
];

export default function ProductDetailPage() {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const product = sampleProduct;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#042A55]">
          Home
        </Link>
        <ChevronRight size={14} className="inline mx-1" />
        <Link href="/shop" className="hover:text-[#042A55]">
          Shop
        </Link>
        <ChevronRight size={14} className="inline mx-1" />
        <Link
          href="/shop?category=electronics"
          className="hover:text-[#042A55]"
        >
          Electronics
        </Link>
        <ChevronRight size={14} className="inline mx-1" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      {/* Product Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-lg">Product Image</span>
            </div>
          </div>
          <div className="flex gap-3">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === idx
                    ? "border-[#042A55]"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="mb-1">
            <span className="text-sm text-gray-500">{product.brand}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-[#042A55]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-0.5 rounded">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Color:{" "}
                <span className="font-normal text-gray-600">
                  {product.colors[selectedColor]}
                </span>
              </h3>
              <div className="flex gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-10 h-10 rounded-full border-2 transition-colors ${
                      selectedColor === idx
                        ? "border-[#042A55] ring-2 ring-[#042A55]/20"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{
                      backgroundColor:
                        color === "Black"
                          ? "#1a1a1a"
                          : color === "Silver"
                          ? "#c0c0c0"
                          : "#1e3a5f",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Quantity
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stockCount, quantity + 1))
                  }
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {product.stockCount} items in stock
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#042A55] hover:bg-[#063C76] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart size={20} />
            </button>
            <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 size={20} />
            </button>
          </div>

          {/* Buy Now */}
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6">
            Buy Now
          </button>

          {/* Trust Info */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck, text: "Free Shipping" },
              { icon: RotateCcw, text: "30-Day Returns" },
              { icon: Shield, text: "2-Year Warranty" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg"
              >
                <item.icon size={18} className="text-[#042A55] mb-1" />
                <span className="text-xs text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200 mb-12">
        <div className="flex gap-6 border-b border-gray-200">
          {["description", "features", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-sm font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-[#042A55] text-[#042A55]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab} {tab === "reviews" && `(${product.reviews})`}
            </button>
          ))}
        </div>
        <div className="py-6">
          {activeTab === "description" && (
            <div className="prose max-w-none text-gray-600">
              <p>{product.description}</p>
            </div>
          )}
          {activeTab === "features" && (
            <ul className="space-y-2">
              {product.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-gray-600">
                  <span className="w-1.5 h-1.5 bg-[#042A55] rounded-full" />
                  {feat}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-6 last:border-0"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {review.title}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                  <p className="text-xs text-gray-400">
                    By {review.author} &middot; {review.date}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((rp) => (
            <Link
              key={rp.id}
              href={`/product/${rp.id}`}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-100">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900 truncate group-hover:text-[#042A55]">
                  {rp.name}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={
                        i < Math.floor(rp.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="font-bold text-[#042A55] mt-1 block">
                  ${rp.price.toFixed(2)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
