"use client";

import { useState } from 'react';

export default function RequestBlood() {
    const [formData, setFormData] = useState({
        patientName: '',
        bloodGroup: '',
        hospital: '',
        contactName: '',
        phone: '',
        urgency: 'Normal'
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to an API
        console.log('Request submitted:', formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-primary mb-2">Request Submitted</h2>
                <p className="text-gray-600 mb-6">
                    Your blood request has been broadcasted to nearby donors. You will be contacted shortly.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                >
                    Submit Another Request
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
            <h1 className="text-3xl font-bold text-center mb-8 text-primary">Request Blood</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                        <input
                            type="text"
                            name="patientName"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group Required</label>
                        <select
                            name="bloodGroup"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            onChange={handleChange}
                        >
                            <option value="">Select Group</option>
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
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hospital / Location</label>
                    <input
                        type="text"
                        name="hospital"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                        <input
                            type="text"
                            name="contactName"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="urgency"
                                value="Normal"
                                defaultChecked
                                onChange={handleChange}
                                className="text-primary focus:ring-primary"
                            />
                            <span>Normal</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="urgency"
                                value="Critical"
                                onChange={handleChange}
                                className="text-primary focus:ring-primary"
                            />
                            <span className="text-red-600 font-bold">Critical</span>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                >
                    Submit Request
                </button>
            </form>
        </div>
    );
}
