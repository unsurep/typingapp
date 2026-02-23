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
    },
    {
        id: 6,
        title: "Lesson 6: Capitalization",
        focus: "Keys: Left & Right Shift",
        shortDesc: "Master using the shift keys to capitalize letters fluidly.",
        text: "Capital letters rely on the Shift key. Use the left pinky to hold Shift when typing right-hand letters, and the right pinky for left-hand letters. Practice: Apple, Banana, Cherry. John went to Paris. Do not pause too long."
    },
    {
        id: 7,
        title: "Lesson 7: Advanced Punctuation",
        focus: "Keys: ! ? ' \" - ( )",
        shortDesc: "Incorporate common symbols and punctuation into your typing flow.",
        text: "How are you? I am fine, thanks! She said, \"It's a beautiful day.\" The project (which lasted two weeks) is finally done-what a relief! Mastering these symbols will dramatically improve your real-world typing speed."
    },
    {
        id: 8,
        title: "Lesson 8: Speed Bursts",
        focus: "Focus: short, common words",
        shortDesc: "Build raw speed by repeating short, extremely common English words.",
        text: "the of and a to in is you that it he was for on are as with his they I at be this have from or one had by word but not what all were we when your can said there use an each which she do how their if will up other about out many"
    },
    {
        id: 9,
        title: "Lesson 9: Tech & Code",
        focus: "Focus: html, css, logic",
        shortDesc: "Type specialized vocabulary used in modern technology roles.",
        text: "function return const let variable database server array string boolean boolean boolean const class public static main void argument parameter syntax compiler integer exception undefined null object async await promise"
    },
    {
        id: 10,
        title: "Lesson 10: The Final Challenge",
        focus: "Focus: Full Keyboard Mastery",
        shortDesc: "Put everything together in a complex, multi-sentence paragraph.",
        text: "This is your final test. An effective typist doesn't rely on sight, but entirely on muscle memory and rhythm. If you can maintain over 90% accuracy while navigating capital letters, punctuation! (like so), and numbers like 1, 2, 3... you are ready for certification."
    }
];
