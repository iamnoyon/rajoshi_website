"use client";

import { useChangePasswordMutation } from "@/components/store/auth";
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

    const [password, setPassword] = useState({
        new_password: "",
        confirm_password: "",
    });

    // api
    const [ChangePassword] = useChangePasswordMutation()

    const handleImageChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleUpdate = () => {
        console.log("upload");
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        if(password?.new_password === password.confirm_password){
            ChangePassword(password)
            .unwrap()
            .then(res=>{
                if(res?.success == true || res?.status_code == 200){
                    alert('Password changed.')
                    window.location.reload()
                }
            })
            .catch(err=>{
                console.log(err.message);
            })
        }else{
            alert("New & Confirm password are not same")
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-3 sm:p-4 flex flex-col">
            <div className="mx-auto w-full max-w-5xl flex-1 flex flex-col gap-4">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border bg-white px-4 py-4 shadow-sm">

                    {/* LEFT */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">

                        {/* Avatar */}
                        <div className="relative">
                            <div
                                onClick={() => fileRef.current.click()}
                                className="relative flex h-16 w-16 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100"
                            >
                                {preview ? (
                                    <Image
                                        src={preview}
                                        alt="avatar"
                                        fill
                                        className="object-cover"
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

                        {/* INFO */}
                        <div className="text-center sm:text-left">
                            <h1 className="text-lg font-semibold text-gray-800">
                                {user?.name}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {user?.email}
                            </p>
                            <span className="mt-2 inline-flex rounded-full border bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-600">
                                {user?.role}
                            </span>
                        </div>
                    </div>

                    {/* RIGHT BUTTON */}
                    <button
                        onClick={handleUpdate}
                        className="w-full sm:w-auto bg-[#042A55] text-white py-2 px-5 rounded-md hover:bg-[#053d7e]"
                    >
                        Update
                    </button>
                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">

                    {/* PERSONAL INFO */}
                    <div className="lg:col-span-2 rounded-xl border bg-white p-4 sm:p-5 shadow-sm overflow-auto">

                        <div className="mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-gray-100 p-2 text-gray-700">
                                <User size={16} />
                            </div>
                            <h2 className="text-base font-semibold text-gray-800">
                                Personal Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

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

                    {/* PASSWORD */}
                    <div className="rounded-xl border bg-white p-4 sm:p-5 shadow-sm">

                        <div className="mb-4 flex items-center gap-2">
                            <div className="rounded-lg bg-red-100 p-2 text-red-600">
                                <Lock size={16} />
                            </div>
                            <h2 className="text-base font-semibold text-gray-800">
                                Change Password
                            </h2>
                        </div>

                        <form onSubmit={handleChangePassword} className="space-y-3">

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-500">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={password.new_password}
                                    onChange={(e) =>
                                        setPassword((prev) => ({
                                            ...prev,
                                            new_password: e.target.value,
                                        }))
                                    }
                                    className="w-full rounded-lg border p-2 text-sm text-black"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-medium text-gray-500">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={password.confirm_password}
                                    onChange={(e) =>
                                        setPassword((prev) => ({
                                            ...prev,
                                            confirm_password: e.target.value,
                                        }))
                                    }
                                    className="w-full rounded-lg border p-2 text-sm text-black"
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