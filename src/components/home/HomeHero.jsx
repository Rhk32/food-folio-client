import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, PenLine, Sparkles } from 'lucide-react';

const images = {
    main: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
    detail: 'https://images.unsplash.com/photo-1622115837997-90c89ae689f9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D',
    contrast: 'https://images.unsplash.com/photo-1663530761401-15eefb544889?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D',
};

export default function HomeHero({ user }) {
    return (
        <section className="relative overflow-hidden border-b border-orange-100 bg-[radial-gradient(circle_at_top_left,#fff7ed_0,#fdfbf7_45%,#ffffff_100%)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <div className="relative z-10">
                    <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-orange-700 shadow-sm">
                        <Sparkles className="h-3.5 w-3.5" /> Made for curious foodies
                    </p>
                    <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                        Discover food. Share your favorites. <span className="bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Build your food story.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                        Find restaurants, explore cuisines, and get honest recommendations from people eating around you.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href={user ? '/feed' : '/search'} className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-red-500 to-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5">
                            <Compass className="h-4 w-4" /> {user ? 'Open your feed' : 'Explore restaurants'}
                        </Link>
                        <Link href={user ? '/review/create' : '/signup'} className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3.5 text-sm font-bold text-gray-800 shadow-sm transition hover:border-orange-300 hover:bg-orange-50">
                            {user ? <PenLine className="h-4 w-4 text-orange-500" /> : null}
                            {user ? 'Create a review' : 'Join Food Folio'}
                            {!user && <ArrowRight className="h-4 w-4 text-orange-500" />}
                        </Link>
                    </div>
                </div>

                <div className="relative grid grid-cols-2 gap-3 lg:h-[34rem] lg:grid-cols-[1.35fr_0.8fr] lg:grid-rows-2 lg:gap-4">
                    <div className="relative col-span-2 h-72 overflow-hidden rounded-[2rem] bg-orange-100 shadow-xl shadow-orange-200/40 lg:col-span-1 lg:row-span-2 lg:h-full">
                        <Image src={images.main} alt="A welcoming restaurant dining room prepared for guests" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover transition duration-700 hover:scale-105" />
                        <div className="absolute inset-0 bg-linear-to-t from-gray-950/30 to-transparent" />
                    </div>
                    <div className="relative h-44 overflow-hidden rounded-[1.5rem] bg-orange-100 shadow-lg lg:h-full">
                        <Image src={images.detail} alt="A freshly prepared restaurant dish ready to be reviewed" fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover transition duration-700 hover:scale-105" />
                    </div>
                    <div className="relative h-44 overflow-hidden rounded-[1.5rem] bg-orange-100 shadow-lg lg:h-full">
                        <Image src={images.contrast} alt="A colorful plated dish from a local restaurant" fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover transition duration-700 hover:scale-105" />
                    </div>
                </div>
            </div>
        </section>
    );
}
