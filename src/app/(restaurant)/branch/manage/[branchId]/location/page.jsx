import { getBranchByBranchId } from '@/api/branchActions';
import React from 'react';
import ClientBranchMap from '@/components/branch/ClientBranchMap';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

const BranchLocationDetailsPage = async ({ params }) => {
    const { branchId } = await params;
    const branch = await getBranchByBranchId(branchId);

    if (!branch) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <ShieldAlert className="w-12 h-12 text-orange-400 mx-auto mb-2" />
                <h2 className="text-xl font-bold text-gray-900">Branch Not Found</h2>
                <p className="text-sm text-gray-600 mt-1">The branch location you are looking for does not exist.</p>
                <Link href="/branch/manage" className="mt-6 inline-block bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm hover:bg-orange-600 transition-colors">
                    Back to Management
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Main Content Area */}
                <main className="flex-1 w-full min-w-0 pb-16 lg:pb-0">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                Location & Map
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                View exact geographical coordinates, address details, and directions for this branch.
                            </p>
                        </div>

                        {/* Interactive Map Wrapper Component */}
                        <ClientBranchMap branch={branch} />
                    </div>
                </main>

            </div>
        </div>
    );
};

export default BranchLocationDetailsPage;