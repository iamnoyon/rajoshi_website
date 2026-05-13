"use client";

import {
    User,
    Mail,
    Shield,
    CreditCard,
    Calendar,
    MapPin,
    Lock,
} from "lucide-react";
import Image from "next/image";

import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function ProfilePage() {
    const user = useSelector((state) => state?.user);

    const fileRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    // handle image select
    const handleImageChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // basic validation
        if (!selectedFile.type.startsWith("image/")) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleUpload = () => {
        if (!file) return;

        // TODO: call API here
        console.log("Uploading file:", file);
    };

    return (
        <div className="h-screen overflow-hidden bg-gray-50 p-3 md:p-4 flex flex-col rounded">
            <div className="mx-auto w-full max-w-5xl flex-1 flex flex-col">

                {/* Header */}
                <div className="mb-4 rounded-xl border bg-white px-5 py-4 shadow-sm flex justify-between">
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                        {/* Avatar */}
                        <div className="relative">
                            <div
                                onClick={() => fileRef.current.click()}
                                className="flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-700"
                            >
                                {preview ? (
                                    <Image
                                        src={preview}
                                        alt="avatar"
                                        fill
                                        className="h-full w-full object-cover rounded-full"
                                    />
                                ) : (
                                    <User size={28} />
                                )}
                            </div>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </div>

                        {/* Info */}
                        <div className="text-center md:text-left">
                            <h1 className="text-lg font-semibold text-gray-800">
                                {user?.name}
                            </h1>

                            <p className="mt-0.5 text-sm text-gray-500">
                                {user?.email}
                            </p>

                            <span className="mt-2 inline-flex rounded-full border bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-600">
                                {user?.role}
                            </span>
                        </div>
                    </div>
                    <div>
                        <button className="bg-[#042A55] py-2 px-5 rounded hover:cursor-pointer hover:bg-[#053d7e]">Update</button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid flex-1 gap-4 lg:grid-cols-3 overflow-hidden">

                    {/* Personal Info */}
                    <div className="lg:col-span-2 rounded-xl border bg-white p-5 shadow-sm overflow-auto">

                        <div className="mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-gray-100 p-2 text-gray-700">
                                <User size={16} />
                            </div>
                            <h2 className="text-base font-semibold text-gray-800">
                                Personal Information
                            </h2>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { label: "Full Name", value: user?.name, icon: User },
                                { label: "Email Address", value: user?.email, icon: Mail },
                                { label: "Role", value: user?.role, icon: Shield },
                                { label: "NID Number", value: user?.nid, icon: CreditCard },
                                { label: "Date of Birth", value: user?.dob, icon: Calendar },
                                { label: "Address", value: user?.address, icon: MapPin },
                            ].map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div key={index}>
                                        <label className="mb-1.5 block text-xs font-medium text-gray-500">
                                            {item.label}
                                        </label>

                                        <div className="flex items-center gap-2 rounded-xl border bg-gray-50 px-3 py-2.5">
                                            <Icon size={15} className="text-gray-400" />
                                            <span className="truncate text-sm text-gray-700">
                                                {item.value || "-"}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm overflow-auto">

                        <div className="mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-red-100 p-2 text-red-600">
                                <Lock size={16} />
                            </div>
                            <h2 className="text-base font-semibold text-gray-800">
                                Change Password
                            </h2>
                        </div>

                        <form className="space-y-3">
                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-500">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-500">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-black"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}