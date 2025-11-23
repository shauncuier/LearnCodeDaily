"use client";

import { useState, useEffect } from 'react';

export default function Search() {
    const [donors, setDonors] = useState([]);
    const [filters, setFilters] = useState({ bloodGroup: '', district: '', upazila: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters.bloodGroup) params.append('bloodGroup', filters.bloodGroup);
        if (filters.district) params.append('district', filters.district);
        if (filters.upazila) params.append('upazila', filters.upazila);

        try {
            const res = await fetch(`/api/donors?${params.toString()}`);
            const data = await res.json();
            setDonors(data);
        } catch (error) {
            console.error('Failed to fetch donors', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchDonors();
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-primary">Find Blood Donors</h1>

            {/* Search Filters */}
            <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow-md mb-8 flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    <select
                        name="bloodGroup"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        onChange={handleFilterChange}
                    >
                        <option value="">All Groups</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    <input
                        type="text"
                        name="district"
                        placeholder="Enter district..."
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upazila</label>
                    <input
                        type="text"
                        name="upazila"
                        placeholder="Enter upazila..."
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        onChange={handleFilterChange}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors w-full md:w-auto"
                >
                    Search
                </button>
            </form>

            {/* Results */}
            {loading ? (
                <div className="text-center py-10">Loading donors...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donors.length > 0 ? (
                        donors.map((donor) => (
                            <div key={donor.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold">{donor.name}</h3>
                                        <p className="text-gray-500 text-sm">{donor.district}, {donor.upazila}</p>
                                        {donor.village && <p className="text-gray-400 text-xs">{donor.village}</p>}
                                    </div>
                                    <span className="bg-red-100 text-primary font-bold px-3 py-1 rounded-full text-sm">
                                        {donor.bloodGroup}
                                    </span>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600 mb-6">
                                    <p>📞 {donor.phone}</p>
                                    <p>✉️ {donor.email}</p>
                                    {donor.lastDonation && <p>Last Donation: {donor.lastDonation}</p>}
                                </div>
                                <a
                                    href={`tel:${donor.phone}`}
                                    className="block w-full text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Contact Donor
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No donors found matching your criteria.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
