import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ wpm?: string; accuracy?: string }>;
}): Promise<Metadata> {
  const params = (await searchParams) ?? {};
  const wpm = params.wpm;
  const accuracy = params.accuracy;

  if (wpm && accuracy) {
    const ogImage = `https://www.typingverified.com/api/og/result?wpm=${wpm}&accuracy=${accuracy}`;
    return {
      title: `${wpm} WPM Typing Test — TypingVerified`,
      description: `Can you beat ${wpm} WPM with ${accuracy}% accuracy? Try the free typing speed test now.`,
      openGraph: {
        title: `${wpm} WPM on TypingVerified`,
        description: `Can you beat ${wpm} WPM with ${accuracy}% accuracy? Test your typing speed for free.`,
        images: [{ url: ogImage, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${wpm} WPM on TypingVerified`,
        description: `Can you beat ${wpm} WPM with ${accuracy}% accuracy?`,
        images: [ogImage],
      },
    };
  }

  return {
    title: "Typing Speed Test",
    description:
      "Take a 60-second or 120-second typing speed test and measure net WPM, accuracy, and errors with live feedback.",
  };
}

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
