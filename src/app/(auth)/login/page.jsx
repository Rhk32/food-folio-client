'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';

const LoginPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setErrorMessage('');
        let redirectTo = false;

        try {
            // Connect this to your Next.js API route or authentication action (e.g., Supabase Auth / NextAuth)
            console.log('Login Data Submitted:', data);

            // Simulate network request
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Redirect or handle successful login here
            redirectTo = true;
        } catch (error) {
            setErrorMessage('Invalid email or password. Please try again.');
        } finally {
            setIsSubmitting(false);
            if (redirectTo) {
                redirect('/');
            }
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#FDFBF7] px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-2xl border border-orange-100 shadow-sm p-8 space-y-6">

                {/* Header Branding */}
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
                        Welcome Back
                    </h1>
                    <p className="text-sm text-gray-600">
                        Log in to access your food folio and saved spots.
                    </p>
                </div>

                {/* Global Error Banner */}
                {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                        {errorMessage}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <Link href="/forgot-password" className="text-xs text-orange-600 hover:underline font-medium">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Lock className="w-4 h-4 text-orange-500" />
                            </span>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register('password', {
                                    required: 'Password is required'
                                })}
                                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800 placeholder-gray-400"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
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
                                Logging in...
                            </>
                        ) : (
                            <>
                                Log In
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>

                </form>

                {/* Footer Link to Signup */}
                <div className="text-center pt-2 text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="font-medium text-orange-600 hover:underline">
                        Sign up
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;