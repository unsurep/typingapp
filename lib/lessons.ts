export interface Lesson {
    id: number;
    title: string;
    focus: string;
    shortDesc: string;
    text: string;
}

export const lessons: Lesson[] = [
    {
        id: 1,
        title: "Lesson 1: Home Row",
        focus: "Keys: ASDF JKL;",
        shortDesc: "Master the foundational resting position for touch typing.",
        text: "Welcome to the home row. Keep your fingers resting lightly over A S D F and J K L ;. Do not look down at the keyboard. Feel the small bumps on the F and J keys to anchor your index fingers. Let's begin typing."
    },
    {
        id: 2,
        title: "Lesson 2: Top Row",
        focus: "Keys: QWERTY UIOP",
        shortDesc: "Learn to reach efficiently to the upper letters without looking.",
        text: "Now try reaching for the top row keys. Stretch your fingers up to Q W E R T Y U I O P without moving your hands away from the home row. Practice these smooth upward extensions to build muscle memory."
    },
    {
        id: 3,
        title: "Lesson 3: Bottom Row",
        focus: "Keys: ZXCVB NM,./",
        shortDesc: "Tackle the trickier downward reaches and basic punctuation.",
        text: "The bottom row requires your fingers to curl downward. Practice typing Z X C V B N M , . / carefully. It might feel a bit cramped at first, but with practice, curling your fingers will become completely natural."
    },
    {
        id: 4,
        title: "Lesson 4: Numbers",
        focus: "Keys: 12345 67890",
        shortDesc: "Gain confidence stretching to the top number row accurately.",
        text: "Reaching the number row is the longest stretch. Practice typing 1 2 3 4 5 6 7 8 9 0. Make sure to return your fingers to the home row immediately after striking a number key. Accuracy is more important than speed here."
    },
    {
        id: 5,
        title: "Lesson 5: Common Job Words",
        focus: "Focus: applicant, resume, salary...",
        shortDesc: "Practice typing vocabulary frequently used in modern office environments.",
        text: "Let us put it all together with words you might use at work: applicant, resume, interview, salary, promotion, manager, schedule. Typing these fluently will make you look professional and save you valuable time."
    }
];
