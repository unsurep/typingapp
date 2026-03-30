import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typing Speed Test",
  description:
    "Take a 60-second or 120-second typing speed test and measure net WPM, accuracy, and errors with live feedback.",
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
