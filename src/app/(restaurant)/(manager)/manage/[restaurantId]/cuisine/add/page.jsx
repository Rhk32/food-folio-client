'use client';

import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { ChefHat, ArrowLeft, Loader2 } from 'lucide-react';
import { postCuisineByRestaurantId } from '@/api/cuisineActions';
import { useRouter } from 'next/navigation';

const CuisineAddPage = ({ params }) => {
    const unwrappedParams = use(params);
    const restaurantId = unwrappedParams.restaurantId;
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            cuisine_name: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            // console.log(data);
            const result = await postCuisineByRestaurantId(restaurantId, data.cuisine_name);

            if (!result.success) {
                alert(result.message || 'Failed to add cuisine.');
                return;
            }

            router.push(`/manage/${restaurantId}/cuisine`);
            router.refresh();
        } catch (error) {
            console.error('Failed to add cuisine:', error);
            alert('Something went wrong while saving the cuisine.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
                <Link
                    href={`/restaurant/manage/${restaurantId}/cuisine`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-orange-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cuisines
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3 pb-6 border-b border-orange-100 mb-6">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shadow-2xs">
                        <ChefHat className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                            Add Restaurant Cuisine
                        </h1>
                        <p className="text-xs text-gray-500">
                            Add a new culinary style or category for this restaurant.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            Cuisine Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Italian, Sushi, Fast Food..."
                            {...register('cuisine_name', { required: 'Cuisine name is required' })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        />
                        {errors.cuisine_name && (
                            <p className="text-xs text-red-500 mt-1">{errors.cuisine_name.message}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-orange-50 flex justify-end gap-3">
                        <Link
                            href={`/manage/${restaurantId}/cuisine`}
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
                            <span>Save Cuisine</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CuisineAddPage;