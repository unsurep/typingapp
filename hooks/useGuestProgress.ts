'use client';

import { useCallback } from 'react';

const STORAGE_KEY = 'tv_guest_progress';

type GuestProgress = Record<string, number[]>; // lessonId → completed task indices

export function useGuestProgress() {
  const getProgress = useCallback((): GuestProgress => {
    if (typeof window === 'undefined') return {};
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }, []);

  const getLessonCompletedTasks = useCallback((lessonId: number): number[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      const progress: GuestProgress = data ? JSON.parse(data) : {};
      return progress[String(lessonId)] ?? [];
    } catch {
      return [];
    }
  }, []);

  const saveTaskCompletion = useCallback((lessonId: number, taskIndex: number) => {
    if (typeof window === 'undefined') return;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      const progress: GuestProgress = data ? JSON.parse(data) : {};
      const key = String(lessonId);
      if (!progress[key]) progress[key] = [];
      if (!progress[key].includes(taskIndex)) {
        progress[key].push(taskIndex);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      }
    } catch {
      // localStorage unavailable — fail silently
    }
  }, []);

  return { getProgress, getLessonCompletedTasks, saveTaskCompletion };
}
