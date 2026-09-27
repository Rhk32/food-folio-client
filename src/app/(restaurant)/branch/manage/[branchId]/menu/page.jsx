import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed, Plus } from 'lucide-react';
import { getMenuItemsByBranchId } from '@/api/menuActions';

const BranchMenuDisplayPage = async ({ params }) => {
    const { branchId } = await params;

    // Fetch menu items for this branch
    const menuItems = await getMenuItemsByBranchId(branchId);
    const hasMenuItems = menuItems && menuItems.length > 0;

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
                                    Branch Menu Items
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Manage dishes, pricing, and details for this specific location.
                                </p>
                            </div>

                            {/* Show small add button in header if menu items already exist */}
                            {hasMenuItems && (
                                <Link
                                    href={`/branch/manage/${branchId}/menu/add`}
                                    className="inline-flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-md hover:opacity-95 transition-opacity"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Menu Item
                                </Link>
                            )}
                        </div>

                        {/* Conditional Rendering */}
                        {!hasMenuItems ? (
                            /* Empty State */
                            <div className="text-center py-16 px-4 bg-orange-50/40 rounded-2xl border border-dashed border-orange-200">
                                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UtensilsCrossed className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">No Menu Items Found</h3>
                                <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                                    Your menu is currently empty. Start adding delicious dishes so customers can discover them.
                                </p>
                                <Link
                                    href={`/branch/manage/${branchId}/menu/add`}
                                    className="inline-flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:opacity-95 transition-opacity"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Menu Item
                                </Link>
                            </div>
                        ) : (
                            /* Menu Items Grid */
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {menuItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-xl border border-orange-100 p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-bold text-gray-900 text-base line-clamp-1">
                                                    {item.name}
                                                </h3>
                                                <span className="text-base font-extrabold text-orange-600 shrink-0">
                                                    ${Number(item.price).toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                                {item.description || 'No description provided for this item.'}
                                            </p>
                                        </div>

                                        <div className="pt-4 mt-4 border-t border-orange-50 flex items-center justify-between">
                                            <span className="text-xs text-gray-400 font-mono">
                                                {/* ID: {item.id.slice(0, 8)}... */}
                                            </span>
                                            <Link
                                                href={`/branch/manage/${branchId}/menu/edit/${item.id}`}
                                                className="text-xs font-semibold text-orange-600 hover:text-orange-700 hover:underline"
                                            >
                                                Edit Item &rarr;
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

export default BranchMenuDisplayPage;