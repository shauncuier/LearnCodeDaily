import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    try {
        // Get user profile
        const userStmt = db.prepare('SELECT id, name, email, role, bio, profilePicture, dateOfBirth, address, availability, createdAt FROM users WHERE id = ?');
        const user = userStmt.get(userId);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Get donor info if exists
        const donorStmt = db.prepare('SELECT * FROM donors WHERE email = ?');
        const donor = donorStmt.get(user.email);

        // Get donation history
        const historyStmt = db.prepare('SELECT * FROM donation_history WHERE donorId = ? ORDER BY donationDate DESC');
        const donationHistory = donor ? historyStmt.all(donor.id) : [];

        // Get badges
        const badgesStmt = db.prepare(`
      SELECT b.*, ub.earnedAt 
      FROM user_badges ub 
      JOIN badges b ON ub.badgeId = b.id 
      WHERE ub.userId = ?
    `);
        const badges = badgesStmt.all(userId);

        return NextResponse.json({
            user,
            donor,
            donationHistory,
            badges,
            stats: {
                totalDonations: donationHistory.length,
                livesSaved: donationHistory.length * 3,
                badgesEarned: badges.length
            }
        });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { userId, bio, profilePicture, dateOfBirth, address, availability } = body;

        const stmt = db.prepare(`
      UPDATE users 
      SET bio = ?, profilePicture = ?, dateOfBirth = ?, address = ?, availability = ?
      WHERE id = ?
    `);

        stmt.run(bio, profilePicture, dateOfBirth, address, availability, userId);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
