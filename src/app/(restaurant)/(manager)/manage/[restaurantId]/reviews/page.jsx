import { redirect } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';
import { getRestaurantByRestaurantId } from '@/api/restaurantActions';
import { getReviews } from '@/api/reviewActions';
import ManagerReviewList from '@/components/reviews/ManagerReviewList';

export default async function ManageRestaurantReviewsPage({ params }) {
    const { restaurantId } = await params;
    const restaurant = await getRestaurantByRestaurantId(restaurantId);

    if (!restaurant) redirect('/unauthorized');

    const reviews = await getReviews({ restaurantId });

    return (
        <main className="w-full px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <header className="mb-8 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                            <ShieldAlert className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-orange-600">Review management</p>
                            <h1 className="mt-1 text-2xl font-black text-gray-950 sm:text-3xl">{restaurant.name}</h1>
                            <p className="mt-2 text-sm leading-6 text-gray-600">Review customer posts carefully. Deleted reviews and their engagement cannot be recovered.</p>
                        </div>
                    </div>
                </header>

                <ManagerReviewList initialData={reviews} restaurantId={restaurantId} />
            </div>
        </main>
    );
}
