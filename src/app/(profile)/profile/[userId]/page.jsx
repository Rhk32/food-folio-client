import React from 'react';
import { getCurrentUser } from '@/api/userActions';
import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Calendar, Mail, MapPin, Settings, ShieldAlert, User } from 'lucide-react';

const formatJoinedDate = (date) => {
    if (!date) {
        return 'Not shared yet';
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return 'Not shared yet';
    }

    return parsedDate.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric'
    });
};

const getInitials = (value) => {
    return value
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
};

const getDisplayValue = (value, fallback = 'Not shared yet') => {
    if (typeof value !== 'string') {
        return value ?? fallback;
    }

    return value.trim() || fallback;
};

const UserProfile = async ({ params }) => {
    const { userId } = await params;
    const currentUser = await getCurrentUser();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile/getUser/${userId}`, {
        cache: 'no-store'
    });
    const data = await res.json();
    const displayedUserProfile = data?.user;

    if (!displayedUserProfile) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-[#FDFBF7] px-4 text-center">
                <ShieldAlert className="w-12 h-12 text-orange-400 mb-2" />
                <h2 className="text-xl font-bold text-gray-900">User Not Found</h2>
                <p className="text-sm text-gray-600 mt-1">The profile you are looking for does not exist or has been removed.</p>
                <Link href="/" className="mt-6 bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm hover:bg-orange-600 transition-colors">
                    Back to Home
                </Link>
            </div>
        );
    }

    const isOwnProfile = currentUser && String(currentUser.id) === String(displayedUserProfile.id);

    const name = getDisplayValue(displayedUserProfile.name, '');
    const email = getDisplayValue(displayedUserProfile.email, '');
    const displayName = name || email || 'Foodie';
    const initials = getInitials(displayName);
    const bio = getDisplayValue(displayedUserProfile.bio, '');
    const city = getDisplayValue(displayedUserProfile.current_city, '');
    const country = getDisplayValue(displayedUserProfile.current_country, '');
    const locationParts = [city, country].filter(Boolean);
    const locationString = locationParts.join(', ');
    const joinedDate = formatJoinedDate(displayedUserProfile.created_at);
    const joinedSummary = joinedDate === 'Not shared yet' ? 'Joined date not shared' : `Joined ${joinedDate}`;

    return (
        <main className="min-h-[calc(100vh-80px)] bg-[#FDFBF7]">
            <section className="relative overflow-hidden border-b border-orange-100/80 bg-[radial-gradient(circle_at_top_left,#fff7ed_0,#fdfbf7_34%,#f8fafc_100%)] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">

                <div className="mx-auto max-w-6xl">
                    <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                            <div className="relative h-32 w-32 shrink-0 rounded-full bg-white p-1 shadow-xl shadow-orange-200/50 ring-1 ring-orange-100 sm:h-36 sm:w-36">
                                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-orange-100 via-amber-50 to-emerald-50 text-4xl font-black text-orange-700">
                                    {displayedUserProfile.profile_picture_url ? (
                                        <Image
                                            src={displayedUserProfile.profile_picture_url}
                                            alt={displayName}
                                            fill
                                            sizes="128px"
                                            className="object-cover"
                                            priority
                                        />
                                    ) : (
                                        initials || <User className="h-12 w-12 text-orange-500" />
                                    )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#FDFBF7] bg-emerald-500 text-white shadow-md">
                                    <BadgeCheck className="h-4 w-4" />
                                </div>
                            </div>

                            <div className="max-w-2xl space-y-4">
                                <div className="space-y-2">
                                    <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase text-orange-700 shadow-sm">
                                        Food Folio Profile
                                    </p>
                                    <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
                                        {displayName}
                                    </h1>
                                </div>

                                <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600 sm:justify-start">
                                    {email && (
                                        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-orange-100 bg-white/85 px-3 py-1.5 shadow-sm">
                                            <Mail className="h-4 w-4 shrink-0 text-orange-500" />
                                            <span className="truncate">{email}</span>
                                        </span>
                                    )}
                                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/85 px-3 py-1.5 shadow-sm">
                                        <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                                        {locationString || 'Location not shared'}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/85 px-3 py-1.5 shadow-sm">
                                        <Calendar className="h-4 w-4 shrink-0 text-sky-600" />
                                        {joinedSummary}
                                    </span>
                                </div>

                                <p className="max-w-xl text-sm leading-6 text-gray-600">
                                    {bio || 'This foodie has not added a bio yet.'}
                                </p>
                            </div>
                        </div>

                        {isOwnProfile && (
                            <Link
                                href={`/profile/settings`}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gray-950 px-5 text-sm font-semibold text-white shadow-lg shadow-gray-900/15 transition hover:-translate-y-0.5 hover:bg-gray-800"
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default UserProfile;