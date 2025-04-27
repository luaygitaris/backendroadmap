import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { cors } from '@/app/lib/cors';
import { User } from '@/app/lib/types';

export const POST = cors(async (req: NextRequest) => {
  const { name } = await req.json();

  const [results] = await pool.query<User[]>(
    "SELECT * FROM users WHERE name = ?",
    [name]
  );

  if (results.length > 0) {
    return NextResponse.json({
      userId: results[0].id,
      message: "Login successful"
    });
  }

  return NextResponse.json({ error: "User not found" }, { status: 404 });
});
