'use client';

type GuestProgress = Record<string, number[]>; // lessonId → completed task indices

export function useGuestProgress() {
  const STORAGE_KEY = 'tv_guest_progress';

  const getProgress = (): GuestProgress => {
    if (typeof window === 'undefined') return {};
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  };

  const getLessonCompletedTasks = (lessonId: number): number[] => {
    return getProgress()[String(lessonId)] ?? [];
  };

  const saveTaskCompletion = (lessonId: number, taskIndex: number) => {
    try {
      const progress = getProgress();
      const key = String(lessonId);
      if (!progress[key]) progress[key] = [];
      if (!progress[key].includes(taskIndex)) {
        progress[key].push(taskIndex);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      }
    } catch {
      // localStorage unavailable — fail silently
    }
  };

  return { getProgress, getLessonCompletedTasks, saveTaskCompletion };
}
