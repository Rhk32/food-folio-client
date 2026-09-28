'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Loader2, MessageCircle, Send } from 'lucide-react';
import { addReviewComment, getReviewComments } from '@/api/reviewActions';

export default function CommentSection({ reviewId, initialCount, isLoggedIn }) {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [total, setTotal] = useState(Number(initialCount || 0));
    const [page, setPage] = useState(0);
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [isPending, startTransition] = useTransition();

    const loadPage = (nextPage, append = false) => startTransition(async () => {
        const result = await getReviewComments(reviewId, nextPage);
        setComments((current) => append ? [...current, ...result.items] : result.items);
        setTotal(result.total);
        setPage(nextPage);
    });

    const toggleOpen = () => {
        const nextOpen = !open;
        setOpen(nextOpen);
        if (nextOpen && page === 0) loadPage(1);
    };

    const submitComment = (event) => {
        event.preventDefault();
        if (!content.trim()) return;
        setMessage('');
        startTransition(async () => {
            const result = await addReviewComment(reviewId, content);
            if (!result.success) {
                setMessage(result.message);
                return;
            }
            setContent('');
            const refreshed = await getReviewComments(reviewId, 1);
            setComments(refreshed.items);
            setTotal(refreshed.total);
            setPage(1);
        });
    };

    return (
        <div className="contents">
            <button type="button" onClick={toggleOpen} className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-orange-50 hover:text-orange-600">
                <MessageCircle className="h-4 w-4" /> Comments {total}
            </button>
            {open && (
                <div className="col-span-2 mt-2 space-y-4 border-t border-orange-100 pt-5">
                    {isPending && comments.length === 0 ? (
                        <Loader2 className="mx-auto h-5 w-5 animate-spin text-orange-500" />
                    ) : comments.length ? comments.map((comment) => (
                        <div key={comment.id} className="rounded-2xl bg-gray-50 p-4 text-sm">
                            <Link href={`/profile/${comment.author.id}`} className="font-semibold text-gray-900 hover:text-orange-600">{comment.author.name}</Link>
                            <p className="mt-1 whitespace-pre-wrap text-gray-600">{comment.content}</p>
                        </div>
                    )) : <p className="text-sm text-gray-500">No comments yet.</p>}

                    {comments.length < total && (
                        <button type="button" disabled={isPending} onClick={() => loadPage(page + 1, true)} className="text-xs font-semibold text-orange-600">Load more comments</button>
                    )}

                    {isLoggedIn ? (
                        <form onSubmit={submitComment} className="flex flex-col gap-2 sm:flex-row">
                            <input value={content} onChange={(event) => setContent(event.target.value)} placeholder="Add a thoughtful comment" className="min-w-0 flex-1 rounded-xl border border-orange-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-400" />
                            <button disabled={isPending || !content.trim()} className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-white disabled:opacity-50" aria-label="Post comment"><Send className="h-4 w-4" /></button>
                        </form>
                    ) : (
                        <p className="text-sm text-gray-500"><Link href="/login" className="font-semibold text-orange-600">Log in</Link> to join the conversation.</p>
                    )}
                    {message && <p className="text-xs text-red-600">{message}</p>}
                </div>
            )}
        </div>
    );
}
