'use client';
import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch, placeholder = "Search for food spots..." }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full mb-6">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            <button type="submit" className="hidden">Search</button>
        </form>
    );
}