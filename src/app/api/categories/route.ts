import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { cors } from '@/app/lib/cors';
import { Material } from '@/app/lib/types';

export const GET = cors(async (_req: NextRequest) => {
  const [results] = await pool.query<Material[]>(
    "SELECT DISTINCT category FROM materials"
  );
  return NextResponse.json(results);
});
