import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/lib/db';
import { cors } from '@/app/lib/cors';

const handler = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname.replace('/api/', '');
  const [route, ...params] = pathname.split('/');

  try {
    switch (route) {
      case 'categories':
        return await handleCategories(req);
      case 'materials':
        return await handleMaterials(req, params);
      case 'login':
        return await handleLogin(req);
      case 'progress':
        return params.length === 2 
          ? await handleProgressCheck(req, params)
          : await handleProgressUpdate(req);
      default:
        return NextResponse.json(
          { error: "Endpoint not found" },
          { status: 404 }
        );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

// Handler functions
async function handleCategories(req: NextRequest) {
  if (req.method !== 'GET') return methodNotAllowed();
  
  const [results] = await pool.query("SELECT DISTINCT category FROM materials");
  return NextResponse.json(results);
}

async function handleMaterials(req: NextRequest, params: string[]) {
  if (req.method !== 'GET') return methodNotAllowed();
  
  const [category] = params;
  const [results] = await pool.query(
    "SELECT * FROM materials WHERE category = ?",
    [category]
  );
  return NextResponse.json(results);
}

async function handleLogin(req: NextRequest) {
  if (req.method !== 'POST') return methodNotAllowed();
  
  const { name } = await req.json();
  const [results]: any = await pool.query(
    "SELECT * FROM users WHERE name = ?",
    [name]
  );

  if (results.length > 0) {
    const user = results[0];
    return NextResponse.json({ userId: user.id, message: "Login successful" });
  }
  return NextResponse.json({ error: "User not found" }, { status: 404 });
}

async function handleProgressUpdate(req: NextRequest) {
  if (req.method !== 'POST') return methodNotAllowed();
  
  const { userId, materialId } = await req.json();
  await pool.query(
    "INSERT INTO achievements (user_id, material_id) VALUES (?, ?)",
    [userId, materialId]
  );
  return NextResponse.json({ message: "Progress saved!" });
}

async function handleProgressCheck(req: NextRequest, params: string[]) {
  if (req.method !== 'GET') return methodNotAllowed();
  
  const [userId, materialId] = params;
  const [results]: any = await pool.query(
    "SELECT * FROM achievements WHERE user_id = ? AND material_id = ?",
    [userId, materialId]
  );

  return NextResponse.json({
    status: results.length > 0 ? "learned" : "not learned"
  });
}

function methodNotAllowed() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export const GET = cors(handler);
export const POST = cors(handler);
export const OPTIONS = cors(async () => new NextResponse(null, { status: 204 }));