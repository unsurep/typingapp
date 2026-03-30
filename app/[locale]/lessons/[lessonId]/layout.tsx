import type { Metadata } from "next";
import { getLessons } from "@/lib/lessons";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

interface LessonLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string; lessonId: string }>;
}

export async function generateMetadata({ params }: LessonLayoutProps): Promise<Metadata> {
  const { lessonId, locale: loc } = await params;
  const locale = hasLocale(routing.locales, loc) ? loc : routing.defaultLocale;
  const parsedId = Number.parseInt(lessonId, 10);
  const lesson = getLessons(locale).find((item) => item.id === parsedId);

  if (!lesson) {
    return {
      title: "Lesson",
      description:
        "Complete structured typing lessons on Typingverified to improve WPM, accuracy, and keyboard confidence.",
    };
  }

  return {
    title: lesson.title,
    description: `${lesson.shortDesc} Practice ${lesson.focus.toLowerCase()} and improve typing speed and accuracy on Typingverified lessons.`,
  };
}

export default function LessonDetailLayout({ children }: LessonLayoutProps) {
  return children;
}
