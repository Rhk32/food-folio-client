import { BadgeCheck, Compass, PenLine } from 'lucide-react';

const steps = [
    { number: '01', title: 'Discover', description: 'Search restaurants and cuisines, or see what people are reviewing near you.', icon: Compass },
    { number: '02', title: 'Share', description: 'Post your own experience with pictures, a rating, and the exact restaurant branch.', icon: PenLine },
    { number: '03', title: 'Connect', description: 'Vouch for trusted recommendations and join conversations in the comments.', icon: BadgeCheck },
];

export default function HowItWorks() {
    return (
        <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-600">Simple by design</p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">How Food Folio works</h2>
                </div>
                <div className="mt-9 grid gap-5 md:grid-cols-3">
                    {steps.map(({ number, title, description, icon: Icon }) => (
                        <article key={number} className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-7">
                            <div className="flex items-center justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600"><Icon className="h-5 w-5" /></div>
                                <span className="text-sm font-black text-orange-200">{number}</span>
                            </div>
                            <h3 className="mt-6 text-xl font-black text-gray-900">{title}</h3>
                            <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
