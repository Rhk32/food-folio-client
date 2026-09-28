import { redirect } from 'next/navigation';
import React from 'react';

const DefaultSettingsRoute = () => {
    redirect('/profile/settings/basic-info');
};

export default DefaultSettingsRoute;