'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Lock, Key, Loader2, ArrowLeft, Save, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { updatePassword } from '@/api/settingsActions';

export default function EditPasswordPage({ user }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const newPasswordValue = watch('newPassword');

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const res = await updatePassword(data);

            if (!res.success) {
                throw new Error(res.message || 'Failed to update password.');
            }

            router.push(`/profile/${user.id}`);
            router.refresh();

        } catch (error) {
            console.error('Password update error:', error.message);
            setErrorMessage(error.message); // Set the error message to display on the UI
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Back Link */}
                <div>
                    <Link
                        href={`/profile/${user.id}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Profile
                    </Link>
                </div>

                {/* Main Card Form Container */}
                <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 sm:p-8 space-y-6">

                    <div className="border-b border-orange-100 pb-4">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            Change Password
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Ensure your account is secure by using a strong, unique password.
                        </p>
                    </div>

                    {/* Error Banner */}
                    {errorMessage && (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                            <ShieldAlert className="w-5 h-5 shrink-0 text-red-500" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Current Password Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Current Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Lock className="w-4 h-4 text-orange-500" />
                                </span>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    {...register('oldPassword', { required: 'Current password is required' })}
                                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                                />
                            </div>
                            {errors.oldPassword && (
                                <p className="text-xs text-red-500 mt-1">{errors.oldPassword.message}</p>
                            )}
                        </div>

                        {/* New Password Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                New Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Key className="w-4 h-4 text-orange-500" />
                                </span>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    {...register('newPassword', {
                                        required: 'New password is required',
                                        minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                    })}
                                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                                />
                            </div>
                            {errors.newPassword && (
                                <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Confirm New Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Key className="w-4 h-4 text-orange-500" />
                                </span>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your new password',
                                        validate: (value) => value === newPasswordValue || 'Passwords do not match'
                                    })}
                                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit Action */}
                        <div className="pt-4 flex items-center justify-end gap-3">
                            <Link
                                href={`/profile/settings`}
                                className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-orange-50 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-md hover:opacity-95 transition-opacity disabled:opacity-70 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Update Password
                                    </>
                                )}
                            </button>
                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
}