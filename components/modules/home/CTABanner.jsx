import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="bg-gradient-to-r from-[#042A55] to-[#063C76] rounded-2xl p-8 md:p-12 text-white">
        <div className="max-w-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Special Offer!</h2>
          <p className="text-white/80 mb-6">
            Get 20% off your first order. Use code{" "}
            <span className="font-mono bg-white/20 px-2 py-0.5 rounded">WELCOME20</span>{" "}
            at checkout.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white text-[#042A55] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop the Sale <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
