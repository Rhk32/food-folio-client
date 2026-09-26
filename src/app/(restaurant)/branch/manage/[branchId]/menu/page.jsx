import Link from 'next/link';
import React from 'react';

const BranchMenuDisplayPage = async ({ params }) => {
    const { branchId } = await params;
    return (
        <div>
            menu
            <Link href={`/branch/manage/${branchId}/menu/add`}>add menu page</Link>
        </div>
    );
};

export default BranchMenuDisplayPage;