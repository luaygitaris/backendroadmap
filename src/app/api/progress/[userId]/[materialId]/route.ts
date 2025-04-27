import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { cors } from '@/app/lib/cors';
import { Achievement } from '@/app/lib/types';

// Handler untuk mengambil data achievements berdasarkan userId dan materialId
async function handler(req: NextRequest, userId: string, materialId: string) {
  const [results] = await pool.query<Achievement[]>(
    "SELECT * FROM achievements WHERE user_id = ? AND material_id = ?",
    [parseInt(userId), parseInt(materialId)]
  );

  return NextResponse.json({
    status: results.length > 0 ? "learned" : "not learned"
  });
}

// Fungsi GET dengan parameter yang benar dan CORS yang dibungkus dengan benar
export const GET = cors(async (req: NextRequest) => {
  // Mendapatkan userId dan materialId dari URL
  const urlParts = req.url.split('/');
  const userId = urlParts[urlParts.length - 2]; // Mengambil userId dari URL
  const materialId = urlParts[urlParts.length - 1]; // Mengambil materialId dari URL

  if (!userId || !materialId) {
    return NextResponse.json({ error: 'userId or materialId is missing' }, { status: 400 });
  }

  // Memanggil handler dengan userId dan materialId
  return handler(req, userId, materialId);
});
