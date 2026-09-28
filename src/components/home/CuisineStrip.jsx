import Link from 'next/link';
import { ArrowUpRight, UtensilsCrossed } from 'lucide-react';

export default function CuisineStrip({ cuisines }) {
    if (!cuisines.length) return null;

    return (
        <section className="border-y border-orange-100 bg-orange-50/45 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">Find your flavor</p>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">Browse by cuisine</h2>
                    </div>
                    <Link href="/search" className="inline-flex items-center gap-1 text-sm font-bold text-orange-700 hover:text-orange-800">View everything <ArrowUpRight className="h-4 w-4" /></Link>
                </div>
                <div className="mt-7 flex gap-3 overflow-x-auto pb-2">
                    {cuisines.map((cuisine) => (
                        <Link key={cuisine.id} href={`/search?cuisineId=${encodeURIComponent(cuisine.id)}`} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-700">
                            <UtensilsCrossed className="h-4 w-4 text-orange-500" /> {cuisine.name}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
