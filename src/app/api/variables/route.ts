// app/api/variables/route.ts
import { NextRequest, NextResponse } from 'next/server';

import { getUserVariables, saveUserVariables } from '@/lib/variables-server';

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get('uid');
  if (!uid) return NextResponse.json({}, { status: 400 });

  const variables = await getUserVariables(uid);
  return NextResponse.json(variables);
}

export async function POST(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get('uid');
  if (!uid) return NextResponse.json({}, { status: 400 });

  const body = await req.json();
  await saveUserVariables(uid, body);
  return NextResponse.json({ success: true });
}
