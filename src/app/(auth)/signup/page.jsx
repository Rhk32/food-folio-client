'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { User, Mail, Lock, Image as ImageIcon, MapPin, Globe, ArrowRight, Loader2 } from 'lucide-react';

const SignUpPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (userData) => {
        setIsSubmitting(true);
        setErrorMessage('');

        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...userData,
                        latitude,
                        longitude
                    })
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Signup failed");
                }

                const data = await res.json();
                console.log(data);

                // Redirect or handle success state here
            } catch (error) {
                setErrorMessage('Something went wrong during registration. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        });

        // console.log(userData);
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#FDFBF7] px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-2xl border border-orange-100 shadow-sm p-8 space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-3">
                        <div className="relative w-14 h-14 overflow-hidden rounded-full border border-orange-200 shadow-sm">
                            <Image
                                src="/foodFolioLogoCircular.png"
                                alt="Food Folio Logo"
                                width={1000}
                                height={1000}
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                        Join Food Folio
                    </h1>
                    <p className="text-sm text-gray-600">
                        Create an account to start tracking and sharing your favorite food spots.
                    </p>
                </div>

                {/* Global Error Banner */}
                {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                        {errorMessage}
                    </div>
                )}

                {/* Signup Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Name Field */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <User className="w-4 h-4 text-orange-500" />
                            </span>
                            <input
                                type="text"
                                placeholder="John Doe"
                                {...register('name', { required: 'Name is required' })}
                                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Mail className="w-4 h-4 text-orange-500" />
                            </span>
                            <input
                                type="email"
                                placeholder="foodie@example.com"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Lock className="w-4 h-4 text-orange-500" />
                            </span>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 8, message: 'Password must be at least 8 characters' }
                                })}
                                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Profile Picture URL Field */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Profile Picture URL <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <ImageIcon className="w-4 h-4 text-orange-500" />
                            </span>
                            <input
                                type="url"
                                placeholder="https://example.com/avatar.jpg"
                                {...register('profile_picture_url')}
                                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* City and Country Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        {/* Current City */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                City <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <MapPin className="w-4 h-4 text-orange-500" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Dhaka"
                                    {...register('current_city', { required: 'City is required' })}
                                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                                />
                            </div>
                            {errors.current_city && (
                                <p className="text-xs text-red-500 mt-1">{errors.current_city.message}</p>
                            )}
                        </div>

                        {/* Current Country */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <Globe className="w-4 h-4 text-orange-500" />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Bangladesh"
                                    {...register('current_country', { required: 'Country is required' })}
                                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                                />
                            </div>
                            {errors.current_country && (
                                <p className="text-xs text-red-500 mt-1">{errors.current_country.message}</p>
                            )}
                        </div>

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
                                Creating account...
                            </>
                        ) : (
                            <>
                                Create Account
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>

                </form>

                {/* Footer Link to Login */}
                <div className="text-center pt-2 text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-orange-600 hover:underline">
                        Log in
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default SignUpPage;