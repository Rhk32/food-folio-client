import Image from 'next/image';
import Link from 'next/link';
import { MapPin, User } from 'lucide-react';

export default function UserSearchCard({ user }) {
    const location = [user.current_city, user.current_country].filter(Boolean).join(', ');

    return (
        <Link
            href={`/profile/${user.id}`}
            className="flex items-center gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-orange-600">
                {user.profile_picture_url ? (
                    <Image src={user.profile_picture_url} alt={user.name} fill sizes="56px" className="object-cover" />
                ) : (
                    <User className="h-6 w-6" />
                )}
            </div>
            <div className="min-w-0">
                <h3 className="truncate font-bold text-gray-900">{user.name}</h3>
                {location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="h-3.5 w-3.5 text-orange-500" />
                        {location}
                    </p>
                )}
                <p className="mt-1 line-clamp-1 text-sm text-gray-600">{user.bio || 'Food Folio member'}</p>
            </div>
        </Link>
    );
}
