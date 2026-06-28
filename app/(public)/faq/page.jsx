"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";

const faqCategories = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-7 business days. Express shipping delivers within 2-3 business days. Overnight shipping delivers the next business day.",
      },
      {
        q: "How can I track my order?",
        a: "Once your order ships, you'll receive a tracking number via email. You can also track your order in your account under 'My Orders'.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to over 30 countries worldwide. International shipping rates and delivery times vary by destination.",
      },
      {
        q: "What is your shipping policy?",
        a: "We offer free standard shipping on orders over $50. For orders under $50, a flat rate of $9.99 applies for standard shipping.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy on most items. Items must be in their original condition with tags attached.",
      },
      {
        q: "How do I initiate a return?",
        a: "Log into your account, go to 'My Orders', select the order, and click 'Return Item'. Follow the instructions to print your return label.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are processed within 3-5 business days after we receive your returned item. The refund will be credited to your original payment method.",
      },
    ],
  },
  {
    category: "Account & Payment",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click 'Register' on the top right of our website. Fill in your details and you're ready to start shopping!",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, all transactions are encrypted with SSL technology. We never store your full credit card details on our servers.",
      },
    ],
  },
  {
    category: "Products",
    questions: [
      {
        q: "Are your products authentic?",
        a: "Yes, all our products are sourced directly from manufacturers or authorized distributors. We guarantee authenticity.",
      },
      {
        q: "Do you offer product warranties?",
        a: "Most products come with a manufacturer's warranty. Additionally, we offer a 2-year extended warranty on select items.",
      },
      {
        q: "Can I request a product not listed?",
        a: "Absolutely! Contact us with the product details and we'll do our best to source it for you.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqCategories
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.questions.length > 0);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#042A55] to-[#063C76] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-white/80 text-lg">
              Find answers to common questions. Can&apos;t find what you&apos;re
              looking for?{" "}
              <Link href="/contact" className="underline hover:text-white">
                Contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Search */}
        <div className="relative mb-8">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-8">
          {filteredFAQs.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {cat.category}
              </h2>
              <div className="space-y-2">
                {cat.questions.map((faq, idx) => {
                  const globalIdx = `${cat.category}-${idx}`;
                  const isOpen = openIndex === globalIdx;
                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setOpenIndex(isOpen ? null : globalIdx)
                        }
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 text-sm pr-4">
                          {faq.q}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-gray-400 flex-shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No results found for &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Our support team is here to help you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#042A55] hover:bg-[#063C76] text-white font-semibold py-2.5 px-6 rounded-lg transition-colors text-sm"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
