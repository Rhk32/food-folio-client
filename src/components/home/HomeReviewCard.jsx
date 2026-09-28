import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, MapPin, MessageCircle, Star } from 'lucide-react';

export default function HomeReviewCard({ review }) {
    const image = review.images?.[0]?.image_url || review.restaurant.logo_url;

    return (
        <article className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <Link href={`/restaurant/${review.restaurant.id}`} className="block">
                <div className="relative h-56 bg-orange-50">
                    {image && <Image src={image} alt={`Review of ${review.restaurant.name}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />}
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1.5 text-xs font-bold text-gray-800 shadow-sm backdrop-blur-sm">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {review.rating}/5
                    </div>
                </div>
            </Link>
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <Link href={`/restaurant/${review.restaurant.id}`} className="block truncate text-lg font-black text-gray-900 hover:text-orange-600">{review.restaurant.name}</Link>
                        <p className="mt-1 flex items-start gap-1 text-xs text-gray-500"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" /> {review.branch.name}, {review.branch.city}</p>
                    </div>
                </div>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">{review.content}</p>
                <div className="mt-5 flex items-center justify-between border-t border-orange-50 pt-4">
                    <Link href={`/profile/${review.author.id}`} className="truncate text-sm font-bold text-gray-800 hover:text-orange-600">By {review.author.name}</Link>
                    <div className="flex shrink-0 items-center gap-3 text-xs font-semibold text-gray-500">
                        <span className="inline-flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5" /> {review.vouch_count || 0}</span>
                        <span className="inline-flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {review.comment_count || 0}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
