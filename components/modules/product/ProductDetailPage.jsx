"use client";

import { useState, useEffect } from "react";
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
import { getWishlistIds, toggleWishlistItem, onWishlistUpdate } from "@/utils/wishlist";
import { addToCart, removeFromCart, isInCart, onCartUpdate } from "@/utils/cart";
import ProductCard from "@/components/common/ProductCard";
import { useGetProductByIdQuery, useGetProductsByCategoryQuery } from "@/store/public/products";

function formatPrice(val) {
  if (val == null) return null;
  const num = typeof val === "string" ? parseFloat(val) : val;
  return isNaN(num) ? null : num.toFixed(2);
}

function getStock(product) {
  if (!product) return 0;
  return product.stock ?? product.stockCount ?? 0;
}

const tagColors = {
  "New": "bg-green-500 text-white",
  "Sale": "bg-red-500 text-white",
  "Best Seller": "bg-orange-500 text-white",
  "Trending": "bg-purple-500 text-white",
  "Offer": "bg-blue-500 text-white",
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [wishlist, setWishlist] = useState([]);
  const [inCart, setInCart] = useState(false);

  // api call to fetch product details
  const { data: productDetails, isLoading } = useGetProductByIdQuery({ id }, { skip: !id });
  const {data: categoryProducts} = useGetProductsByCategoryQuery({categoryId: productDetails?.data?.category?.id}, { skip: !productDetails?.data?.category?.id });

  const product = productDetails?.data;
  const price = formatPrice(product?.price);
  const originalPrice = formatPrice(product?.discountPrice || product?.price);
  const reviews = product?.reviews || [];
  const reviewsCount = reviews.length || 0;
  const tag = product?.tags || "";

  useEffect(() => {
    if (product) {
      setWishlist(getWishlistIds());
      setInCart(isInCart(product.id));
    }
    const unsubWishlist = onWishlistUpdate(() => { if (product) setWishlist(getWishlistIds()); });
    const unsubCart = onCartUpdate(() => { if (product) setInCart(isInCart(product.id)); });
    return () => { unsubWishlist(); unsubCart(); };
  }, [product]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#042A55]"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
          <Link href="/shop" className="text-[#042A55] hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#042A55]">Home</Link>
        <ChevronRight size={14} className="inline mx-1" />
        <Link href="/shop" className="hover:text-[#042A55]">Shop</Link>
        {product?.category && (
          <>
            <ChevronRight size={14} className="inline mx-1" />
            <Link href={`/shop?category=${typeof product.category === "string" ? product.category.toLowerCase() : product.category?.slug || ""}`} className="hover:text-[#042A55]">{typeof product.category === "string" ? product.category : product.category?.name || ""}</Link>
          </>
        )}
        <ChevronRight size={14} className="inline mx-1" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      {/* Product Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
            {tag && (
              <span className={`absolute top-3 left-3 z-10 text-xs font-semibold px-3 py-1 rounded ${tagColors[tag] || "bg-gray-500 text-white"}`}>
                {tag}
              </span>
            )}
            {product.images && product.images.length > 0 ? (
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)} className={`w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === idx ? "border-[#042A55]" : "border-transparent hover:border-gray-300"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {product.sku && <div className="mb-1"><span className="text-sm text-gray-500">SKU: {product.sku}</span></div>}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

          {product.shortnote && <p className="text-sm text-gray-500 mb-3">{product.shortnote}</p>}

          {/* Rating */}
          {(product?.rating || 0) > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating} ({reviewsCount} reviews)</span>
            </div>
          )}

          {/* Price */}
          {price != null && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-[#042A55]">${price}</span>
              {originalPrice != null && price !== originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">${originalPrice}</span>
                  <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-0.5 rounded">{Math.round(((parseFloat(originalPrice) - parseFloat(price)) / parseFloat(originalPrice)) * 100)}% OFF</span>
                </>
              )}
            </div>
          )}

          {/* Description */}
          <div className="text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: product.description }} />

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Color: <span className="font-normal text-gray-600">{product.colors[selectedColor]}</span></h3>
              <div className="flex gap-2">
                {product.colors.map((color, idx) => (
                  <button key={color} onClick={() => setSelectedColor(idx)} className={`w-10 h-10 rounded-full border-2 transition-colors ${selectedColor === idx ? "border-[#042A55] ring-2 ring-[#042A55]/20" : "border-gray-300 hover:border-gray-400"}`} style={{ backgroundColor: color === "Black" ? "#1a1a1a" : color === "Silver" ? "#c0c0c0" : "#1e3a5f" }} />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-50 transition-colors"><Minus size={16} /></button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(getStock(product), quantity + 1))} className="p-3 hover:bg-gray-50 transition-colors"><Plus size={16} /></button>
              </div>
              <span className="text-sm text-gray-500">{getStock(product)} items in stock</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button onClick={() => { if (inCart) { removeFromCart(product.id); setInCart(false); } else { addToCart(product.id, quantity); setInCart(true); } }} className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-lg transition-colors ${inCart ? "bg-red-500 hover:bg-red-600 text-white" : "bg-[#042A55] hover:bg-[#063C76] text-white"}`}>
              <ShoppingCart size={20} />
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
            <button onClick={() => toggleWishlistItem(product.id)} className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Heart size={20} className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""} />
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
            {[{ icon: Truck, text: "Free Shipping" }, { icon: RotateCcw, text: "30-Day Returns" }, { icon: Shield, text: "2-Year Warranty" }].map((item) => (
              <div key={item.text} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
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
            <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab ? "border-[#042A55] text-[#042A55]" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {tab} {tab === "reviews" && `(${reviewsCount})`}
            </button>
          ))}
        </div>
        <div className="py-6">
          {activeTab === "description" && (
            <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: product.description }} />
          )}
          {activeTab === "features" && (
            product.features && product.features.length > 0 ? (
              <ul className="space-y-2">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-[#042A55] rounded-full" />
                    {feat}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No features available.</p>
            )
          )}
          {activeTab === "reviews" && (
            reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{review.title || review.author}</span>
                    </div>
                    {review.comment && <p className="text-sm text-gray-600 mb-2">{review.comment}</p>}
                    <p className="text-xs text-gray-400">By {review.author} &middot; {review.date || ""}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )
          )}
        </div>
      </div>

      {/* Related Products */}
      {(() => {
        const related = categoryProducts?.data?.content || categoryProducts?.data;
        if (!related || related.length === 0) return null;
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {related.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
