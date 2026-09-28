import Link from 'next/link';
import { MapPin, PenLine, Search as SearchIcon } from 'lucide-react';
import SearchBar from '@/components/search/SearchBar';

export default function FeedControls({ location, radius, total, onSearch, isLoggedIn }) {
    const locationLabel = location.mode === 'coords'
        ? `Within ${radius} km of you`
        : location.city;

    return (
        <aside className="space-y-5 lg:sticky lg:top-28">
            <section className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                        <MapPin className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Browsing near</p>
                        <p className="mt-1 break-words font-bold text-gray-900">{locationLabel}</p>
                        <p className="mt-1 text-xs text-gray-500">{total} {total === 1 ? 'story' : 'stories'} found</p>
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                    <SearchIcon className="h-4 w-4 text-orange-500" />
                    <h2 className="font-bold text-gray-900">Search this area</h2>
                </div>
                <SearchBar onSearch={onSearch} placeholder="Restaurant name..." />
            </section>

            <section className="rounded-3xl bg-linear-to-br from-orange-500 to-red-500 p-6 text-white shadow-lg shadow-orange-200/60">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/75">Tried somewhere great?</p>
                <h2 className="mt-2 text-xl font-black">Share your food story</h2>
                <p className="mt-2 text-sm leading-6 text-white/85">Help other foodies discover what is worth ordering.</p>
                <Link href={isLoggedIn ? '/review/create' : '/login'} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-orange-600 shadow-sm">
                    <PenLine className="h-4 w-4" /> {isLoggedIn ? 'Create a review' : 'Log in to review'}
                </Link>
            </section>
        </aside>
    );
}
