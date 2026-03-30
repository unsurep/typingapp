import type { AppLocale } from "@/i18n/routing";
import type { Lesson } from "./lesson-types";
import { lessonsDe } from "./content/lessons-de";
import { lessonsEn } from "./content/lessons-en";
import { lessonsEs } from "./content/lessons-es";
import { lessonsFr } from "./content/lessons-fr";
import { lessonsPt } from "./content/lessons-pt";

export type { Lesson } from "./lesson-types";

const byLocale: Record<AppLocale, Lesson[]> = {
  en: lessonsEn,
  fr: lessonsFr,
  es: lessonsEs,
  de: lessonsDe,
  pt: lessonsPt,
};

export function getLessons(locale: AppLocale): Lesson[] {
  return byLocale[locale] ?? lessonsEn;
}

/** @deprecated Prefer getLessons(locale) */
export const lessons = lessonsEn;
