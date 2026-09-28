'use server';

import { getToken } from "./authActions";

export async function updateProfileBasicInfo(data) {
    try {
        const token = await getToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || 'Failed to update profile.');
        }

        return { success: true, data: result };
    } catch (error) {
        console.error('Profile update error:', error.message);
        return { success: false, message: error.message };
    }
}

export const updatePassword = async (data) => {
    try {
        const token = await getToken();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/edit/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || 'Failed to update password.');
        }

        return { success: true, data: result };
    } catch (error) {
        console.error('Password update error:', error.message);
        return { success: false, message: error.message };
    }
};