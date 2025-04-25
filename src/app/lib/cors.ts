import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const cors = (
  handler: (req: NextRequest) => Promise<NextResponse>,
  allowedOrigins: string[] = ['*']
) => {
  return async (req: NextRequest) => {
    const origin = req.headers.get('origin');
    const response = await handler(req);

    // Set CORS headers
    if (origin && (allowedOrigins.includes('*') || allowedOrigins.includes(origin))) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    
    return response;
  };
};