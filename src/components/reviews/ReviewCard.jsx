'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import VouchButton from './VouchButton';
import CommentSection from './CommentSection';

export default function ReviewCard({ review, isLoggedIn = false, managementAction = null }) {
    return (
        <article className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-4 p-5 sm:items-center sm:p-7">
                <Link href={`/profile/${review.author.id}`} className="flex min-w-0 items-center gap-3">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-100 font-bold text-orange-700 sm:h-12 sm:w-12">
                        {review.author.profile_picture_url ? (
                            <Image src={review.author.profile_picture_url} alt={review.author.name} fill sizes="40px" className="object-cover" />
                        ) : review.author.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-gray-900">{review.author.name}</p>
                        <p className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                </Link>
                <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-amber-50 px-2.5 py-1.5" aria-label={`${review.rating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />)}
                </div>
            </div>

            {review.images?.length > 0 && (
                <div className={`grid gap-1 bg-orange-50 ${review.images.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                    {review.images.slice(0, 4).map((image, index) => (
                        <div key={image.id || image.image_url} className={`relative ${review.images.length === 1 ? 'h-72 sm:h-96' : 'h-64 sm:h-60'} ${index === 0 && review.images.length === 3 ? 'sm:col-span-2' : ''}`}>
                            <Image src={image.image_url} alt={`${review.restaurant.name} review photo`} fill sizes="(max-width: 640px) 100vw, 760px" className="object-cover" />
                        </div>
                    ))}
                </div>
            )}

            <div className="p-5 sm:p-7">
                <Link href={`/restaurant/${review.restaurant.id}`} className="text-lg font-bold text-gray-900 hover:text-orange-600">{review.restaurant.name}</Link>
                <p className="mt-1.5 flex items-start gap-1.5 text-sm text-gray-500"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" /> <span>{review.branch.name}, {review.branch.city}</span></p>
                <p className="mt-5 whitespace-pre-wrap text-[15px] leading-7 text-gray-700">{review.content}</p>
                {managementAction && (
                    <div className="mt-6 flex justify-end">
                        {managementAction}
                    </div>
                )}
                <div className="mt-6 grid grid-cols-2 gap-2 border-t border-orange-100 pt-4">
                    <VouchButton reviewId={review.review_id} initialVouched={review.has_vouched} initialCount={review.vouch_count} isLoggedIn={isLoggedIn} />
                    <CommentSection reviewId={review.review_id} initialCount={review.comment_count} isLoggedIn={isLoggedIn} />
                </div>
            </div>
        </article>
    );
}
