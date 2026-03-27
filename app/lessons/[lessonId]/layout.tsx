import type { Metadata } from "next";
import { lessons } from "@/lib/lessons";

interface LessonLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lessonId: string }>;
}

export async function generateMetadata({ params }: LessonLayoutProps): Promise<Metadata> {
  const { lessonId } = await params;
  const parsedId = Number.parseInt(lessonId, 10);
  const lesson = lessons.find((item) => item.id === parsedId);

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
