import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if environment variables are set
    const hasUrl = !!process.env.KV_REST_API_URL;
    const hasToken = !!process.env.KV_REST_API_TOKEN;
    
    return NextResponse.json({
      status: 'checking',
      env_vars: {
        KV_REST_API_URL: hasUrl ? 'SET' : 'MISSING',
        KV_REST_API_TOKEN: hasToken ? 'SET' : 'MISSING',
      },
      message: hasUrl && hasToken 
        ? 'Environment variables are configured' 
        : 'Environment variables are MISSING - please configure in Vercel Dashboard',
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: String(error),
    }, { status: 500 });
  }
}
