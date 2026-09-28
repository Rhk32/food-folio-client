'use client';

import React, { useState, useTransition } from 'react';
import { UserPlus, UserCheck, Loader2 } from 'lucide-react';
import { toggleFollow } from '@/api/followActions';

const FollowButton = ({ toBeFollowedUserId, initialIsFollowing = false }) => {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [isPending, startTransition] = useTransition();

    const handleFollowToggle = async () => {
        startTransition(async () => {
            try {
                const result = await toggleFollow(toBeFollowedUserId);

                if (!result.success) {
                    console.error(result.message);
                    return;
                }

                setIsFollowing(result.isFollowing);
            } catch (error) {
                console.error(
                    'Failed to update follow status:',
                    error
                );
            }
        });
    };

    return (
        <button
            type="button"
            onClick={handleFollowToggle}
            disabled={isPending}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-2xs cursor-pointer disabled:opacity-70 ${isFollowing
                ? 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 group'
                : 'bg-linear-to-r from-red-500 to-orange-500 text-white hover:opacity-95 shadow-sm'
                }`}
        >
            {isPending ? (
                <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing...</span>
                </>
            ) : isFollowing ? (
                <>
                    {/* Shows 'Following' normally, changes to 'Unfollow' on hover */}
                    <span className="group-hidden">
                        <UserCheck className="w-3.5 h-3.5 inline-block mr-1 text-emerald-600 group-hover:hidden" />
                    </span>
                    <span className="group-hover:hidden">Following</span>
                    <span className="hidden group-hover:inline">Unfollow</span>
                </>
            ) : (
                <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Follow</span>
                </>
            )}
        </button>
    );
};

export default FollowButton;