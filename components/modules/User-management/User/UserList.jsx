"use client";

import CardLayout from '@/components/common/CardLayout'
import React from 'react'
import { Plus, List } from "lucide-react";
import useBreadcrumb from '@/components/hooks/useBreadcurmb';
import { breadcrumbList } from '@/components/layouts/breadcrumbList';

const UserList = () => {
    useBreadcrumb(breadcrumbList?.userList);
    return (
        <CardLayout
            title="User List"
            titleIcon={List}
            buttonText="Add User"
            buttonIcon={Plus}
            buttonHref="/user-management/users/create"
        >
            Hi
        </CardLayout>
    )
}

export default UserList