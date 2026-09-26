import { getCurrentUser } from '@/api/userActions';
import AdminDashboardSidebar from '@/components/admin/AdminDashboardSidebar';
import { redirect } from 'next/navigation';
import React from 'react';

const AdminLayout = async ({ children }) => {
    const user = await getCurrentUser();
    if (user?.role !== 'admin') {
        redirect('/unauthorized');
    }
    return (
        <div className='flex'>
            <AdminDashboardSidebar></AdminDashboardSidebar>
            <div className='w-full'>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;