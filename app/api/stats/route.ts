import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const [
      { count: testsCompleted },
      { count: certificatesEarned },
      { count: usersRegistered },
    ] = await Promise.all([
      supabase.from('test_results').select('*', { count: 'exact', head: true }),
      supabase.from('certificates').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
    ]);

    return NextResponse.json({
      testsCompleted: testsCompleted ?? 0,
      certificatesEarned: certificatesEarned ?? 0,
      usersRegistered: usersRegistered ?? 0,
    });
  } catch {
    return NextResponse.json(
      { testsCompleted: 0, certificatesEarned: 0, usersRegistered: 0 },
      { status: 500 }
    );
  }
}
