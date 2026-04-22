import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wpm = searchParams.get('wpm') || '0';
  const accuracy = searchParams.get('accuracy') || '0';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand */}
        <div style={{ fontSize: '22px', opacity: 0.55, marginBottom: '28px', letterSpacing: '3px', textTransform: 'uppercase' }}>
          TypingVerified.com
        </div>

        {/* WPM — brand gold colour */}
        <div style={{ fontSize: '108px', fontWeight: '900', color: '#f4bf3c', lineHeight: '1', letterSpacing: '-2px' }}>
          {wpm} WPM
        </div>

        {/* Accuracy */}
        <div style={{ fontSize: '38px', marginTop: '20px', opacity: 0.8, fontWeight: '600' }}>
          {accuracy}% Accuracy
        </div>

        {/* Gold divider */}
        <div style={{ width: '72px', height: '3px', background: '#f4bf3c', margin: '36px 0', opacity: 0.5 }} />

        {/* CTA */}
        <div style={{ fontSize: '20px', opacity: 0.45, letterSpacing: '1px' }}>
          Can you beat this? → typingverified.com/test
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
