import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { createClient } from '@/utils/supabase/server';
import { getLocaleFromRequest } from '@/lib/api-locale';

export async function POST(req: NextRequest) {
    try {
        const locale = getLocaleFromRequest(req);
        const t = await getTranslations({ locale, namespace: 'Api' });
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: t('contactAllFields') }, { status: 400 });
        }

        // Length limits
        if (
            name.length > 100 ||
            email.length > 200 ||
            subject.length > 200 ||
            message.length > 5000
        ) {
            return NextResponse.json({ error: t('contactLength') }, { status: 400 });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: t('contactInvalidEmail') }, { status: 400 });
        }

        const supabase = await createClient();

        const { error } = await supabase
            .from('contact_messages')
            .insert([{ name, email, subject, message }]);

        if (error) {
            console.error('Error inserting contact message:', error);
            return NextResponse.json({ error: t('contactSaveFailed') }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (err) {
        console.error('Unexpected error in /api/contact:', err);
        const locale = getLocaleFromRequest(req);
        const t = await getTranslations({ locale, namespace: 'Api' });
        return NextResponse.json({ error: t('contactInternalError') }, { status: 500 });
    }
}
