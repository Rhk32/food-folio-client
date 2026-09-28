import React from 'react';
import { Clock, Construction } from 'lucide-react';

const BranchOverviewPage = async ({ params }) => {
    const { branchId } = await params;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Main Content Area */}
                <main className="flex-1 w-full min-w-0 pb-16 lg:pb-0">
                    <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-8 sm:p-12 text-center">
                        <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-100 shadow-xs">
                            <Construction className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
                            Overview Dashboard Coming Soon
                        </h1>
                        <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                            We are working hard to build a comprehensive analytics and overview dashboard for your branch. This feature will become available later on.
                        </p>
                        <div className="inline-flex items-center gap-2 bg-orange-50/80 text-orange-700 px-4 py-2 rounded-full text-xs font-semibold border border-orange-200/60">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Stay tuned for updates</span>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default BranchOverviewPage;