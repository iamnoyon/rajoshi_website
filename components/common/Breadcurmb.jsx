"use client";

import React from 'react'
import Link from "next/link"
import {ChevronRight} from "lucide-react"

const Breadcurmb = ({ items }) => {
    return (
        <nav className="flex items-center gap-1 text-sm">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center gap-1">
                        {/* Separator */}
                        {index !== 0 && (
                            <span className="text-[#02162e]"><ChevronRight size={18}/></span>
                        )}

                        {/* Last item — disabled, no link */}
                        {isLast ? (
                            <span className="text-gray-400 cursor-default">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-[#02162e] hover:underline text-sm font-semibold"
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    )
}

export default Breadcurmb