'use client';

import { useEffect, useState } from 'react';
import { Loader2, Search, SlidersHorizontal, Users, UtensilsCrossed, X } from 'lucide-react';
import { getSearchFilters, searchFoodFolio } from '@/api/searchActions';
import UserSearchCard from './UserSearchCard';
import RestaurantSearchCard from './RestaurantSearchCard';

const emptyGroup = { items: [], total: 0, page: 1, limit: 12 };

export default function SearchExperience() {
    const [query, setQuery] = useState('');
    const [city, setCity] = useState('');
    const [cuisineId, setCuisineId] = useState('');
    const [filters, setFilters] = useState({ cities: [], cuisines: [] });
    const [results, setResults] = useState({ users: emptyGroup, restaurants: emptyGroup });
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState('');
    const [error, setError] = useState('');

    const runSearch = async (overrides = {}) => {
        setLoading(true);
        setError('');
        const response = await searchFoodFolio({
            query,
            city,
            cuisineId,
            userPage: overrides.userPage || 1,
            restaurantPage: overrides.restaurantPage || 1,
        });
        setResults({ users: response.users, restaurants: response.restaurants });
        if (!response.success) setError(response.message);
        setLoading(false);
    };

    useEffect(() => {
        let active = true;
        Promise.all([getSearchFilters(), searchFoodFolio()]).then(([filterData, response]) => {
            if (!active) return;
            setFilters(filterData);
            setResults({ users: response.users, restaurants: response.restaurants });
            if (!response.success) setError(response.message);
            setLoading(false);
        });
        return () => { active = false; };
    }, []);

    const submit = (event) => {
        event.preventDefault();
        runSearch();
    };

    const clearFilters = () => {
        setQuery('');
        setCity('');
        setCuisineId('');
        setLoading(true);
        searchFoodFolio().then((response) => {
            setResults({ users: response.users, restaurants: response.restaurants });
            setError(response.success ? '' : response.message);
            setLoading(false);
        });
    };

    const loadMore = async (group) => {
        setLoadingMore(group);
        const response = await searchFoodFolio({
            query,
            city,
            cuisineId,
            userPage: group === 'users' ? results.users.page + 1 : 1,
            restaurantPage: group === 'restaurants' ? results.restaurants.page + 1 : 1,
        });
        setResults((current) => ({
            users: group === 'users'
                ? { ...response.users, items: [...current.users.items, ...response.users.items] }
                : current.users,
            restaurants: group === 'restaurants'
                ? { ...response.restaurants, items: [...current.restaurants.items, ...response.restaurants.items] }
                : current.restaurants,
        }));
        setLoadingMore('');
    };

    return (
        <div className="space-y-8">
            <form onSubmit={submit} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                <div className="relative">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-orange-500" />
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search restaurants or people by name"
                        className="w-full rounded-xl border border-orange-200 py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
                    <select value={city} onChange={(event) => setCity(event.target.value)} className="rounded-xl border border-orange-200 px-3 py-2.5 text-sm">
                        <option value="">All cities</option>
                        {filters.cities.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                    <select value={cuisineId} onChange={(event) => setCuisineId(event.target.value)} className="rounded-xl border border-orange-200 px-3 py-2.5 text-sm">
                        <option value="">All cuisines</option>
                        {filters.cuisines.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                    <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-red-500 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white">
                        <SlidersHorizontal className="h-4 w-4" /> Search
                    </button>
                    <button type="button" onClick={clearFilters} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-600">
                        <X className="h-4 w-4" /> Reset
                    </button>
                </div>
            </form>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-orange-500" /></div>
            ) : error ? (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-700">{error}</div>
            ) : (
                <>
                    <section className="space-y-4">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900"><UtensilsCrossed className="h-5 w-5 text-orange-500" /> Restaurants <span className="text-sm font-normal text-gray-400">({results.restaurants.total})</span></h2>
                        {results.restaurants.items.length ? (
                            <>
                                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{results.restaurants.items.map((item) => <RestaurantSearchCard key={item.id} restaurant={item} />)}</div>
                                {results.restaurants.items.length < results.restaurants.total && <button type="button" disabled={loadingMore === 'restaurants'} onClick={() => loadMore('restaurants')} className="mx-auto flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2 text-sm font-semibold text-orange-700">{loadingMore === 'restaurants' && <Loader2 className="h-4 w-4 animate-spin" />} Load more restaurants</button>}
                            </>
                        ) : <p className="rounded-xl bg-white p-6 text-center text-sm text-gray-500">No restaurants match these filters.</p>}
                    </section>
                    <section className="space-y-4">
                        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900"><Users className="h-5 w-5 text-orange-500" /> People <span className="text-sm font-normal text-gray-400">({results.users.total})</span></h2>
                        {!query.trim() ? (
                            <p className="rounded-xl bg-white p-6 text-center text-sm text-gray-500">Enter a name to find people.</p>
                        ) : results.users.items.length ? (
                            <>
                                <div className="grid gap-4 md:grid-cols-2">{results.users.items.map((item) => <UserSearchCard key={item.id} user={item} />)}</div>
                                {results.users.items.length < results.users.total && <button type="button" disabled={loadingMore === 'users'} onClick={() => loadMore('users')} className="mx-auto flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2 text-sm font-semibold text-orange-700">{loadingMore === 'users' && <Loader2 className="h-4 w-4 animate-spin" />} Load more people</button>}
                            </>
                        ) : <p className="rounded-xl bg-white p-6 text-center text-sm text-gray-500">No people found.</p>}
                    </section>
                </>
            )}
        </div>
    );
}
