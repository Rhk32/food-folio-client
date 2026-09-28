'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, Navigation, Sparkles } from 'lucide-react';
import { getCurrentUser } from '@/api/userActions';
import { getFeed } from '@/api/feedActions';
import ReviewCard from '@/components/reviews/ReviewCard';
import FeedControls from '@/components/feed/FeedControls';

export default function FeedPage() {
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [location, setLocation] = useState({ mode: 'pending', lat: null, lng: null, city: '' });
    const [guestCity, setGuestCity] = useState('');
    const [radius, setRadius] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState('');
    const observer = useRef(null);

    useEffect(() => {
        let active = true;

        const handleFallback = (user) => {
            if (!active) return;
            if (user?.current_city) {
                setLocation({ mode: 'city', lat: null, lng: null, city: user.current_city });
            } else {
                setLocation({ mode: 'needsCity', lat: null, lng: null, city: '' });
                setIsLoading(false);
            }
        };

        const loadLocation = async () => {
            const user = await getCurrentUser();
            if (!active) return;
            setCurrentUser(user);

            if (!navigator.geolocation) {
                handleFallback(user);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => active && setLocation({
                    mode: 'coords',
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    city: '',
                }),
                () => handleFallback(user),
                { timeout: 8000 }
            );
        };

        loadLocation();
        return () => { active = false; };
    }, []);

    useEffect(() => {
        if (!['coords', 'city'].includes(location.mode)) return;
        let active = true;

        const loadReviews = async () => {
            if (page === 1) setIsLoading(true);
            else setIsLoadingMore(true);
            setError('');

            const response = await getFeed(
                location.lat,
                location.lng,
                location.city,
                null,
                radius,
                keyword,
                page
            );
            if (!active) return;

            const fetched = response?.data || [];
            const found = Number(response?.totalFound || 0);

            if (location.mode === 'coords' && page === 1 && found < 40 && radius < 50) {
                setRadius((value) => Math.min(50, value + 5));
                return;
            }

            setReviews((current) => page === 1 ? fetched : [...current, ...fetched]);
            setTotal(found);
            setIsLoading(false);
            setIsLoadingMore(false);
        };

        loadReviews().catch(() => {
            if (active) {
                setError('Could not load nearby reviews.');
                setIsLoading(false);
                setIsLoadingMore(false);
            }
        });

        return () => { active = false; };
    }, [location, radius, keyword, page]);

    const hasMore = reviews.length < total;
    const lastReviewRef = useCallback((node) => {
        if (isLoading || isLoadingMore) return;
        observer.current?.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) setPage((value) => value + 1);
        });
        if (node) observer.current.observe(node);
    }, [hasMore, isLoading, isLoadingMore]);

    const search = (value) => {
        setKeyword(value.trim());
        setRadius(10);
        setPage(1);
        setReviews([]);
    };

    const chooseCity = (event) => {
        event.preventDefault();
        if (!guestCity.trim()) return;
        setPage(1);
        setReviews([]);
        setLocation({ mode: 'city', lat: null, lng: null, city: guestCity.trim() });
    };

    if (location.mode === 'needsCity') {
        return (
            <main className="mx-auto flex min-h-[70vh] max-w-xl items-center px-4">
                <form onSubmit={chooseCity} className="w-full rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-sm">
                    <Navigation className="mx-auto h-10 w-10 text-orange-500" />
                    <h1 className="mt-4 text-2xl font-black text-gray-900">Choose your city</h1>
                    <p className="mt-2 text-sm text-gray-600">Location access is unavailable. Enter a city to discover nearby food stories.</p>
                    <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                        <input required value={guestCity} onChange={(event) => setGuestCity(event.target.value)} placeholder="e.g. Dhaka" className="min-w-0 flex-1 rounded-xl border border-orange-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-orange-400" />
                        <button className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white">Explore</button>
                    </div>
                </form>
            </main>
        );
    }

    if (isLoading) {
        return <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4"><Loader2 className="h-10 w-10 animate-spin text-orange-500" /><p className="text-sm text-gray-500">Scouting food stories around you...</p></div>;
    }

    return (
        <main className="min-h-[85vh] bg-[#FDFBF7] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8 max-w-3xl sm:mb-10">
                    <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-orange-600">
                        <Sparkles className="h-4 w-4" /> Your local feed
                    </p>
                    <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">Food stories around you</h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">See what the community is ordering, loving, and recommending near you.</p>
                </header>

                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] xl:gap-10">
                    <section className="min-w-0">
                        <div className="mb-5 flex items-end justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-black text-gray-900 sm:text-2xl">Latest reviews</h2>
                                {keyword && <p className="mt-1 text-sm text-gray-500">Results for &quot;{keyword}&quot;</p>}
                            </div>
                            <span className="shrink-0 rounded-full border border-orange-100 bg-white px-3 py-1.5 text-xs font-semibold text-gray-500">{total} total</span>
                        </div>

                        {error ? (
                            <div className="rounded-3xl border border-red-100 bg-red-50 p-10 text-center text-sm text-red-600">{error}</div>
                        ) : reviews.length ? (
                            <div className="space-y-8">
                                {reviews.map((review, index) => (
                                    <div key={review.review_id} ref={index === reviews.length - 1 ? lastReviewRef : null}>
                                        <ReviewCard review={review} isLoggedIn={Boolean(currentUser)} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-3xl border border-dashed border-orange-200 bg-white p-12 text-center text-gray-500 sm:p-16">
                                {keyword ? `No reviews found for "${keyword}".` : 'No food stories found here yet.'}
                            </div>
                        )}

                        {isLoadingMore && <div className="flex justify-center py-8"><Loader2 className="h-7 w-7 animate-spin text-orange-500" /></div>}
                    </section>

                    <FeedControls
                        location={location}
                        radius={radius}
                        total={total}
                        onSearch={search}
                        isLoggedIn={Boolean(currentUser)}
                    />
                </div>
            </div>
        </main>
    );
}
