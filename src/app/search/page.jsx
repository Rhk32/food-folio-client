import SearchExperience from '@/components/search/SearchExperience';

export const metadata = { title: 'Search | Food Folio' };

const getStringParam = (value) => (typeof value === 'string' ? value : '');

export default async function SearchPage({ searchParams }) {
    const params = await searchParams;
    const initialQuery = getStringParam(params?.q);
    const initialCity = getStringParam(params?.city);
    const initialCuisineId = getStringParam(params?.cuisineId);

    return (
        <main className="min-h-[85vh] bg-[#FDFBF7] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">Discover</p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">Find your next food story</h1>
                    <p className="mt-2 text-gray-600">Search Food Folio restaurants and people, then narrow restaurants by city or cuisine.</p>
                </div>
                <SearchExperience
                    key={`${initialQuery}:${initialCity}:${initialCuisineId}`}
                    initialQuery={initialQuery}
                    initialCity={initialCity}
                    initialCuisineId={initialCuisineId}
                />
            </div>
        </main>
    );
}
