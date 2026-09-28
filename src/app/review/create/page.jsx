import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/api/userActions';
import { getPublicRestaurantById } from '@/api/restaurantActions';
import ReviewForm from '@/components/reviews/ReviewForm';

export const metadata = { title: 'Create a Review | Food Folio' };

export default async function CreateReviewPage({ searchParams }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) redirect('/login');

    const { restaurantId } = await searchParams;
    const initialRestaurant = restaurantId ? await getPublicRestaurantById(restaurantId) : null;

    return (
        <main className="min-h-[85vh] bg-[#FDFBF7] px-4 py-10">
            <div className="mx-auto max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Share a food story</p>
                <h1 className="mt-2 text-3xl font-black text-gray-950">Create a review</h1>
                <p className="mb-7 mt-2 text-gray-600">Choose the exact branch, add your photos, and tell fellow foodies what you experienced.</p>
                <ReviewForm initialRestaurant={initialRestaurant} />
            </div>
        </main>
    );
}
