import BranchManagerSidebar from '@/components/manager/BranchManagerSidebar';
import React from 'react';

const RestaurantBranchEditPage = async ({ params, children }) => {
    const { branchId } = await params;
    return (
        <div className='flex'>
            <BranchManagerSidebar branchId={branchId}></BranchManagerSidebar>
            <div className='w-full'>
                {children}
            </div>
        </div>
    );
};

export default RestaurantBranchEditPage;