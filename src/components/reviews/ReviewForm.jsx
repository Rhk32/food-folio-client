'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Send } from 'lucide-react';
import { createReview } from '@/api/reviewActions';
import { getPublicRestaurantById } from '@/api/restaurantActions';
import RestaurantPicker from './RestaurantPicker';
import RatingInput from './RatingInput';
import ImageUrlFields from './ImageUrlFields';

export default function ReviewForm({ initialRestaurant = null }) {
    const router = useRouter();
    const [restaurant, setRestaurant] = useState(initialRestaurant);
    const [branchId, setBranchId] = useState(initialRestaurant?.branches?.[0]?.id || '');
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [imageUrls, setImageUrls] = useState(['']);
    const [message, setMessage] = useState('');
    const [isPending, startTransition] = useTransition();

    const selectRestaurant = (selection) => startTransition(async () => {
        if (!selection) {
            setRestaurant(null);
            setBranchId('');
            return;
        }
        const fullRestaurant = await getPublicRestaurantById(selection.id);
        setRestaurant(fullRestaurant);
        setBranchId(fullRestaurant?.branches?.[0]?.id || '');
    });

    const submit = (event) => {
        event.preventDefault();
        setMessage('');

        if (!restaurant || !branchId || rating === 0) {
            setMessage('Choose a restaurant, branch, and rating.');
            return;
        }

        startTransition(async () => {
            const result = await createReview({
                branch_id: branchId,
                rating,
                content,
                image_urls: imageUrls,
            });
            if (!result.success) {
                setMessage(result.message);
                return;
            }
            router.push(`/restaurant/${restaurant.id}`);
            router.refresh();
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
            <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">Restaurant</label>
                <RestaurantPicker selected={restaurant} onSelect={selectRestaurant} />
            </div>
            <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">Branch</label>
                <select required disabled={!restaurant || isPending} value={branchId} onChange={(event) => setBranchId(event.target.value)} className="w-full rounded-xl border border-orange-200 px-3 py-2.5 text-sm disabled:bg-gray-50">
                    <option value="">Choose a branch</option>
                    {restaurant?.branches?.map((branch) => <option key={branch.id} value={branch.id}>{branch.branch_name} — {branch.city}</option>)}
                </select>
            </div>
            <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">Your rating</label>
                <RatingInput value={rating} onChange={setRating} />
            </div>
            <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">Caption</label>
                <textarea required value={content} onChange={(event) => setContent(event.target.value)} rows={5} placeholder="Tell the community what stood out..." className="w-full resize-y rounded-xl border border-orange-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">Picture URLs</label>
                <ImageUrlFields values={imageUrls} onChange={setImageUrls} />
                <p className="mt-2 text-xs text-gray-500">Direct image URLs for now; uploads will be added later.</p>
            </div>
            {message && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{message}</p>}
            <button disabled={isPending} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-red-500 to-orange-500 px-5 py-3 font-semibold text-white shadow-md disabled:opacity-60">
                {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                Publish review
            </button>
        </form>
    );
}
