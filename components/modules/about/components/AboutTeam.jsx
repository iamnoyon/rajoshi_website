import React from 'react'

const AboutTeam = () => {
    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 py-12" id="careers">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                    Meet Our Team
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { name: "Sarah Johnson", role: "CEO & Founder" },
                        { name: "Mike Chen", role: "CTO" },
                        { name: "Emily Davis", role: "Head of Design" },
                        { name: "James Wilson", role: "Head of Operations" },
                    ].map((member) => (
                        <div key={member.name} className="text-center">
                            <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-3">
                                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-full" />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-sm">
                                {member.name}
                            </h3>
                            <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default AboutTeam