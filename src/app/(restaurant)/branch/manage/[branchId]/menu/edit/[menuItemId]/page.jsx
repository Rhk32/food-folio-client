import { getMenuItemByMenuItemId } from '@/api/menuActions';
import React from 'react';
import EditMenuForm from './EditMenuForm';

const MenuItemEditPage = async ({ params }) => {
    const { menuItemId } = await params;
    const menuItem = await getMenuItemByMenuItemId(menuItemId);
    return (
        <EditMenuForm menuItem={menuItem}></EditMenuForm>
    );
};

export default MenuItemEditPage;