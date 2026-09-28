import Image from 'next/image';
import Link from 'next/link';
import { Eye, MapPin, PenLine } from 'lucide-react';

export default function RestaurantHero({ restaurant }) {
    const cities = [...new Set(restaurant.branches.map((branch) => branch.city).filter(Boolean))];

    return (
        <section className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">
            <div className="relative h-64 sm:h-80">
                <Image
                    src={restaurant.logo_url || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'}
                    alt={restaurant.name}
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <h1 className="text-3xl font-black sm:text-5xl">{restaurant.name}</h1>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/85">
                        {cities.length > 0 && <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {cities.join(', ')}</span>}
                        <span className="inline-flex items-center gap-1"><Eye className="h-4 w-4" /> {restaurant.visits || 0} visits</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
                <div>
                    <p className="max-w-3xl leading-7 text-gray-600">{restaurant.description || 'Discover the food, branches, and community stories from this restaurant.'}</p>
                    {restaurant.cuisines.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {restaurant.cuisines.map((cuisine) => <span key={cuisine.id} className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">{cuisine.name}</span>)}
                        </div>
                    )}
                </div>
                <Link href={`/review/create?restaurantId=${restaurant.id}`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-linear-to-r from-red-500 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-md">
                    <PenLine className="h-4 w-4" /> Review this restaurant
                </Link>
            </div>
        </section>
    );
}
