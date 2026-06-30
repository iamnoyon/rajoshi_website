import React from 'react'

const AboutStatsCard = () => {
    const stats = [
        { label: "Happy Customers", value: "50K+" },
        { label: "Products Sold", value: "200K+" },
        { label: "Countries", value: "30+" },
        { label: "Years Experience", value: "5+" },
    ];
    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center p-6 bg-gray-50 rounded-xl">
                            <p className="text-3xl font-bold text-[#042A55]">{stat.value}</p>
                            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default AboutStatsCard