'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { User, FileText, MapPin, Globe, Loader2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { updateProfileBasicInfo } from '@/api/settingsActions';

export default function BasicInfoEditPage({ user }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name || '',
            bio: user?.bio || '',
            current_city: user?.current_city || '',
            current_country: user?.current_country || ''
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        try {
            const res = await updateProfileBasicInfo(data);

            if (!res.success) {
                throw new Error(res.message);
            }

            router.push(`/profile/${user.id}`);
            router.refresh();

        } catch (error) {
            console.error('Profile update error:', error.message);
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
                            Edit Profile
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Update your personal information and location details.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Name Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <User className="w-4 h-4 text-orange-500" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Bio Field */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Bio
                            </label>
                            <div className="relative">
                                <span className="absolute top-3 left-3 pointer-events-none text-gray-400">
                                    <FileText className="w-4 h-4 text-orange-500" />
                                </span>
                                <textarea
                                    rows="4"
                                    placeholder="Tell us a little bit about yourself and your favorite foods..."
                                    {...register('bio')}
                                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400 resize-none"
                                />
                            </div>
                        </div>

                        {/* City and Country Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Current City */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Current City
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <MapPin className="w-4 h-4 text-orange-500" />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="e.g. Dhaka"
                                        {...register('current_city')}
                                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Current Country */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Current Country
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Globe className="w-4 h-4 text-orange-500" />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="e.g. Bangladesh"
                                        {...register('current_country')}
                                        className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Submit Action */}
                        <div className="pt-4 flex items-center justify-end gap-3">
                            <Link
                                href={`/profile/${user.id}`}
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
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Changes
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