import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typing Practice",
  description:
    "Practice typing for free with real-time WPM, accuracy, and error tracking to build faster, cleaner typing habits.",
};

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
