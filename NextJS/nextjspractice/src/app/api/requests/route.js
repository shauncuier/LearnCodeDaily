import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const urgency = searchParams.get('urgency');
    const bloodGroup = searchParams.get('bloodGroup');

    let query = 'SELECT * FROM blood_requests WHERE 1=1';
    const params = [];

    if (status) {
        query += ' AND status = ?';
        params.push(status);
    }

    if (urgency) {
        query += ' AND urgency = ?';
        params.push(urgency);
    }

    if (bloodGroup) {
        query += ' AND bloodGroup = ?';
        params.push(bloodGroup);
    }

    query += ' ORDER BY createdAt DESC';

    try {
        const stmt = db.prepare(query);
        const requests = stmt.all(...params);
        return NextResponse.json(requests);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            patientName, bloodGroup, units, urgency, hospital,
            district, upazila, contactPhone, contactEmail,
            requestedBy, notes
        } = body;

        const id = Date.now().toString();
        const stmt = db.prepare(`
      INSERT INTO blood_requests (
        id, patientName, bloodGroup, units, urgency, hospital,
        district, upazila, contactPhone, contactEmail, requestedBy, notes, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

        stmt.run(
            id, patientName, bloodGroup, units, urgency || 'normal', hospital,
            district, upazila, contactPhone, contactEmail, requestedBy || null, notes || '', 'pending'
        );

        return NextResponse.json({ id, ...body }, { status: 201 });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to create request' }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const body = await request.json();
        const { id, status, fulfilledAt } = body;

        const stmt = db.prepare(`
      UPDATE blood_requests 
      SET status = ?, fulfilledAt = ?
      WHERE id = ?
    `);

        stmt.run(status, fulfilledAt || null, id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
    }
}
