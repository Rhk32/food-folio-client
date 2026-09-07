import React from 'react';
import { LayoutDashboard, Clock } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-2xl border border-orange-100 shadow-sm p-8 text-center space-y-6">

                {/* Icon Container */}
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto text-orange-600 shadow-inner">
                    <LayoutDashboard className="w-8 h-8" />
                </div>

                {/* Heading & Description */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Admin Dashboard
                    </h1>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        This view is currently under development. It will soon be enhanced to aggregate all pending admin actions and reviews into a single, unified place.
                    </p>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full border border-orange-100">
                    <Clock className="w-3.5 h-3.5" />
                    Coming Soon
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;