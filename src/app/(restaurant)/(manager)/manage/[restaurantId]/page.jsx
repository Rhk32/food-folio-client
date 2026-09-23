import { getBranchesByRestaurantId } from '@/api/branchActions';
import { Building2, Plus, ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ManagerRestaurantDetailsPageAndEdit = async ({ params }) => {
    const { restaurantId } = await params;
    const branches = await getBranchesByRestaurantId(restaurantId);
    const hasBranches = branches && branches.length > 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Main Content Area */}
                <main className="flex-1 w-full min-w-0 pb-16 lg:pb-0">
                    <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 sm:p-8">

                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-orange-100 mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                    Restaurant Branches
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Manage physical locations, menus, and operating hours for this restaurant.
                                </p>
                            </div>

                            {hasBranches && (
                                <Link
                                    href={`/branch/add?restaurantId=${restaurantId}`}
                                    className="flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-md hover:opacity-95 transition-opacity"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add New Branch
                                </Link>
                            )}
                        </div>

                        {/* Branch Conditional Rendering */}
                        {!hasBranches ? (
                            /* Empty State */
                            <div className="text-center py-16 px-4 bg-orange-50/40 rounded-2xl border border-dashed border-orange-200">
                                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">No Branches Established</h3>
                                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                                    Get started by establishing your first physical branch location for this restaurant.
                                </p>
                                <Link
                                    href={`/branch/add?restaurantId=${restaurantId}`}
                                    className="inline-flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:opacity-95 transition-opacity"
                                >
                                    <Plus className="w-4 h-4" />
                                    Establish Branch
                                </Link>
                            </div>
                        ) : (
                            /* Branch List Grid */
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {branches.map((branch) => (
                                    <div
                                        key={branch.id}
                                        className="bg-white rounded-xl border border-orange-100 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-bold text-gray-900 text-base line-clamp-1">
                                                    {branch.branch_name || 'Unnamed Branch'}
                                                </h3>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200/60 shrink-0">
                                                    {branch.city || 'Active'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 flex items-center gap-1.5 line-clamp-1">
                                                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                                <span>{branch.address ? `${branch.address}, ${branch.city}` : 'No address specified'}</span>
                                            </p>
                                        </div>

                                        <div className="pt-4 mt-4 border-t border-orange-50 flex items-center justify-between">
                                            <span className="text-xs text-gray-400">
                                                ID: {branch.id.slice(0, 8)}...
                                            </span>
                                            <Link
                                                href={`/branch/manage/${branch.id}`}
                                                className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
                                            >
                                                Manage Branch
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </main>

            </div>
        </div>
    );
};

export default ManagerRestaurantDetailsPageAndEdit;