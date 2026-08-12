'use client';

import { ArrowLeft, ArrowRight, FileText, ImageIcon, Loader2, Utensils } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const RestaurantAddPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        defaultValues: {
            name: '',
            logo_url: '',
            description: '',
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSuccessMessage(false);

        try {
            // Console log data as requested for now
            console.log('New Restaurant Data Submitted:', data);

            // Simulate submission network latency
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setSuccessMessage(true);
            reset(); // Clear form fields after successful logging
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#FDFBF7] px-4 py-12">
            <div className="max-w-xl mx-auto space-y-6">

                {/* Back Link */}
                <div>
                    <Link
                        href="/restaurant/my"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-8 space-y-6">

                    {/* Header Branding */}
                    <div className="text-center space-y-2">
                        <div className="flex justify-center mb-3">
                            <div className="relative w-14 h-14 overflow-hidden rounded-full border border-orange-200 shadow-sm bg-orange-50 flex items-center justify-center">
                                <Utensils className="w-7 h-7 text-orange-500" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Add New Restaurant
                        </h1>
                        <p className="text-sm text-gray-600">
                            Register a new food spot to your folio and start tracking your visits and notes.
                        </p>
                    </div>

                    {/* Success Banner */}
                    {successMessage && (
                        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-700 flex items-center justify-between">
                            <span>Restaurant data successfully logged to console!</span>
                            <span className="text-xs font-semibold uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">Success</span>
                        </div>
                    )}

                    {/* Restaurant Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Name Field (Compulsory) */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Restaurant Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Utensils className="w-4 h-4 text-orange-500" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="e.g. Gourmet Burger Kitchen"
                                    {...register('name', { required: 'Restaurant name is required' })}
                                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Logo URL Field (Optional) */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Logo / Image URL <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <ImageIcon className="w-4 h-4 text-orange-500" />
                                </span>
                                <input
                                    type="url"
                                    placeholder="https://images.unsplash.com/photo-..."
                                    {...register('logo_url')}
                                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                                />
                            </div>
                            <p className="text-[11px] text-gray-400 mt-0.5">
                                Leave blank to use the default food folio theme image.
                            </p>
                        </div>

                        {/* Description Field (Compulsory) */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute top-3 left-3 pointer-events-none text-gray-400">
                                    <FileText className="w-4 h-4 text-orange-500" />
                                </span>
                                <textarea
                                    rows={4}
                                    placeholder="What makes this place special? Share your thoughts or signature dishes..."
                                    {...register('description', { required: 'Description is required' })}
                                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400 resize-none"
                                />
                            </div>
                            {errors.description && (
                                <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-2 flex items-center justify-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-5 py-3 rounded-full font-medium shadow-md hover:opacity-95 transition-opacity text-sm disabled:opacity-70 cursor-pointer"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving restaurant...
                                </>
                            ) : (
                                <>
                                    Add Restaurant to Folio
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default RestaurantAddPage;