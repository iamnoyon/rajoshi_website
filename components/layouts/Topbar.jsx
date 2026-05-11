// components/layout/Topbar.jsx
"use client";

import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Topbar() {
    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);

    // Close dropdown outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
            {/* Left */}
            <div>
                <h1 className="text-lg font-semibold text-gray-800">
                    Admin Dashboard
                </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                {/* Notification */}
                <button className="relative rounded-full p-2 transition hover:bg-gray-100">
                    <Bell size={20} className="text-gray-600" />

                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-gray-100"
                    >
                        {/* Avatar */}
                        <div className="hover:cursor-pointer">
                            <Image
                                src="/profile.png"
                                alt="User Avatar"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </div>
                    </button>

                    {/* Dropdown */}
                    {open && (
                        <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-2xl border bg-white shadow-xl">
                            {/* User Info */}
                            <div className="border-b px-4 py-4">
                                <p className="text-sm font-semibold text-gray-800">
                                    Admin User
                                </p>
                                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                                    <span className="text-xs text-gray-500">
                                        admin@gmail.com
                                    </span>
                                    <span className="font-bold">|</span>
                                    <span>Admin</span>
                                </div>
                            </div>

                            {/* Menu */}
                            <div className="p-2">
                                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 hover:cursor-pointer">
                                    <User size={18} />
                                    Profile
                                </button>

                                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-500 transition hover:bg-red-50 hover:cursor-pointer">
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}