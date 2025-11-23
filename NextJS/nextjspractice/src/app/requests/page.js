"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BloodRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    urgency: '',
    bloodGroup: ''
  });

  useEffect(() => {
    fetchRequests();
  }, [filters]);

  const fetchRequests = async () => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.urgency) params.append('urgency', filters.urgency);
    if (filters.bloodGroup) params.append('bloodGroup', filters.bloodGroup);

    const res = await fetch(`/api/requests?${params}`);
    const data = await res.json();
    setRequests(data);
    setLoading(false);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'urgent': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'fulfilled': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) return <div className="text-center py-10">Loading requests...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Blood Requests</h1>
        <Link
          href="/requests/create"
          className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-md"
        >
          + Create Request
        </Link>
      </div>

      {/* Filters */}
      <div className="glass p-6 rounded-xl mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={filters.urgency}
          onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg"
        >
          <option value="">All Urgency Levels</option>
          <option value="critical">Critical</option>
          <option value="urgent">Urgent</option>
          <option value="normal">Normal</option>
        </select>

        <select
          value={filters.bloodGroup}
          onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg"
        >
          <option value="">All Blood Groups</option>
          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No requests found</div>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="glass p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{req.patientName}</h3>
                  <p className="text-gray-600">{req.hospital} • {req.district}, {req.upazila}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(req.urgency)}`}>
                    {req.urgency.toUpperCase()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Blood Group</p>
                  <p className="font-bold text-primary text-lg">{req.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Units Needed</p>
                  <p className="font-bold text-gray-800">{req.units}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium text-gray-800">{req.contactPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Posted</p>
                  <p className="font-medium text-gray-800">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {req.notes && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{req.notes}</p>
                </div>
              )}

              {req.status === 'pending' && (
                <div className="mt-4 flex gap-2">
                  <a
                    href={`tel:${req.contactPhone}`}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Call Now
                  </a>
                  <a
                    href={`mailto:${req.contactEmail}`}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Email
                  </a>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
