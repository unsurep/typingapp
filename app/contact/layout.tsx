import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Typingverified for support, bug reports, account questions, and feedback about typing lessons, tests, and certificates.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
