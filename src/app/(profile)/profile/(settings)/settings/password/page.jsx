import { getCurrentUser } from '@/api/userActions';
import EditPasswordPage from '@/components/settings/EditPasswordPage';
import React from 'react';

const EditPasswordRootPage = async () => {
    const user = await getCurrentUser();
    return (
        <>
            <EditPasswordPage user={user}></EditPasswordPage>
        </>
    );
};

export default EditPasswordRootPage;