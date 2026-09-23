'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { getFeed } from '@/actions/feedActions';
import { getCurrentUser } from '@/actions/userActions';
import MyRestaurantPreview from '@/components/restaurants/MyRestaurantPreview';
import SearchBar from '@/components/search/SearchBar';

export default function FeedPage() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [radius, setRadius] = useState(10);           // default 10 km
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState({ lat: null, lng: null, city: null, country: null, isReady: false });

useEffect(() => {
        const loadLocation = async () => {

            const user = await getCurrentUser();
            const ucity = user?.city || 'Dhaka'; // Uses user's city if available, otherwise Dhaka
            const ucountry = user?.country || 'Bangladesh';

             // 2. Try to get browser location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({ lat: position.coords.latitude, lng: position.coords.longitude, city: null, country: null, isReady: true })
                    },
                    (error) => {
                        console.log("Location access denied, falling back to user's city:", ucity);
                        setLocation({ lat: null, lng: null, city: ucity, country: ucountry, isReady: true }); 
                        // Uses dynamic city
                    }
                );
            } else {
                setLocation({ lat: null, lng: null, city: ucity, country: ucountry, isReady: true });
            }
        };

        loadLocation();
    }, []);              // [] - it means the code will run only once after loading of page

    useEffect(() => {
        if (location.isReady) {
            const fetchFeedData = async () => {
                if (radius === 10) setIsLoading(true);
                
                const data = await getFeed(location.lat, location.lng, location.city, location.country, radius, keyword);
                
                if (data.length < 40 && radius < 50) {
                    console.log(`Found ${data.length} spots in ${radius}km. Expanding radius to ${radius + 5}km...`);
                    setRadius(prevRadius => prevRadius + 5); 
                } else {
                    setReviews(data);
                    setIsLoading(false);
                }
            };
            
            fetchFeedData();
        }
    }, [location, radius, keyword]);  //this is dependency array

    const handleSearchSubmit = (newKeyword) => {
        setKeyword(newKeyword);
        setRadius(10); // after search radius again will start from 10km
        setReviews([]); // previous result will vanish from screen
    };

    // loading animation
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

    // design after data coming
    return (
        <div className="max-w-2xl mx-auto px-4 py-8 min-h-[85vh]">
            {/* Header of page */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-50">
                    <MapPin className="w-6 h-6 text-orange-500" />
                    <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
                        Food Spots Around You
                    </h1>
                </div>
            </div>

            <SearchBar onSearch={handleSearchSubmit} placeholder="Search to meet your appetite..."/>   
            
            {/* showing reviews in a loop using map */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <MyRestaurantPreview key={review.review_id} restaurant={review} />
                    ))
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
        </div>
    );
}