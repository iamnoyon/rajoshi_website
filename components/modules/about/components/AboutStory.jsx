import React from 'react'

const AboutStory = () => {
    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                Founded in 2019, EcommerceStore started with a simple idea:
                                create an online shopping experience that puts customers first.
                                What began as a small passion project has grown into a thriving
                                marketplace serving customers across the globe.
                            </p>
                            <p>
                                We believe that shopping online should be simple, enjoyable, and
                                trustworthy. That&apos;s why we&apos;ve built our platform around
                                three core principles: quality products, transparent pricing, and
                                exceptional customer service.
                            </p>
                            <p>
                                Every product in our catalog is carefully vetted to meet our
                                quality standards. We work directly with manufacturers and
                                trusted suppliers to bring you the best products at fair prices.
                            </p>
                        </div>
                    </div>
                    <div className="aspect-video bg-gray-100 rounded-xl">
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutStory