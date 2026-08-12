import React from 'react';
import { cookies } from 'next/headers';
import NavbarHelper from './NavbarHelper';
import { getCurrentUser } from '@/actions/userActions';

const Navbar = async () => {
    const user = await getCurrentUser();

    return (
        <>
            <NavbarHelper user={user}></NavbarHelper>
        </>
    );
};

export default Navbar;
