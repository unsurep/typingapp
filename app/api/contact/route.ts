import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        // Length limits
        if (
            name.length > 100 ||
            email.length > 200 ||
            subject.length > 200 ||
            message.length > 5000
        ) {
            return NextResponse.json({ error: 'Input exceeds maximum allowed length.' }, { status: 400 });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
        }

        const supabase = await createClient();

        const { error } = await supabase
            .from('contact_messages')
            .insert([{ name, email, subject, message }]);

        if (error) {
            console.error('Error inserting contact message:', error);
            return NextResponse.json({ error: 'Failed to save message.' }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (err) {
        console.error('Unexpected error in /api/contact:', err);
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}
