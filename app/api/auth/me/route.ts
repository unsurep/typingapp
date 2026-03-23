import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { premiumFreeWindowActive } from '@/lib/server/premiumFree';

export async function GET() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', user.id)
        .single();

    return NextResponse.json({
        authenticated: true,
        userId: user.id,
        // Effective premium includes the global free-mium window.
        isPremium: (profile?.is_premium ?? false) || premiumFreeWindowActive(),
    }, { status: 200 });
}
