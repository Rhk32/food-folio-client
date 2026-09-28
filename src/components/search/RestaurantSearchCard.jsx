import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';

export default function RestaurantSearchCard({ restaurant }) {
    return (
        <Link
            href={`/restaurant/${restaurant.id}`}
            className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="relative h-40 bg-orange-50">
                <Image
                    src={restaurant.logo_url || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'}
                    alt={restaurant.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                />
            </div>
            <div className="space-y-3 p-4">
                <div>
                    <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">{restaurant.description || 'Discover this food spot.'}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                    {restaurant.cities?.slice(0, 2).map((city) => (
                        <span key={city} className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1">
                            <MapPin className="h-3 w-3 text-orange-500" /> {city}
                        </span>
                    ))}
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {Number(restaurant.average_rating || 0).toFixed(1)} ({restaurant.review_count})
                    </span>
                </div>
                {restaurant.cuisines?.length > 0 && (
                    <p className="truncate text-xs font-medium text-orange-700">{restaurant.cuisines.join(' · ')}</p>
                )}
            </div>
        </Link>
    );
}
