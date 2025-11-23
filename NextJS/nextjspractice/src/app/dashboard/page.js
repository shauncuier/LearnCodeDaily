"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }

        if (user) {
            fetch('/api/analytics')
                .then(res => res.json())
                .then(data => {
                    setStats(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user, authLoading, router]);

    if (authLoading || loading) return <div className="text-center py-10">Loading...</div>;
    if (!user) return null; // Prevent flash of content before redirect
    if (!stats) return <div className="text-center py-10">Failed to load analytics.</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-primary">System Analytics</h1>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-primary">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Donors</h3>
                    <p className="text-4xl font-bold text-gray-800 mt-2">{stats.totalDonors}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Total Volunteers</h3>
                    <p className="text-4xl font-bold text-gray-800 mt-2">{stats.totalVolunteers}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm font-medium uppercase">Registered Users</h3>
                    <p className="text-4xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Donors by Blood Group */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-6 border-b pb-2">Donors by Blood Group</h3>
                    <div className="space-y-4">
                        {stats.donorsByGroup.map((group) => (
                            <div key={group.bloodGroup} className="flex items-center justify-between">
                                <span className="font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">{group.bloodGroup}</span>
                                <div className="flex-1 mx-4 h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary"
                                        style={{ width: `${(group.count / stats.totalDonors) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="font-bold text-gray-800">{group.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Donors by District */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-6 border-b pb-2">Top Districts</h3>
                    <div className="space-y-4">
                        {stats.donorsByDistrict.slice(0, 5).map((dist) => (
                            <div key={dist.district} className="flex items-center justify-between">
                                <span className="text-gray-700">{dist.district}</span>
                                <span className="font-bold bg-gray-100 px-3 py-1 rounded-full text-sm">{dist.count} Donors</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
