import React from 'react';

const RestaurantBranchEditPage = async ({ params }) => {
    const { branchId } = await params;
    return (
        <div>
            {branchId}
        </div>
    );
};

export default RestaurantBranchEditPage;