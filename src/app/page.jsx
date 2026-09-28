import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getCurrentUser } from '@/api/userActions';
import { getReviews } from '@/api/reviewActions';
import { getSearchFilters, searchFoodFolio } from '@/api/searchActions';
import CuisineStrip from '@/components/home/CuisineStrip';
import HomeCallToAction from '@/components/home/HomeCallToAction';
import HomeHero from '@/components/home/HomeHero';
import HomeReviewCard from '@/components/home/HomeReviewCard';
import HowItWorks from '@/components/home/HowItWorks';
import RestaurantSearchCard from '@/components/search/RestaurantSearchCard';

export const metadata = {
    title: 'Food Folio | Discover and Share Food Stories',
    description: 'Discover restaurants and cuisines, share honest food reviews, and connect with a community of food lovers.',
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
    const [user, searchResult, filters, reviewResult] = await Promise.all([
        getCurrentUser(),
        searchFoodFolio(),
        getSearchFilters(),
        getReviews(),
    ]);

    const restaurants = searchResult?.restaurants?.items?.slice(0, 3) || [];
    const cuisines = filters?.cuisines || [];
    const reviews = reviewResult?.items?.slice(0, 3) || [];

    return (
        <main className="min-h-screen bg-[#FDFBF7]">
            <HomeHero user={user} />

            {restaurants.length > 0 && (
                <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">Places worth exploring</p>
                                <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">Discover restaurants</h2>
                            </div>
                            <Link href="/search" className="inline-flex items-center gap-1 text-sm font-bold text-orange-700 hover:text-orange-800">
                                View all restaurants <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {restaurants.map((restaurant) => (
                                <RestaurantSearchCard key={restaurant.id} restaurant={restaurant} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <CuisineStrip cuisines={cuisines} />

            {reviews.length > 0 && (
                <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">From the community</p>
                                <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">Latest food stories</h2>
                            </div>
                            <Link href="/feed" className="inline-flex items-center gap-1 text-sm font-bold text-orange-700 hover:text-orange-800">
                                Explore the feed <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {reviews.map((review) => (
                                <HomeReviewCard key={review.review_id} review={review} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <HowItWorks />
            <HomeCallToAction user={user} />
        </main>
    );
}
