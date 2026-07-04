const COUPON_KEY = "applied_coupon";
const COOKIE_MAX_AGE = 31536000;

const coupons = {
  WELCOME20: { type: "percent", value: 20, label: "20% off" },
  FLAT10: { type: "flat", value: 10, label: "$10 off" },
  FREESHIP: { type: "freeshipping", value: 0, label: "Free shipping" },
};

export function validateCoupon(code) {
  const upper = code.trim().toUpperCase();
  if (coupons[upper]) {
    return { valid: true, code: upper, ...coupons[upper] };
  }
  return { valid: false, message: "Invalid coupon code" };
}

export function applyCoupon(code) {
  const result = validateCoupon(code);
  if (result.valid) {
    document.cookie = `${COUPON_KEY}=${JSON.stringify({ code: result.code, type: result.type, value: result.value, label: result.label })}; path=/; max-age=${COOKIE_MAX_AGE}`;
    window.dispatchEvent(new Event("coupon-updated"));
  }
  return result;
}

export function getAppliedCoupon() {
  if (typeof document === "undefined") return null;
  const saved = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COUPON_KEY}=`));
  return saved ? JSON.parse(saved.split("=").slice(1).join("=")) : null;
}

export function removeCoupon() {
  document.cookie = `${COUPON_KEY}=; path=/; max-age=0`;
  window.dispatchEvent(new Event("coupon-updated"));
}

export function calculateDiscount(coupon, subtotal) {
  if (!coupon) return 0;
  if (coupon.type === "percent") {
    return subtotal * (coupon.value / 100);
  }
  if (coupon.type === "flat") {
    return Math.min(coupon.value, subtotal);
  }
  return 0;
}

export function onCouponUpdate(callback) {
  const handler = () => setTimeout(callback, 0);
  window.addEventListener("coupon-updated", handler);
  return () => window.removeEventListener("coupon-updated", handler);
}
