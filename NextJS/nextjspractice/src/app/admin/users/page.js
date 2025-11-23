"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function UserManagement() {
    const { user, hasRole } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && (hasRole('admin') || hasRole('super_admin'))) {
            fetchUsers();
        }
    }, [user]);

    const fetchUsers = async () => {
        const res = await fetch('/api/admin?action=users');
        const data = await res.json();
        setUsers(data.users || []);
        setLoading(false);
    };

    const updateRole = async (userId, newRole) => {
        await fetch('/api/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'update_role', userId, role: newRole })
        });
        fetchUsers();
    };

    if (!user || (!hasRole('admin') && !hasRole('super_admin'))) {
        return <div className="text-center py-10">Access Denied</div>;
    }

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-primary">User Management</h1>

            <div className="glass p-6 rounded-xl">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-3">Name</th>
                            <th className="text-left p-3">Email</th>
                            <th className="text-left p-3">Role</th>
                            <th className="text-left p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{u.name}</td>
                                <td className="p-3">{u.email}</td>
                                <td className="p-3">
                                    <select
                                        value={u.role}
                                        onChange={(e) => updateRole(u.id, e.target.value)}
                                        className="p-2 border rounded"
                                    >
                                        <option value="user">User</option>
                                        <option value="donor">Donor</option>
                                        <option value="volunteer">Volunteer</option>
                                        <option value="admin">Admin</option>
                                        <option value="super_admin">Super Admin</option>
                                    </select>
                                </td>
                                <td className="p-3">
                                    <span className="text-xs text-gray-500">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
