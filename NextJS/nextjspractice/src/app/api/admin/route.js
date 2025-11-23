import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    try {
        switch (action) {
            case 'users':
                const users = db.prepare('SELECT id, name, email, role, createdAt FROM users ORDER BY createdAt DESC').all();
                return NextResponse.json({ users });

            case 'stats':
                const stats = {
                    totalUsers: db.prepare('SELECT COUNT(*) as count FROM users').get().count,
                    totalDonors: db.prepare('SELECT COUNT(*) as count FROM donors').get().count,
                    totalVolunteers: db.prepare('SELECT COUNT(*) as count FROM volunteers').get().count,
                    totalRequests: db.prepare('SELECT COUNT(*) as count FROM blood_requests').get().count,
                    pendingRequests: db.prepare('SELECT COUNT(*) as count FROM blood_requests WHERE status = "pending"').get().count,
                };
                return NextResponse.json(stats);

            case 'pending_volunteers':
                const volunteers = db.prepare('SELECT * FROM volunteers WHERE status = "pending" ORDER BY createdAt DESC').all();
                return NextResponse.json({ volunteers });

            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error('Admin API error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { action, userId, role, volunteerId, status } = body;

        switch (action) {
            case 'update_role':
                db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, userId);
                return NextResponse.json({ success: true });

            case 'approve_volunteer':
                db.prepare('UPDATE volunteers SET status = ? WHERE id = ?').run(status, volunteerId);
                return NextResponse.json({ success: true });

            case 'delete_user':
                db.prepare('DELETE FROM users WHERE id = ?').run(userId);
                return NextResponse.json({ success: true });

            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        console.error('Admin API error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
