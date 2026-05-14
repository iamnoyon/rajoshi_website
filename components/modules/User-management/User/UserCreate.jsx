"use client";

import CardLayout from '@/components/common/CardLayout'
import React from 'react'
import { User } from "lucide-react";
import { breadcrumbList } from '@/components/layouts/breadcrumbList';
import useBreadcrumb from '@/components/hooks/useBreadcurmb';

const UserCreate = () => {
    useBreadcrumb(breadcrumbList?.userCreate);
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
