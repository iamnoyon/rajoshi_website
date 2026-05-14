"use client";

import CardLayout from '@/components/common/CardLayout'
import React from 'react'
import { ArrowLeft, User } from "lucide-react";

const UserCreate = () => {
    return (
        <CardLayout
            title="Add User"
            titleIcon={User}
            // buttonText="Back"
            // buttonIcon={ArrowLeft}
            // buttonHref="/user-management/users"
        >
            Hi
        </CardLayout>
    )
}

export default UserCreate
