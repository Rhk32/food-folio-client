'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { getCurrentUser } from '@/api/userActions';
import MyRestaurantPreview from '@/components/restaurants/MyRestaurantPreview';
import SearchBar from '@/components/search/SearchBar';
import { getFeed } from '@/api/feedActions';

export default function FeedPage() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [radius, setRadius] = useState(10); 
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [location, setLocation] = useState({ lat: null, lng: null, city: null, country: null, isReady: false });

    useEffect(() => {
        const loadLocation = async () => {
            const user = await getCurrentUser();
            const ucity = user?.city || 'Dhaka'; 
            const ucountry = user?.country || 'Bangladesh';

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude, city: null, country: null, isReady: true })
                    },
                    (error) => {
                        console.log("Location access denied, falling back to user's city:", ucity);
                        setLocation({ lat: null, lng: null, city: ucity, country: ucountry, isReady: true }); 
                    }
                );
            } else {
                setLocation({ lat: null, lng: null, city: ucity, country: ucountry, isReady: true });
            }
        };

        loadLocation();
    }, []); 

    useEffect(() => {
        if (location.isReady) {
            const fetchFeedData = async () => {
                if (page === 1 && radius === 10) setIsLoading(true);
                else if (page > 1) setIsLoadingMore(true);
                
                const response = await getFeed(location.lat, location.lng, location.city, location.country, radius, keyword, page);
                
                const fetchedReviews = response?.data || [];
                const totalFound = response?.totalFound || 0;
                
                if (page === 1 && totalFound < 40 && radius < 50) {
                    console.log(`Found ${totalFound} spots in ${radius}km. Expanding radius to ${radius + 5}km...`);
                    setRadius(prevRadius => prevRadius + 5); 
                    return; 
                } 
                
                setReviews(prev => page === 1 ? fetchedReviews : [...prev, ...fetchedReviews]);
                
                setHasMore(reviews.length + fetchedReviews.length < totalFound);
                
                setIsLoading(false);
                setIsLoadingMore(false);
            };
            
            fetchFeedData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, radius, keyword, page]); 

    const observer = useRef();
    const lastReviewElementRef = useCallback(node => {
        if (isLoading || isLoadingMore) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        
        if (node) observer.current.observe(node);
    }, [isLoading, isLoadingMore, hasMore]);

    const handleSearchSubmit = (newKeyword) => {
        setKeyword(newKeyword);
        setRadius(10); 
        setPage(1); 
        setReviews([]); 
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                    <p className="text-sm text-gray-500 font-medium">Scouting best food spots around you...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 min-h-[85vh]">
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-50">
                    <MapPin className="w-6 h-6 text-orange-500" />
                    <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
                        Food Spots Around You
                    </h1>
                </div>
                <SearchBar onSearch={handleSearchSubmit} placeholder="Search to meet your appetite..."/>   
            </div>
            
            <div className="flex flex-col gap-6">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => {
                        if (reviews.length === index + 1) {
                            return (
                                <div ref={lastReviewElementRef} key={review.review_id}>
                                    <MyRestaurantPreview restaurant={review} />
                                </div>
                            );
                        } else {
                            return <MyRestaurantPreview key={review.review_id} restaurant={review} />;
                        }
                    })
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <p className="text-gray-500 text-lg">
                            {keyword 
                                ? `No spots found for "${keyword}" within 50km.` 
                                : "No food spots found within 50km yet. Be the first to add one!"}
                        </p>
                    </div>
                )}
            </div>

            {isLoadingMore && (
                <div className="flex justify-center py-6">
                    <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                </div>
            )}
        </div>
    );
}