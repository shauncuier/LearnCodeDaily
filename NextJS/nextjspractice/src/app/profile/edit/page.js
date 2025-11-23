"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfileEdit() {
    const { user } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        bio: '',
        dateOfBirth: '',
        address: '',
        availability: 'available'
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                bio: user.bio || '',
                dateOfBirth: user.dateOfBirth || '',
                address: user.address || '',
                availability: user.availability || 'available'
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    ...formData
                })
            });

            if (!res.ok) throw new Error('Failed to update profile');

            setSuccess(true);
            setTimeout(() => router.push(`/profile/${user.id}`), 1500);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (!user) {
        return <div className="text-center py-10">Please log in to edit your profile</div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-primary">Edit Profile</h1>

            {success && (
                <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
                    Profile updated successfully! Redirecting...
                </div>
            )}

            <form onSubmit={handleSubmit} className="glass p-8 rounded-xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                        rows="4"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Tell us about yourself..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                        rows="2"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="Your address..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability Status</label>
                    <select
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                        <option value="available">Available for donation</option>
                        <option value="unavailable">Not available</option>
                    </select>
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
