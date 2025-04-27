import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { cors } from '@/app/lib/cors';
import { Achievement } from '@/app/lib/types';

async function handler(_req: NextRequest, { params }: { params: { userId: string, materialId: string } }) {
  const { userId, materialId } = params;

  const [results] = await pool.query<Achievement[]>(
    "SELECT * FROM achievements WHERE user_id = ? AND material_id = ?",
    [parseInt(userId), parseInt(materialId)]
  );

  return NextResponse.json({
    status: results.length > 0 ? "learned" : "not learned"
  });
}

// This wrapper adapts (req, context) to (req) for cors
export const GET = (req: NextRequest, context: { params: { userId: string, materialId: string } }) =>
  cors(() => handler(req, context))(req);
