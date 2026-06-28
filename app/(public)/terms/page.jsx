import Link from "next/link";

export default function TermsPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-[#042A55] to-[#063C76] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold">
            Terms & Conditions
          </h1>
          <p className="text-white/80 mt-2">Last updated: January 2024</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-gray max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using EcommerceStore, you agree to be bound by
            these Terms and Conditions. If you do not agree to these terms,
            please do not use our website.
          </p>

          <h2>2. Use of Website</h2>
          <p>
            You agree to use our website only for lawful purposes and in
            accordance with these Terms. You are responsible for maintaining
            the confidentiality of your account credentials.
          </p>

          <h2>3. Products and Pricing</h2>
          <p>
            All product descriptions, images, and specifications are subject to
            change without notice. We reserve the right to modify prices at any
            time. In the event of a pricing error, we reserve the right to
            cancel any orders placed at the incorrect price.
          </p>

          <h2>4. Orders and Payment</h2>
          <p>
            By placing an order, you are making an offer to purchase a product.
            We reserve the right to accept or decline any order. Payment must
            be received in full before products are shipped.
          </p>

          <h2 id="shipping">5. Shipping Policy</h2>
          <p>
            We offer the following shipping options:
          </p>
          <ul>
            <li><strong>Standard Shipping:</strong> 5-7 business days (free on orders over $50)</li>
            <li><strong>Express Shipping:</strong> 2-3 business days ($19.99)</li>
            <li><strong>Overnight Shipping:</strong> 1 business day ($39.99)</li>
          </ul>
          <p>
            Shipping times are estimates and may vary based on location and
            product availability. We are not responsible for delays caused by
            shipping carriers.
          </p>

          <h2 id="returns">6. Return Policy</h2>
          <p>
            We accept returns within 30 days of delivery for most items. To be
            eligible for a return:
          </p>
          <ul>
            <li>Items must be in original condition with tags attached</li>
            <li>Items must not be worn, washed, or altered</li>
            <li>You must have the original receipt or proof of purchase</li>
          </ul>
          <p>
            Return shipping costs are the responsibility of the customer unless
            the return is due to our error.
          </p>

          <h2>7. Refunds</h2>
          <p>
            Refunds are processed within 3-5 business days after we receive
            your returned item. The refund will be credited to your original
            payment method. Shipping costs are non-refundable.
          </p>

          <h2>8. Warranties</h2>
          <p>
            Products are covered by the manufacturer&apos;s warranty. We also
            offer an optional extended warranty on select items. Warranty
            claims must be filed through our customer service team.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            EcommerceStore shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising from your use
            of our website or products.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. Changes
            will be effective immediately upon posting. Your continued use of
            the website constitutes acceptance of the updated Terms.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If you have any questions about these Terms, please{" "}
            <Link href="/contact" className="text-[#042A55] hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
