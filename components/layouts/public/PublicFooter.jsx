import Link from "next/link";
import {
  Globe,
  MessageCircle,
  Camera,
  Play,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/shop" },
    { name: "New Arrivals", href: "/shop?sort=newest" },
    { name: "Best Sellers", href: "/shop?sort=bestselling" },
    { name: "Sale", href: "/shop?sale=true" },
  ],
  account: [
    { name: "My Account", href: "/account" },
    { name: "Order History", href: "/account/orders" },
    { name: "Wishlist", href: "/account/wishlist" },
    { name: "Track Order", href: "/account/orders" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Careers", href: "/about#careers" },
  ],
  legal: [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Return Policy", href: "/terms#returns" },
    { name: "Shipping Policy", href: "/terms#shipping" },
  ],
};

export default function PublicFooter() {
  return (
    <footer className="bg-[#042A55] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold">Stay in the loop</h3>
              <p className="text-white/70 text-sm">
                Subscribe to our newsletter for the latest deals and new arrivals.
              </p>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-white text-[#042A55] rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <h2 className="text-xl font-bold mb-4">EcommerceStore</h2>
            <p className="text-white/70 text-sm mb-4">
              Your one-stop shop for quality products at unbeatable prices.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Globe size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Camera size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Play size={16} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Account
            </h4>
            <ul className="space-y-2">
              {footerLinks.account.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Phone size={14} />
                +1 (555) 123-4567
              </span>
              <span className="flex items-center gap-2">
                <Mail size={14} />
                support@ecommerce.com
              </span>
              <span className="hidden sm:flex items-center gap-2">
                <MapPin size={14} />
                123 Store Street, City, Country
              </span>
            </div>
            <p>&copy; {new Date().getFullYear()} EcommerceStore. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
