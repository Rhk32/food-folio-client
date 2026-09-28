import { getCurrentUser } from '@/api/userActions';
import React from 'react';

const BranchLayout = async ({ children }) => {
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

export default BranchLayout;