'use server';

import { getToken } from "./authActions";

export const getMenuItemsByBranchId = async (branchId) => {
    if (!branchId) {
        return [];
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu/${branchId}`,
            {
                method: 'GET',
                cache: 'no-store',
            }
        );

        if (!res.ok) {
            console.error(
                'Failed to fetch menu items:',
                res.status,
                res.statusText
            );

            return [];
        }

        const data = await res.json();

        return data.menuItems ?? [];
    } catch (error) {
        console.error(
            'Error fetching menu items:',
            error
        );

        return [];
    }
};

export const createMenuItem = async (menuItemData) => {
    const token = await getToken();

    if (!token) {
        return {
            success: false,
            message: 'Authentication required',
        };
    }

    if (!menuItemData?.branch_id) {
        return {
            success: false,
            message: 'Branch ID is required',
        };
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menuItemData),
                cache: 'no-store',
            }
        );

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message:
                    data.message || 'Failed to create menu item',
            };
        }

        return {
            success: true,
            message: data.message || 'Menu item created successfully',
            menuItem: data.menuItem,
        };
    } catch (error) {
        console.error('Error creating menu item:', error);

        return {
            success: false,
            message: 'Something went wrong while creating the menu item',
        };
    }
};

export const getMenuItemByMenuItemId = async (menuItemId) => {
    if (!menuItemId) {
        return null;
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu/item/${menuItemId}`,
            {
                method: 'GET',
                cache: 'no-store',
            }
        );

        if (!res.ok) {
            console.error(
                'Failed to fetch menu item:',
                res.status,
                res.statusText
            );

            return null;
        }

        const data = await res.json();

        return data.menuItem ?? null;
    } catch (error) {
        console.error('Error fetching menu item:', error);
        return null;
    }
};

export const postEditedMenuItem = async (data) => {

};