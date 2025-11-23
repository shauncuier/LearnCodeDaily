import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
    try {
        const totalDonors = db.prepare('SELECT COUNT(*) as count FROM donors').get().count;
        const totalVolunteers = db.prepare('SELECT COUNT(*) as count FROM volunteers').get().count;
        const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get().count;

        // Group by blood group
        const donorsByGroup = db.prepare('SELECT bloodGroup, COUNT(*) as count FROM donors GROUP BY bloodGroup').all();

        // Group by district
        const donorsByDistrict = db.prepare('SELECT district, COUNT(*) as count FROM donors GROUP BY district').all();

        return NextResponse.json({
            totalDonors,
            totalVolunteers,
            totalUsers,
            donorsByGroup,
            donorsByDistrict
        });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
