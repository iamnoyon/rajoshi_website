const WISHLIST_KEY = "wishlist";
const COOKIE_MAX_AGE = 31536000;

export function getWishlistIds() {
  if (typeof document === "undefined") return [];
  const saved = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${WISHLIST_KEY}=`));
  return saved ? JSON.parse(saved.split("=")[1]) : [];
}

export function setWishlistIds(ids) {
  document.cookie = `${WISHLIST_KEY}=${JSON.stringify(ids)}; path=/; max-age=${COOKIE_MAX_AGE}`;
  window.dispatchEvent(new Event("wishlist-updated"));
}

export function addToWishlist(id) {
  const current = getWishlistIds();
  if (!current.includes(id)) {
    setWishlistIds([...current, id]);
  }
}

export function removeFromWishlist(id) {
  const updated = getWishlistIds().filter((wid) => wid !== id);
  setWishlistIds(updated);
}

export function toggleWishlistItem(id) {
  const current = getWishlistIds();
  const updated = current.includes(id)
    ? current.filter((wid) => wid !== id)
    : [...current, id];
  setWishlistIds(updated);
  return updated;
}

export function isInWishlist(id) {
  return getWishlistIds().includes(id);
}

export function getWishlistCount() {
  return getWishlistIds().length;
}

export function onWishlistUpdate(callback) {
  const handler = () => setTimeout(callback, 0);
  window.addEventListener("wishlist-updated", handler);
  return () => window.removeEventListener("wishlist-updated", handler);
}
