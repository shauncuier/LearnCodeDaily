"use client";

import { useState, useEffect } from 'react';

export default function VolunteersList() {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/volunteers')
            .then(res => res.json())
            .then(data => {
                setVolunteers(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <div className="text-center py-10">Loading volunteers...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-primary">Our Volunteers</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {volunteers.map((vol) => (
                    <div key={vol.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h3 className="text-xl font-bold mb-1">{vol.name}</h3>
                        <p className="text-gray-500 text-sm mb-4">{vol.district}, {vol.upazila}</p>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p>📞 {vol.phone}</p>
                            <p>✉️ {vol.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
