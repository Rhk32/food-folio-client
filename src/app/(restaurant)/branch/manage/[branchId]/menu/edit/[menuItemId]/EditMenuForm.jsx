'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Utensils, ArrowLeft, Loader2 } from 'lucide-react';
import { postEditedMenuItem } from '@/api/menuActions';
import { useRouter } from 'next/navigation';

export default function EditMenuForm({ menuItem }) {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: menuItem?.name || '',
            description: menuItem?.description || '',
            price: menuItem?.price ?? '',
        },
    });

    const onSubmit = async (data) => {
        try {
            const result = await postEditedMenuItem({ id: menuItem.id, ...data, price: parseFloat(data.price) });

            if (!result.success) {
                alert(result.message);
                return;
            }

            router.push(`/branch/manage/${menuItem.branch_id}/menu`);
            router.refresh();
        } catch (error) {
            console.error('Failed to update menu item:', error);
            alert('Failed to update menu item.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <Link
                    href={`/branch/manage/${menuItem?.branch_id}/menu`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-orange-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Menu
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3 pb-6 border-b border-orange-100 mb-6">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shadow-2xs">
                        <Utensils className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                            Edit Menu Item
                        </h1>
                        <p className="text-xs text-gray-500">
                            Update details, pricing, or description for this dish.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            Item Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Truffle Cheeseburger"
                            {...register('name', { required: 'Item name is required' })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            Price ($) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...register('price', {
                                required: 'Price is required',
                                min: { value: 0, message: 'Price must be a positive number' },
                            })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        />
                        {errors.price && (
                            <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            Description
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Describe ingredients, flavor profile, or portion size..."
                            {...register('description')}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-orange-50 flex justify-end gap-3">
                        <Link
                            href={`/branch/manage/${menuItem?.branch_id}/menu`}
                            className="px-5 py-2.5 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-md hover:opacity-95 transition-opacity disabled:opacity-70 flex items-center gap-2"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>Save Changes</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}