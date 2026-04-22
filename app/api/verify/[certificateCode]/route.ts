import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ certificateCode: string }> }
) {
    try {
        const { certificateCode } = await params;
        const supabase = createAdminClient();

        const { data: certificate, error } = await supabase
            .from('certificates')
            .select('*')
            .eq('certificate_code', certificateCode)
            .single();

        if (error || !certificate) {
            return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
        }

        return NextResponse.json({ certificate }, { status: 200 });

    } catch (err) {
        console.error('Unexpected error fetching certificate:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
