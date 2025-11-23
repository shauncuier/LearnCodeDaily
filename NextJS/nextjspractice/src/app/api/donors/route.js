import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const bloodGroup = searchParams.get('bloodGroup');
  const district = searchParams.get('district');
  const upazila = searchParams.get('upazila');

  let query = 'SELECT * FROM donors WHERE 1=1';
  const params = [];

  if (bloodGroup) {
    query += ' AND bloodGroup = ?';
    params.push(bloodGroup);
  }

  if (district) {
    query += ' AND lower(district) LIKE ?';
    params.push(`%${district.toLowerCase()}%`);
  }

  if (upazila) {
    query += ' AND lower(upazila) LIKE ?';
    params.push(`%${upazila.toLowerCase()}%`);
  }

  try {
    const stmt = db.prepare(query);
    const donors = stmt.all(...params);
    return NextResponse.json(donors);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, bloodGroup, district, upazila, village, phone, email } = body;

    const id = Date.now().toString();
    const stmt = db.prepare(`
      INSERT INTO donors (id, name, bloodGroup, district, upazila, village, phone, email, lastDonation)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(id, name, bloodGroup, district, upazila, village || '', phone, email, null);

    return NextResponse.json({ id, ...body }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to register donor' }, { status: 500 });
  }
}
