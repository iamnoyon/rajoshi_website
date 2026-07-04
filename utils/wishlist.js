const WISHLIST_KEY = "wishlist";
const COOKIE_MAX_AGE = 31536000;

export function getWishlistItems() {
  if (typeof document === "undefined") return [];
  const saved = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${WISHLIST_KEY}=`));
  if (!saved) return [];
  const parsed = JSON.parse(saved.split("=")[1]);
  return parsed.map((item) => typeof item === "string" ? { id: item } : item);
}

function setWishlistItems(items) {
  document.cookie = `${WISHLIST_KEY}=${JSON.stringify(items)}; path=/; max-age=${COOKIE_MAX_AGE}`;
  window.dispatchEvent(new Event("wishlist-updated"));
}

export function toggleWishlistItem(product) {
  const current = getWishlistItems();
  const existing = current.find((item) => item.id === product.id);
  let updated;
  if (existing) {
    updated = current.filter((item) => item.id !== product.id);
  } else {
    updated = [...current, { id: product.id, name: product.name, price: product.price, discountPrice: product.discountPrice, images: product.images, category: product.category, tags: product.tags }];
  }
  setWishlistItems(updated);
  return updated;
}

export function removeFromWishlist(id) {
  const updated = getWishlistItems().filter((item) => item.id !== id);
  setWishlistItems(updated);
}

export function isInWishlist(id) {
  return getWishlistItems().some((item) => item.id === id);
}

export function getWishlistCount() {
  return getWishlistItems().length;
}

export function onWishlistUpdate(callback) {
  const handler = () => setTimeout(callback, 0);
  window.addEventListener("wishlist-updated", handler);
  return () => window.removeEventListener("wishlist-updated", handler);
}
