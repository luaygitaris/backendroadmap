import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { cors } from '@/app/lib/cors';
import { Material } from '@/app/lib/types';

// Pisahkan handler untuk memudahkan penggunaan
async function handler(category: string) {
  const [results] = await pool.query<Material[]>(
    "SELECT DISTINCT category FROM materials WHERE category = ?",
    [category]
  );

  return NextResponse.json(results);
}

// Bungkus handler dengan cors yang hanya menerima satu parameter
export const GET = cors(async (req: NextRequest) => {
  // Mendapatkan category dari URL dinamis
  const { category } = req.nextUrl.searchParams;
  

  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 400 });
  }

  return handler(category);
});
