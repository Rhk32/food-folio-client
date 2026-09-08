import { getCurrentUser } from '@/api/userActions';
import SettingsSideBar from '@/components/settings/SettingsSideBar';
import { redirect } from 'next/navigation';
import React from 'react';

const SettingsLayout = async ({ children }) => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        redirect('/login');
    }
    return (
        <div className='flex'>
            <SettingsSideBar></SettingsSideBar>
            <div className='w-full'>
                {children}
            </div>
        </div>
    );
};

export default SettingsLayout;