'use client';

import { useEffect, useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { searchFoodFolio } from '@/api/searchActions';

export default function RestaurantPicker({ selected, onSelect }) {
    const [query, setQuery] = useState(selected?.name || '');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selected && query === selected.name) {
            return;
        }

        if (query.trim().length < 2) {
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            const result = await searchFoodFolio({ query });
            setItems(result.restaurants.items);
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, selected]);

    return (
        <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-orange-500" />
            <input
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setItems([]);
                    if (selected) onSelect(null);
                }}
                placeholder="Start typing a restaurant name"
                className="w-full rounded-xl border border-orange-200 py-2.5 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-orange-400"
            />
            {loading && <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-orange-500" />}
            {items.length > 0 && (
                <div className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-xl border border-orange-100 bg-white p-2 shadow-xl">
                    {items.map((restaurant) => (
                        <button key={restaurant.id} type="button" onClick={() => { onSelect(restaurant); setQuery(restaurant.name); setItems([]); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-orange-50">
                            <span className="font-semibold text-gray-900">{restaurant.name}</span>
                            <span className="ml-2 text-xs text-gray-500">{restaurant.cities?.join(', ')}</span>
                        </button>
                    ))}
                </div>
            )}
            {selected && <p className="mt-2 text-xs font-semibold text-emerald-600">Selected: {selected.name}</p>}
        </div>
    );
}
