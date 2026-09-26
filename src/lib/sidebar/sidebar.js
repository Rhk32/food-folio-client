import { GitBranch, LayoutDashboard, Lock, MessageSquareQuote, Store, User, UtensilsCrossed } from "lucide-react";

export const getSidebarNavLinks = () => {
    const navItems = [
        {
            name: 'Basic Information',
            href: '/profile/settings/basic-info',
            icon: User,
        },
        {
            name: 'Password',
            href: '/profile/settings/password',
            icon: Lock,
        },
    ];
    return navItems;
};

export const getAdminSidebarLinks = () => {
    const navItems = [
        {
            name: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutDashboard
        },
        {
            name: 'Unapproved Restaurants',
            href: '/admin/unapproved-restaurants',
            icon: Store
        }
    ];
    return navItems;
};

export const getRestaurantManagerSidebarItems = (restaurantId) => {
    const navItems = [
        {
            name: 'Branches',
            href: `/manage/${restaurantId}`,
            icon: GitBranch,
            exact: true, // Used to match exact root manage path
        },
        {
            name: 'Pending Reviews',
            href: `/manage/${restaurantId}/reviews`,
            icon: MessageSquareQuote,
        },
        {
            name: 'Cuisines',
            href: `/manage/${restaurantId}/cuisine`,
            icon: UtensilsCrossed,
        },
    ];
    return navItems;
};