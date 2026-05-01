import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

function getGrade(wpm: number): { letter: string; label: string; bg: string; text: string } {
  if (wpm >= 71) return { letter: 'A', label: 'Elite Typist', bg: '#1857b6', text: '#ffffff' }
  if (wpm >= 35) return { letter: 'B', label: 'Proficient Typist', bg: '#f4bf3c', text: '#5b2e33' }
  return { letter: 'C', label: 'Certified Typist', bg: '#f35454', text: '#ffffff' }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (!code) {
    return new Response('Missing certificate code', { status: 400 })
  }

  // Fetch certificate data from Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: cert, error } = await supabase
    .from('certificates')
    .select('net_wpm, accuracy, certificate_code, full_name')
    .eq('certificate_code', code)
    .single()

  if (error || !cert) {
    return new Response('Certificate not found', { status: 404 })
  }

  const wpm = Number(cert.net_wpm)
  const accuracy = Number(cert.accuracy)
  const grade = getGrade(wpm)

  return new ImageResponse(
    (
      <div
        style={{
          width: '800px',
          height: '400px',
          display: 'flex',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            width: '8px',
            height: '100%',
            background: '#f4bf3c',
            flexShrink: 0,
          }}
        />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 48px',
            justifyContent: 'space-between',
          }}
        >
          {/* Top row: brand + grade badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '13px',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: '#f4bf3c',
                  fontWeight: 700,
                }}
              >
                TypingVerified
              </span>
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#64748b',
                  marginTop: '4px',
                }}
              >
                typingverified.com
              </span>
            </div>

            {/* Grade circle */}
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: grade.bg,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '28px', fontWeight: 900, color: grade.text, lineHeight: 1 }}>
                {grade.letter}
              </span>
              <span
                style={{
                  fontSize: '8px',
                  fontWeight: 700,
                  color: grade.text,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  opacity: 0.85,
                  marginTop: '2px',
                }}
              >
                Grade
              </span>
            </div>
          </div>

          {/* Name + title */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#94a3b8',
                marginBottom: '8px',
              }}
            >
              Certified
            </span>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 900,
                color: '#f1f5f9',
                lineHeight: 1.1,
                letterSpacing: '-0.5px',
              }}
            >
              {cert.full_name || 'Verified Typist'}
            </span>
            <span
              style={{
                fontSize: '14px',
                color: '#94a3b8',
                marginTop: '6px',
                fontStyle: 'italic',
              }}
            >
              {grade.label}
            </span>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-end' }}>
            {/* WPM */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '42px',
                  fontWeight: 900,
                  color: '#f4bf3c',
                  lineHeight: 1,
                  letterSpacing: '-1px',
                }}
              >
                {wpm}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#64748b',
                  marginTop: '4px',
                }}
              >
                Net WPM
              </span>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '48px', background: '#334155' }} />

            {/* Accuracy */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '42px',
                  fontWeight: 900,
                  color: '#f1f5f9',
                  lineHeight: 1,
                  letterSpacing: '-1px',
                }}
              >
                {accuracy}
                <span style={{ fontSize: '20px', fontWeight: 600, color: '#94a3b8' }}>%</span>
              </span>
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#64748b',
                  marginTop: '4px',
                }}
              >
                Accuracy
              </span>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '48px', background: '#334155' }} />

            {/* Cert code */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#64748b',
                  marginBottom: '4px',
                }}
              >
                Certificate ID
              </span>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: '#475569',
                  letterSpacing: '0.5px',
                }}
              >
                {cert.certificate_code}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 800, height: 400 }
  )
}
