'use client';

import { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { getReviews } from '@/api/reviewActions';
import ReviewCard from './ReviewCard';

export default function ReviewList({ initialData, restaurantId, userId, isLoggedIn = false, emptyMessage = 'No reviews yet.' }) {
    const [items, setItems] = useState(initialData?.items || []);
    const [total, setTotal] = useState(initialData?.total || 0);
    const [page, setPage] = useState(initialData?.page || 1);
    const [isPending, startTransition] = useTransition();

    const loadMore = () => startTransition(async () => {
        const nextPage = page + 1;
        const result = await getReviews({ restaurantId, userId, page: nextPage });
        setItems((current) => [...current, ...result.items]);
        setTotal(result.total);
        setPage(nextPage);
    });

    if (!items.length) {
        return <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50/40 p-10 text-center text-sm text-gray-500">{emptyMessage}</div>;
    }

    return (
        <div className="space-y-6">
            {items.map((review) => <ReviewCard key={review.review_id} review={review} isLoggedIn={isLoggedIn} />)}
            {items.length < total && (
                <button type="button" disabled={isPending} onClick={loadMore} className="mx-auto flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2.5 text-sm font-semibold text-orange-700 disabled:opacity-60">
                    {isPending && <Loader2 className="h-4 w-4 animate-spin" />} Load more reviews
                </button>
            )}
        </div>
    );
}
