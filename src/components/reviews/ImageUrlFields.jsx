'use client';

import { ImagePlus, Plus, Trash2 } from 'lucide-react';

export default function ImageUrlFields({ values, onChange }) {
    const update = (index, value) => onChange(values.map((item, itemIndex) => itemIndex === index ? value : item));
    const remove = (index) => onChange(values.filter((_, itemIndex) => itemIndex !== index));

    return (
        <div className="space-y-3">
            {values.map((value, index) => (
                <div key={index} className="flex gap-2">
                    <div className="relative flex-1">
                        <ImagePlus className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
                        <input type="url" required value={value} onChange={(event) => update(index, event.target.value)} placeholder="https://example.com/food-photo.jpg" className="w-full rounded-xl border border-orange-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-orange-400" />
                    </div>
                    {values.length > 1 && <button type="button" onClick={() => remove(index)} className="rounded-xl border border-red-100 px-3 text-red-500" aria-label="Remove picture URL"><Trash2 className="h-4 w-4" /></button>}
                </div>
            ))}
            <button type="button" onClick={() => onChange([...values, ''])} className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600"><Plus className="h-4 w-4" /> Add another picture</button>
        </div>
    );
}
