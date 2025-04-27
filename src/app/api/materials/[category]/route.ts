import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { cors } from '@/app/lib/cors';
import { Material } from '@/app/lib/types';

export const GET = cors(async (_req: NextRequest, { params }: { params: { category: string } }) => {
  const { category } = params;
  const [results] = await pool.query<Material[]>(
    "SELECT * FROM materials WHERE category = ?",
    [category]
  );
  return NextResponse.json(results);
});
