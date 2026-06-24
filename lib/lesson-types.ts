// Step types that make up a guided, beginner-first typing journey.
// The order of steps inside a lesson IS the user journey: finger placement →
// single-key familiarisation → small drills → words → full sentences.
//
// IMPORTANT: progress is stored by step *index* (completed_tasks + task_scores
// in Supabase, and the guest localStorage map). Keeping each lesson an ordered
// list of typed steps means none of the persistence layer has to change.
export type StepType =
  | "place" // "Rest your finger on this key" — get oriented, then tap it
  | "key" // Drill a single newly-introduced key
  | "drill" // Combine new keys with each other / previously learned keys
  | "words" // Type real words using only the keys learned so far
  | "sentence"; // Put it together into a full sentence

export interface LessonStep {
  /** Determines the on-screen coaching and how the keyboard guide behaves. */
  type: StepType;
  /** Localized, plain-language instruction shown above the keyboard. */
  instruction: string;
  /** The exact characters the learner must type for this step. */
  text: string;
  /** Keys to highlight on the on-screen keyboard (lowercase, " " for space). */
  keys: string[];
  /** Newly introduced keys for this step (emphasised differently). */
  newKeys?: string[];
}

export interface Lesson {
  id: number;
  /** Which stage of the journey this lesson belongs to (1-based). */
  stageId: number;
  /** Localized stage name, e.g. "Home Row" / "Rangée de repos". */
  stage: string;
  title: string;
  focus: string;
  shortDesc: string;
  /** Suggested words-per-minute goal for this lesson. */
  goalWpm: number;
  steps: LessonStep[];
}
