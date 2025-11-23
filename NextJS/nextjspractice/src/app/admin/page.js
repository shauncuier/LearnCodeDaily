"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, hasRole } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && !hasRole('admin') && !hasRole('super_admin')) {
      router.push('/');
      return;
    }

    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin?action=stats');
      const data = await res.json();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (!user || (!hasRole('admin') && !hasRole('super_admin'))) {
    return <div className="text-center py-10">Access Denied</div>;
  }

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-primary">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass p-6 rounded-xl">
          <p className="text-sm text-gray-500 mb-2">Total Users</p>
          <p className="text-4xl font-bold text-gray-800">{stats?.totalUsers || 0}</p>
        </div>
        <div className="glass p-6 rounded-xl">
          <p className="text-sm text-gray-500 mb-2">Total Donors</p>
          <p className="text-4xl font-bold text-primary">{stats?.totalDonors || 0}</p>
        </div>
        <div className="glass p-6 rounded-xl">
          <p className="text-sm text-gray-500 mb-2">Pending Requests</p>
          <p className="text-4xl font-bold text-orange-600">{stats?.pendingRequests || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/users" className="glass p-8 rounded-xl hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-full text-3xl">👥</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">User Management</h3>
              <p className="text-gray-600">Manage user roles and permissions</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/volunteers" className="glass p-8 rounded-xl hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-full text-3xl">✅</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Volunteer Approval</h3>
              <p className="text-gray-600">Approve volunteer applications</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
