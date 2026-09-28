'use client';

import { useState, useTransition } from 'react';
import { AlertTriangle, Loader2, Trash2, X } from 'lucide-react';
import { deleteReviewAsManager } from '@/api/reviewActions';

export default function DeleteReviewButton({ review, onDeleted }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isPending, startTransition] = useTransition();

    const close = () => {
        if (isPending) return;
        setOpen(false);
        setMessage('');
    };

    const confirmDelete = () => startTransition(async () => {
        setMessage('');
        const result = await deleteReviewAsManager(review.review_id);

        if (!result.success) {
            setMessage(result.message);
            return;
        }

        setOpen(false);
        onDeleted(review.review_id);
    });

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100"
            >
                <Trash2 className="h-4 w-4" /> Delete review
            </button>

            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/55 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => {
                    if (event.target === event.currentTarget) close();
                }}>
                    <div role="dialog" aria-modal="true" aria-labelledby={`delete-review-${review.review_id}`} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <button type="button" disabled={isPending} onClick={close} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700" aria-label="Close confirmation">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <h2 id={`delete-review-${review.review_id}`} className="mt-5 text-2xl font-black text-gray-950">Permanently delete this review?</h2>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                            The review by <strong className="text-gray-900">{review.author.name}</strong>, along with its pictures, comments, and vouches, will be deleted permanently.
                        </p>
                        <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
                            This action cannot be undone.
                        </div>
                        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button type="button" disabled={isPending} onClick={close} className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 disabled:opacity-60">Cancel</button>
                            <button type="button" disabled={isPending} onClick={confirmDelete} className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-red-700 disabled:opacity-60">
                                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                Delete permanently
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
