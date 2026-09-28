'use client';

import { useState, useTransition } from 'react';
import { Loader2, MessageSquareOff } from 'lucide-react';
import { getReviews } from '@/api/reviewActions';
import ReviewCard from './ReviewCard';
import DeleteReviewButton from './DeleteReviewButton';

export default function ManagerReviewList({ initialData, restaurantId }) {
    const [reviews, setReviews] = useState(initialData?.items || []);
    const [total, setTotal] = useState(initialData?.total || 0);
    const [page, setPage] = useState(initialData?.page || 1);
    const [isPending, startTransition] = useTransition();

    const handleDeleted = (reviewId) => {
        setReviews((current) => current.filter((review) => review.review_id !== reviewId));
        setTotal((current) => Math.max(0, current - 1));
    };

    const loadMore = () => startTransition(async () => {
        const nextPage = page + 1;
        const result = await getReviews({ restaurantId, page: nextPage });
        setReviews((current) => [...current, ...result.items]);
        setTotal(result.total);
        setPage(nextPage);
    });

    if (!reviews.length) {
        return (
            <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50/40 px-6 py-16 text-center">
                <MessageSquareOff className="mx-auto h-10 w-10 text-orange-400" />
                <h2 className="mt-4 text-lg font-bold text-gray-900">No reviews found</h2>
                <p className="mt-1 text-sm text-gray-500">Reviews for this restaurant will appear here.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-sm text-gray-500">{total} {total === 1 ? 'review' : 'reviews'}</p>
                <p className="text-xs font-medium text-red-600">Deletion is permanent</p>
            </div>
            <div className="space-y-8">
                {reviews.map((review) => (
                    <ReviewCard
                        key={review.review_id}
                        review={review}
                        isLoggedIn
                        managementAction={<DeleteReviewButton review={review} onDeleted={handleDeleted} />}
                    />
                ))}
            </div>
            {reviews.length < total && (
                <button type="button" disabled={isPending} onClick={loadMore} className="mx-auto mt-8 flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2.5 text-sm font-semibold text-orange-700 disabled:opacity-60">
                    {isPending && <Loader2 className="h-4 w-4 animate-spin" />} Load more reviews
                </button>
            )}
        </div>
    );
}
