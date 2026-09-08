'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logOut = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    redirect('/');
};

export const getToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token || !process.env.NEXT_PUBLIC_API_URL) {
        return null;
    }

    return token;
};

export const loginUser = async (data) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Login failed");
        }

        const responseData = await res.json();

        const cookieStore = await cookies();
        cookieStore.set('token', responseData.token, {
            expires: Date.now() + 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        });

        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const signupUser = async (data) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Signup failed");
        }

        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
};