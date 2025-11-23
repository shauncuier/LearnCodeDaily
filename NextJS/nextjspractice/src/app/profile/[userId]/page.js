"use client";

import { useState, useEffect } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage({ params }) {
    const unwrappedParams = use(params);
    const { user: currentUser } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, [unwrappedParams.userId]);

    const fetchProfile = async () => {
        try {
            const res = await fetch(`/api/profile?userId=${unwrappedParams.userId}`);
            const data = await res.json();
            setProfile(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-10">Loading profile...</div>;
    if (!profile) return <div className="text-center py-10">Profile not found</div>;

    const isOwnProfile = currentUser?.id === unwrappedParams.userId;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="glass p-8 rounded-xl mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.user.name}</h1>
                        <p className="text-gray-600">{profile.user.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {profile.user.role}
                        </span>
                    </div>
                    {isOwnProfile && (
                        <Link
                            href="/profile/edit"
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Edit Profile
                        </Link>
                    )}
                </div>

                {profile.user.bio && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">{profile.user.bio}</p>
                    </div>
                )}

                {profile.donor && (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Blood Group</p>
                            <p className="text-2xl font-bold text-primary">{profile.donor.bloodGroup}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="text-lg font-medium text-gray-800">{profile.donor.district}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Status</p>
                            <p className={`text-lg font-medium ${profile.user.availability === 'available' ? 'text-green-600' : 'text-gray-500'}`}>
                                {profile.user.availability === 'available' ? 'Available' : 'Not Available'}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg text-center">
                            <p className="text-sm text-gray-500">Donations</p>
                            <p className="text-2xl font-bold text-gray-800">{profile.stats.totalDonations}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="glass p-6 rounded-xl text-center">
                    <p className="text-4xl font-bold text-primary mb-2">{profile.stats.totalDonations}</p>
                    <p className="text-gray-600">Total Donations</p>
                </div>
                <div className="glass p-6 rounded-xl text-center">
                    <p className="text-4xl font-bold text-green-600 mb-2">{profile.stats.livesSaved}</p>
                    <p className="text-gray-600">Lives Saved</p>
                </div>
                <div className="glass p-6 rounded-xl text-center">
                    <p className="text-4xl font-bold text-blue-600 mb-2">{profile.stats.badgesEarned}</p>
                    <p className="text-gray-600">Badges Earned</p>
                </div>
            </div>

            {/* Donation History */}
            <div className="glass p-6 rounded-xl mb-6">
                <h2 className="text-2xl font-bold mb-4">Donation History</h2>
                {profile.donationHistory.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No donations recorded yet</p>
                ) : (
                    <div className="space-y-3">
                        {profile.donationHistory.map((donation) => (
                            <div key={donation.id} className="flex justify-between items-center p-4 bg-white rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-800">{donation.location}</p>
                                    <p className="text-sm text-gray-500">{new Date(donation.donationDate).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-primary">{donation.bloodGroup}</p>
                                    <p className="text-sm text-gray-500">{donation.units} unit(s)</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Badges */}
            {profile.badges.length > 0 && (
                <div className="glass p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4">Badges</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {profile.badges.map((badge) => (
                            <div key={badge.id} className="bg-white p-4 rounded-lg text-center hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-2">{badge.icon || '🏅'}</div>
                                <p className="font-bold text-gray-800">{badge.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
