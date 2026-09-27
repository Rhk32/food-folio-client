'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import L from 'leaflet';

// Fix for default Leaflet marker icons in Next.js/bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function BranchMap({ branch }) {
    const lat = branch?.latitude || 23.8103;
    const lng = branch?.longitude || 90.4125;
    const position = [lat, lng];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Branch Details Card */}
            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center border border-orange-100 shadow-2xs">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="inline-block px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold mb-2">
                            {branch.city}
                        </span>
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                            {branch.branch_name}
                        </h2>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-orange-50 text-sm text-gray-600">
                        <p className="flex items-start gap-2">
                            <span className="font-semibold text-gray-900 shrink-0">Address:</span>
                            <span>{branch.address}, {branch.city}</span>
                        </p>
                    </div>
                </div>

                {branch.google_maps_url && (
                    <a
                        href={branch.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full bg-linear-to-r from-red-500 to-orange-500 text-white px-5 py-3 rounded-xl text-xs font-semibold shadow-md hover:opacity-95 transition-opacity"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open in Google Maps</span>
                    </a>
                )}
            </div>

            {/* Interactive Leaflet Map View */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden p-2">
                <div className="h-112.5 w-full rounded-xl overflow-hidden relative z-10">
                    <MapContainer
                        center={position}
                        zoom={15}
                        scrollWheelZoom={false}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                <div className="p-1">
                                    <strong className="block text-gray-900 font-bold">{branch.branch_name}</strong>
                                    <span className="text-xs text-gray-600">{branch.address}</span>
                                </div>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}