import { collection, getDocs, query, where, limit, addDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/firebase/firebase';

const getUid = (req: NextRequest) => req.nextUrl.searchParams.get('uid');

export async function GET(req: NextRequest) {
  const uid = getUid(req);

  if (!uid) {
    return NextResponse.json({ error: 'Missing UID' }, { status: 400 });
  }

  try {
    const historyQuery = query(collection(db, 'history'), where('uid', '==', uid), limit(50));

    const querySnapshot = await getDocs(historyQuery);
    const history = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
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

    const documentData = {
      ...body,
      uid,
    };

    await addDoc(collection(db, 'history'), documentData);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
