import React from 'react'
import { Truck, Shield, RotateCcw, Headphones, Users, Target, Award } from "lucide-react";


const AboutValue = () => {
    return (
        <div> <section className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                    Our Values
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Target,
                            title: "Customer First",
                            desc: "Every decision we make starts with our customers. Your satisfaction is our top priority.",
                        },
                        {
                            icon: Award,
                            title: "Quality Assurance",
                            desc: "We carefully curate every product to ensure it meets our high standards of quality.",
                        },
                        {
                            icon: Users,
                            title: "Community Driven",
                            desc: "We believe in building a community of happy shoppers and sellers who support each other.",
                        },
                    ].map((value) => (
                        <div
                            key={value.title}
                            className="bg-white p-6 rounded-xl border border-gray-200"
                        >
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                                <value.icon size={24} className="text-[#042A55]" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                            <p className="text-sm text-gray-600">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section></div>
    )
}

export default AboutValue