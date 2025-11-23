import { NextResponse } from 'next/server';
import db from '@/lib/db';

// Initialize default badges
const initializeBadges = () => {
    const badges = [
        { id: '1', name: 'First Blood', description: 'First donation', criteria: '1', icon: '🩸' },
        { id: '2', name: 'Lifesaver', description: '5 donations', criteria: '5', icon: '💪' },
        { id: '3', name: 'Hero', description: '10 donations', criteria: '10', icon: '🦸' },
        { id: '4', name: 'Legend', description: '25 donations', criteria: '25', icon: '🏆' },
    ];

    const existing = db.prepare('SELECT COUNT(*) as count FROM badges').get();
    if (existing.count === 0) {
        const stmt = db.prepare('INSERT INTO badges (id, name, description, criteria, icon) VALUES (?, ?, ?, ?, ?)');
        badges.forEach(b => stmt.run(b.id, b.name, b.description, b.criteria, b.icon));
    }
};

initializeBadges();

export async function POST(request) {
    try {
        const body = await request.json();
        const { donorId, donationDate, location, bloodGroup, units, recipient } = body;

        const id = Date.now().toString();
        const stmt = db.prepare(`
      INSERT INTO donation_history (id, donorId, donationDate, location, bloodGroup, units, recipient)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

        stmt.run(id, donorId, donationDate, location, bloodGroup, units || 1, recipient || '');

        // Update last donation in donors table
        db.prepare('UPDATE donors SET lastDonation = ? WHERE id = ?').run(donationDate, donorId);

        // Check and award badges
        const count = db.prepare('SELECT COUNT(*) as count FROM donation_history WHERE donorId = ?').get(donorId).count;
        const badges = db.prepare('SELECT * FROM badges WHERE CAST(criteria AS INTEGER) <= ?').all(count);

        badges.forEach(badge => {
            const existing = db.prepare('SELECT * FROM user_badges WHERE userId = ? AND badgeId = ?').get(donorId, badge.id);
            if (!existing) {
                db.prepare('INSERT INTO user_badges (id, userId, badgeId) VALUES (?, ?, ?)').run(Date.now().toString() + badge.id, donorId, badge.id);
            }
        });

        return NextResponse.json({ success: true, id });
    } catch (error) {
        console.error('Donation history error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
