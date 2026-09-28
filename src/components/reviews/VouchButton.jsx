'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { BadgeCheck, Loader2 } from 'lucide-react';
import { toggleReviewVouch } from '@/api/reviewActions';

export default function VouchButton({ reviewId, initialVouched, initialCount, isLoggedIn }) {
    const [vouched, setVouched] = useState(Boolean(initialVouched));
    const [count, setCount] = useState(Number(initialCount || 0));
    const [isPending, startTransition] = useTransition();

    if (!isLoggedIn) {
        return (
            <Link href="/login" className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-orange-50 hover:text-orange-600">
                <BadgeCheck className="h-4 w-4" /> Vouch {count}
            </Link>
        );
    }

    return (
        <button
            type="button"
            disabled={isPending}
            onClick={() => startTransition(async () => {
                const result = await toggleReviewVouch(reviewId);
                if (result.success) {
                    setVouched(result.vouched);
                    setCount(result.vouchCount);
                }
            })}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:opacity-60 ${vouched ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'}`}
        >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <BadgeCheck className="h-4 w-4" />}
            {vouched ? 'Vouched' : 'Vouch'} {count}
        </button>
    );
}
