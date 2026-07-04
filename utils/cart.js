const CART_KEY = "cart";
const COOKIE_MAX_AGE = 31536000;

export function getCartItems() {
  if (typeof document === "undefined") return [];
  const saved = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CART_KEY}=`));
  return saved ? JSON.parse(saved.split("=")[1]) : [];
}

function setCartItems(items) {
  document.cookie = `${CART_KEY}=${JSON.stringify(items)}; path=/; max-age=${COOKIE_MAX_AGE}`;
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(id, quantity = 1) {
  const current = getCartItems();
  const existing = current.find((item) => item.id === id);
  let updated;
  if (existing) {
    updated = current.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + quantity } : item
    );
  } else {
    updated = [...current, { id, quantity }];
  }
  setCartItems(updated);
  return updated;
}

export function removeFromCart(id) {
  const updated = getCartItems().filter((item) => item.id !== id);
  setCartItems(updated);
  return updated;
}

export function updateCartQuantity(id, quantity) {
  if (quantity <= 0) return removeFromCart(id);
  const updated = getCartItems().map((item) =>
    item.id === id ? { ...item, quantity } : item
  );
  setCartItems(updated);
  return updated;
}

export function getCartCount() {
  return getCartItems().reduce((sum, item) => sum + item.quantity, 0);
}

export function isInCart(id) {
  return getCartItems().some((item) => item.id === id);
}

export function onCartUpdate(callback) {
  const handler = () => setTimeout(callback, 0);
  window.addEventListener("cart-updated", handler);
  return () => window.removeEventListener("cart-updated", handler);
}
