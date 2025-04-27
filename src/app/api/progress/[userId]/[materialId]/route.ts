import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { cors } from '@/app/lib/cors';
import { Achievement } from '@/app/lib/types';

// Handler untuk mengambil data achievements berdasarkan userId dan materialId
async function handler(req: NextRequest, { userId, materialId }: { userId: string; materialId: string }) {
  const [results] = await pool.query<Achievement[]>(
    "SELECT * FROM achievements WHERE user_id = ? AND material_id = ?",
    [parseInt(userId), parseInt(materialId)]
  );

  return NextResponse.json({
    status: results.length > 0 ? "learned" : "not learned"
  });
}

// Fungsi untuk mengeksekusi GET request dengan CORS
export const GET = async (req: NextRequest, context: { params: { userId: string, materialId: string } }) => {
  // Mengambil params dari context
  const { userId, materialId } = context.params;

  // Menggunakan CORS untuk membungkus handler
  return cors(() => handler(req, { userId, materialId }))(req);
};
