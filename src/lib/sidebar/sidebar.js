import { Lock, User } from "lucide-react";

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