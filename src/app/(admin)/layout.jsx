import { getCurrentUser } from '@/api/userActions';
import { redirect } from 'next/navigation';
import React from 'react';

const AdminLayout = async ({ children }) => {
    const user = await getCurrentUser();
    if (user?.role !== 'admin') {
        redirect('/unauthorized');
    }
    return (
        <>
            {children}
        </>
    );
};

export default AdminLayout;