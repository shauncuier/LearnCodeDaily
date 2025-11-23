import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
    try {
        const stmt = db.prepare('SELECT * FROM volunteers WHERE status = ?');
        const volunteers = stmt.all('active');
        return NextResponse.json(volunteers);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch volunteers' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, district, upazila } = body;

        const id = Date.now().toString();
        const stmt = db.prepare(`
      INSERT INTO volunteers (id, name, email, phone, district, upazila)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

        stmt.run(id, name, email, phone, district, upazila);

        return NextResponse.json({ id, ...body }, { status: 201 });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to register volunteer' }, { status: 500 });
    }
}
