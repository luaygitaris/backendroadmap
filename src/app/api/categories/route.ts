import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { cors } from '@/app/lib/cors';
import { Material } from '@/app/lib/types';

// No need for _req if it's not being used
export const GET = cors(async () => {
  const [results] = await pool.query<Material[]>(
    "SELECT DISTINCT category FROM materials"
  );
  return NextResponse.json(results);
});
