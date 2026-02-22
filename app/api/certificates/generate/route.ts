import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { checkCertificateEligibility } from '@/app/certificate/actions';

export async function POST() {
    const supabase = await createClient();

    try {
        // 1. Check if user is authenticated
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized: User is not authenticated' }, { status: 401 });
        }

        // 2. Run eligibility check
        const { eligible, bestScore } = await checkCertificateEligibility(user.id);

        if (!eligible || !bestScore) {
            // 4. If not eligible: Return error message
            return NextResponse.json({
                error: 'User is not eligible for a certificate. Ensure all lessons are completed and strict test criteria are met.'
            }, { status: 400 });
        }

        // Check if one already exists
        const { data: existing } = await supabase
            .from('certificates')
            .select('*')
            .eq('user_id', user.id)
            .limit(1);

        if (existing && existing.length > 0) {
            return NextResponse.json({
                message: 'Certificate already exists',
                certificate: existing[0]
            }, { status: 200 });
        }

        // 3. If eligible: Generate unique certificate_code (format: TTJ-XXXXXX)
        const randomPart = crypto.randomUUID().substring(0, 6).toUpperCase();
        const certificateCode = `TTJ-${randomPart}`;

        const newCertificate = {
            user_id: user.id,
            certificate_code: certificateCode,
            net_wpm: bestScore.net_wpm,
            accuracy: bestScore.accuracy,
            duration_seconds: 60, // Constant from actions.ts REQUIRED_TEST_DURATION
        };

        // Insert into certificates table
        const { error: insertError } = await supabase
            .from('certificates')
            .insert(newCertificate);

        if (insertError) {
            console.error('Database error creating certificate via API:', insertError);
            return NextResponse.json({ error: 'Failed to create certificate record in the database' }, { status: 500 });
        }

        // Return certificate data
        return NextResponse.json({
            message: 'Certificate successfully generated',
            certificate: newCertificate
        }, { status: 201 });

    } catch (err) {
        console.error('Unexpected error in /api/certificates/generate:', err);
        return NextResponse.json({ error: 'Internal server error while generating certificate' }, { status: 500 });
    }
}
