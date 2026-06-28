"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-[#042A55]">
              EcommerceStore
            </h1>
          </Link>
          <h2 className="text-xl font-bold text-gray-900 mt-4">
            Forgot Password?
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Check Your Email
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-medium text-gray-700">{email}</span>
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-[#042A55] hover:underline font-medium"
              >
                Didn&apos;t receive the email? Try again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#042A55] hover:bg-[#063C76] text-white font-semibold py-2.5 rounded-lg transition-colors"
              >
                Send Reset Link
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link
            href="/auth/login"
            className="text-[#042A55] font-semibold hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
