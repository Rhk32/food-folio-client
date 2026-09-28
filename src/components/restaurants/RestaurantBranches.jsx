import { ExternalLink, MapPin, UtensilsCrossed } from 'lucide-react';

export default function RestaurantBranches({ branches }) {
    if (!branches.length) return <p className="rounded-2xl bg-white p-6 text-sm text-gray-500">No branches have been added yet.</p>;

    return (
        <div className="grid gap-5 lg:grid-cols-2">
            {branches.map((branch) => (
                <article key={branch.id} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-gray-900">{branch.branch_name}</h3>
                            <p className="mt-1 flex items-start gap-1.5 text-sm text-gray-500"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" /> {branch.address}, {branch.city}</p>
                        </div>
                        <a href={branch.google_maps_url} target="_blank" rel="noreferrer" className="rounded-full bg-orange-50 p-2 text-orange-600" aria-label="Open in Google Maps"><ExternalLink className="h-4 w-4" /></a>
                    </div>
                    <div className="mt-5 border-t border-orange-50 pt-4">
                        <h4 className="flex items-center gap-2 text-sm font-bold text-gray-800"><UtensilsCrossed className="h-4 w-4 text-orange-500" /> Menu</h4>
                        {branch.menu_items.length ? (
                            <div className="mt-3 space-y-3">
                                {branch.menu_items.map((item) => (
                                    <div key={item.id} className="flex justify-between gap-4 text-sm">
                                        <div><p className="font-semibold text-gray-800">{item.name}</p><p className="text-xs text-gray-500">{item.description}</p></div>
                                        <span className="shrink-0 font-bold text-orange-600">${Number(item.price).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        ) : <p className="mt-2 text-xs text-gray-500">Menu coming soon.</p>}
                    </div>
                </article>
            ))}
        </div>
    );
}
