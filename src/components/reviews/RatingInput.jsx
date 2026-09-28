'use client';

import { Star } from 'lucide-react';

export default function RatingInput({ value, onChange }) {
    return (
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((rating) => (
                <button key={rating} type="button" onClick={() => onChange(rating)} aria-label={`${rating} stars`} className="p-1">
                    <Star className={`h-7 w-7 ${rating <= value ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                </button>
            ))}
        </div>
    );
}
