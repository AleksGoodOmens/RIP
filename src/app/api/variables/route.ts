import { NextRequest, NextResponse } from 'next/server';

import { getUserVariables, saveUserVariables } from '@/lib/variables-server';

const getUid = (req: NextRequest) => req.nextUrl.searchParams.get('uid');

export async function GET(req: NextRequest) {
  const uid = getUid(req);
  if (!uid) return NextResponse.json({ error: 'Missing UID' }, { status: 400 });

  try {
    const variables = await getUserVariables(uid);
    return NextResponse.json(variables);
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const uid = getUid(req);
  if (!uid) return NextResponse.json({ error: 'Missing UID' }, { status: 400 });

  try {
    const body = await req.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid body format' }, { status: 400 });
    }

    await saveUserVariables(uid, body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
