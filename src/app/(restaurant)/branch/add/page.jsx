'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Building2, MapPin, Globe, Plus } from 'lucide-react';
import { createBranch } from '@/api/branchActions';

export default function BranchAddPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const restaurantId = searchParams.get('restaurantId');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            restaurant_id: restaurantId || '',
            branch_name: '',
            city: '',
            address: '',
            google_maps_url: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            // console.log(data);
            const result = await createBranch(data);

            if (!result.success) {
                console.error(result.message);
                return;
            }

            router.push(`/manage/${restaurantId}`);
            router.refresh();
        } catch (error) {
            console.error('Failed to create branch:', error);
        }
    };

    if (!restaurantId) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <div className="bg-orange-50/40 p-8 rounded-2xl border border-orange-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Restaurant ID Missing</h2>
                    <p className="text-sm text-gray-500 mb-6">Unable to identify which restaurant this branch belongs to.</p>
                    <Link href="/dashboard" className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-orange-700 transition-colors">
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Navigation */}
            <div className="mb-6">
                <Link
                    href={`/restaurant/manage/${restaurantId}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Restaurant Branches
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 sm:p-8">
                {/* Header */}
                <div className="pb-6 border-b border-orange-100 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            Add New Branch
                        </h1>
                    </div>
                    <p className="text-sm text-gray-500">
                        Establish a physical location, address, and Google Maps integration for this restaurant.
                    </p>
                </div>

                {/* Form with React Hook Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <input type="hidden" {...register('restaurant_id')} />

                    {/* Branch Name */}
                    <div>
                        <label htmlFor="branch_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Branch Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Building2 className="w-4 h-4" />
                            </span>
                            <input
                                type="text"
                                id="branch_name"
                                {...register('branch_name', { required: 'Branch name is required' })}
                                placeholder="e.g., Downtown Flagship"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900"
                            />
                        </div>
                        {errors.branch_name && (
                            <p className="text-xs text-red-500 mt-1">{errors.branch_name.message}</p>
                        )}
                    </div>

                    {/* City and Address Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="city"
                                {...register('city', { required: 'City is required' })}
                                placeholder="e.g., New York"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900"
                            />
                            {errors.city && (
                                <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                Street Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <MapPin className="w-4 h-4" />
                                </span>
                                <input
                                    type="text"
                                    id="address"
                                    {...register('address', { required: 'Street address is required' })}
                                    placeholder="e.g., 123 Main St, Suite 100"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900"
                                />
                            </div>
                            {errors.address && (
                                <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Google Maps URL */}
                    <div>
                        <label htmlFor="google_maps_url" className="block text-sm font-medium text-gray-700 mb-1">
                            Google Maps URL <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Globe className="w-4 h-4" />
                            </span>
                            <input
                                type="url"
                                id="google_maps_url"
                                {...register('google_maps_url', { required: 'Google Maps URL is required' })}
                                placeholder="https://maps.google.com/..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-gray-900"
                            />
                        </div>
                        {errors.google_maps_url && (
                            <p className="text-xs text-red-500 mt-1">{errors.google_maps_url.message}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                            Paste the full Google Maps share link for customers to find directions easily.
                        </p>
                    </div>

                    {/* Actions Footer */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-orange-50">
                        <Link
                            href={`/restaurant/manage/${restaurantId}`}
                            className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md hover:opacity-95 transition-opacity"
                        >
                            <Plus className="w-4 h-4" />
                            Save Branch
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}