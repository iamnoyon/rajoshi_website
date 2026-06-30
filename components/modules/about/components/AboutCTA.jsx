import Link from 'next/link'
import React from 'react'

const AboutCTA = () => {
    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-[#042A55] rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-2xl font-bold mb-3">Join Our Journey</h2>
                    <p className="text-white/80 mb-6 max-w-lg mx-auto">
                        Whether you&apos;re shopping or looking to sell, we&apos;d love to
                        have you as part of our growing community.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/shop"
                            className="bg-white text-[#042A55] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Start Shopping
                        </Link>
                        <Link
                            href="/contact"
                            className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutCTA