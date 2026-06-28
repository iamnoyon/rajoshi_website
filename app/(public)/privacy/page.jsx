import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-[#042A55] to-[#063C76] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-white/80 mt-2">Last updated: January 2024</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-gray max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including:
          </p>
          <ul>
            <li>Name, email address, and contact information</li>
            <li>Shipping and billing addresses</li>
            <li>Payment information (processed securely)</li>
            <li>Account credentials</li>
            <li>Communication preferences</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Send order updates and shipping notifications</li>
            <li>Provide customer support</li>
            <li>Improve our products and services</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Detect and prevent fraud</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul>
            <li>Payment processors for transaction processing</li>
            <li>Shipping carriers for order delivery</li>
            <li>Service providers who assist in our operations</li>
            <li>Law enforcement when required by law</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal information. This includes SSL encryption, secure data
            storage, and regular security audits. However, no method of
            transmission over the Internet is 100% secure.
          </p>

          <h2>5. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience
            on our website. Cookies help us remember your preferences, analyze
            site traffic, and personalize content. You can control cookies
            through your browser settings.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
            <li>Export your data</li>
          </ul>

          <h2>7. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to
            provide our services and fulfill the purposes described in this
            policy. Order data is retained for 7 years for tax and legal
            compliance.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            Our website is not intended for children under 13. We do not
            knowingly collect personal information from children. If you
            believe we have collected information from a child, please contact
            us immediately.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will
            notify you of any material changes by posting the new policy on
            this page and updating the &quot;Last updated&quot; date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact
            us at <strong>privacy@ecommerce.com</strong> or visit our{" "}
            <Link href="/contact" className="text-[#042A55] hover:underline">
              Contact Page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
