'use server';

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