import Link from 'next/link';
import { ArrowRight, PenLine } from 'lucide-react';

export default function HomeCallToAction({ user }) {
    return (
        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-linear-to-br from-gray-950 via-gray-900 to-orange-950 px-6 py-12 text-center text-white shadow-2xl sm:px-10 sm:py-16">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">Your next favorite is out there</p>
                <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">{user ? 'Turn your next meal into a food story.' : 'Start building your Food Folio.'}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">{user ? 'Share the places and dishes worth remembering with the community.' : 'Join the community to review restaurants, vouch for recommendations, and keep exploring.'}</p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href={user ? '/review/create' : '/signup'} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-950">
                        {user && <PenLine className="h-4 w-4 text-orange-500" />} {user ? 'Create a review' : 'Create your account'} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href={user ? '/feed' : '/search'} className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white hover:bg-white/10">{user ? 'Browse your feed' : 'Explore first'}</Link>
                </div>
            </div>
        </section>
    );
}
