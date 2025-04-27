import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { cors } from '@/app/lib/cors';

export const POST = cors(async (req: NextRequest) => {
  const { userId, materialId } = await req.json();

  await pool.query(
    "INSERT INTO achievements (user_id, material_id) VALUES (?, ?)",
    [userId, materialId]
  );

  return NextResponse.json({ message: "Progress saved!" });
});
