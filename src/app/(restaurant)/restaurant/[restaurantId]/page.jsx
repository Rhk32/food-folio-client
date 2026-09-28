import { notFound } from 'next/navigation';
import { getPublicRestaurantById } from '@/api/restaurantActions';
import { getReviews } from '@/api/reviewActions';
import { getCurrentUser } from '@/api/userActions';
import RestaurantHero from '@/components/restaurants/RestaurantHero';
import RestaurantBranches from '@/components/restaurants/RestaurantBranches';
import RestaurantGallery from '@/components/restaurants/RestaurantGallery';
import ReviewList from '@/components/reviews/ReviewList';

export default async function PublicRestaurantPage({ params }) {
    const { restaurantId } = await params;
    const [restaurant, reviews, currentUser] = await Promise.all([
        getPublicRestaurantById(restaurantId),
        getReviews({ restaurantId }),
        getCurrentUser(),
    ]);

    if (!restaurant) notFound();

    return (
        <main className="min-h-[85vh] bg-[#FDFBF7] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-10">
                <RestaurantHero restaurant={restaurant} />
                <section>
                    <h2 className="mb-5 text-2xl font-black text-gray-900">Branches & menus</h2>
                    <RestaurantBranches branches={restaurant.branches} />
                </section>
                <section>
                    <h2 className="mb-5 text-2xl font-black text-gray-900">Community gallery</h2>
                    <RestaurantGallery images={restaurant.gallery_images} restaurantName={restaurant.name} />
                </section>
                <section className="mx-auto max-w-2xl">
                    <h2 className="mb-5 text-2xl font-black text-gray-900">Foodie reviews</h2>
                    <ReviewList initialData={reviews} restaurantId={restaurantId} isLoggedIn={Boolean(currentUser)} emptyMessage="No reviews yet. Be the first to share your experience." />
                </section>
            </div>
        </main>
    );
}
