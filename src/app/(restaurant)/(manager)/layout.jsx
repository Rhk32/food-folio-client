import { getCurrentUser } from '@/api/userActions';
import { redirect } from 'next/navigation';
import React from 'react';

const ManagerLayout = async ({ children }) => {
    const user = await getCurrentUser();
    if (user.role !== 'manager') {
        redirect('/unauthorized');
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default ManagerLayout;