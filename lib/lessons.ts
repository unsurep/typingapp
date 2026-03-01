export interface Lesson {
    id: number;
    title: string;
    focus: string;
    shortDesc: string;
    tasks: string[];
}

export const lessons: Lesson[] = [
    {
        id: 1,
        title: "Lesson 1: Home Row",
        focus: "Keys: ASDF JKL;",
        shortDesc: "Master the foundational resting position for touch typing.",
        tasks: [
            "Welcome to the home row. Keep your fingers resting lightly over A S D F and J K L ;. Do not look down at the keyboard. Feel the small bumps on the F and J keys to anchor your index fingers. Let's begin typing. Stay relaxed.",
            "Always return to the home row. A S D F J K L ;. The home row is your base camp. Try not to press the keys too hard, just a light tap is enough. Keep your wrists hovering slightly above the desk for the best posture.",
            "Accuracy is everything right now. A S D F J K L ;. Build the muscle memory slowly. Don't worry about how fast you are going, your brain is rewiring itself to map your fingers to the keys. Good luck with this final section of the lesson."
        ]
    },
    {
        id: 2,
        title: "Lesson 2: Top Row",
        focus: "Keys: QWERTY UIOP",
        shortDesc: "Learn to reach efficiently to the upper letters without looking.",
        tasks: [
            "Now try reaching for the top row keys. Stretch your fingers up to Q W E R T Y U I O P without moving your hands away from the home row. Practice these smooth upward extensions to build muscle memory safely.",
            "Return to the home row immediately after striking a top row key. Q A W S E D R F T G Y H U J I K O L P ;. Notice how some reaches feel longer than others. Keep your eyes locked to the screen at all times.",
            "Let's combine the rows. A swift panther leaps gracefully across the upper canopy. Words like 'typewriter' and 'property' use a lot of top row letters. Ensure your fingers naturally find their way back to A S D F and J K L ;."
        ]
    },
    {
        id: 3,
        title: "Lesson 3: Bottom Row",
        focus: "Keys: ZXCVB NM,./",
        shortDesc: "Tackle the trickier downward reaches and basic punctuation.",
        tasks: [
            "The bottom row requires your fingers to curl downward. Practice typing Z X C V B N M , . / carefully. It might feel a bit cramped at first. Keep your palms relaxed and don't rest them to ensure flexibility.",
            "With practice, curling your fingers downward will become completely natural. Z A X S C D V F B G N H M J , K . L / ;. This row introduces the comma and the period, which are essential for sentences.",
            "Now try combining all three alphabet rows. A brave monkey vaulted across the wide zoo enclosure. Quiet zebras grazed peacefully near the extra large pond. Just keep practicing to maintain a constant, steady rhythm across all keys."
        ]
    },
    {
        id: 4,
        title: "Lesson 4: Numbers",
        focus: "Keys: 12345 67890",
        shortDesc: "Gain confidence stretching to the top number row accurately.",
        tasks: [
            "Reaching the number row is the longest stretch on a standard keyboard. Practice typing 1 2 3 4 5 6 7 8 9 0. Make sure to return your fingers to the home row immediately after striking a number key.",
            "Accuracy is far more important than speed here. Take your time with the numbers. Type 1999, 2010, 2024, 365, 24, 60. The long stretch can easily lead to typos if you rush it. Look at the screen, not your hands.",
            "Try mixing letters and numbers. I have 2 apples, 5 bananas, and 12 oranges. The year is 2050 and there are 8 planets in the solar system. The train arrives at 8 AM on platform 9. Remember your anchor on the F and J keys."
        ]
    },
    {
        id: 5,
        title: "Lesson 5: Common Job Words",
        focus: "Focus: applicant, resume, salary...",
        shortDesc: "Practice typing vocabulary frequently used in modern office environments.",
        tasks: [
            "Let us put it all together with words you might use at work: applicant, resume, interview, salary, promotion. A strong cover letter highlights your experience and qualifications for the open position. Please review the attached document.",
            "Here are some more business terms: manager, schedule, meeting, project, deadline, corporate, executive. We need to finalize the quarterly report by Friday afternoon. The marketing team is planning a new campaign to increase customer engagement metrics.",
            "Typing fluently will make you look professional and save you valuable time during the workday. Please ensure all invoices are processed through the accounting department. The quarterly revenue projections indicate a steady growth rate."
        ]
    },
    {
        id: 6,
        title: "Lesson 6: Capitalization",
        focus: "Keys: Left & Right Shift",
        shortDesc: "Master using the shift keys to capitalize letters fluidly.",
        tasks: [
            "Capital letters rely on the Shift key. Use the left pinky to hold Shift when typing right-hand letters. Use the right pinky to hold Shift for left-hand letters. Practice: Apple, Banana, Cherry, Date, Elderberry, Fig, Grape, Honeydew.",
            "John went to Paris. Mary traveled to London, England. Microsoft and Apple are large corporate entities. Do not pause too long when reaching for the shift key. The quick transition is vital for maintaining a high typing speed.",
            "The Great Wall of China is a massive historical monument. Mount Everest is the highest mountain on Earth. In July of 1969, Neil Armstrong became the first human to walk on the Moon. Notice how Capital Letters alter the flow."
        ]
    },
    {
        id: 7,
        title: "Lesson 7: Advanced Punctuation",
        focus: "Keys: ! ? ' \" - ( )",
        shortDesc: "Incorporate common symbols and punctuation into your typing flow.",
        tasks: [
            "How are you? I am fine, thanks! She said, \"It's a beautiful day.\" The project (which lasted two weeks) is finally done-what a relief! The symbol ! is Shift+1, the symbol ? is Shift+/. Practice them heavily.",
            "Mastering these symbols will dramatically improve your real-world typing speed. They require the Shift key and an awkward stretch. He asked, \"Are you serious?!\" The flight-number 402-was delayed by severe weather conditions.",
            "Let's try a complex paragraph: The dog's toy (a red, squeaky ball) rolled under the sofa. \"Oh no!\" cried the toddler. \"Where did it go?\" The mother sighed-she was exhausted-and reached under the furniture to retrieve it.",
            "Can you type an email? Dear Mr. Smith: I am writing to inquire about the invoice (INV-00923) dated 05/12. Is it possible to arrange a meeting on Tuesday? Please let me know ASAP! Sincerely, The Management Team."
        ]
    },
    {
        id: 8,
        title: "Lesson 8: Speed Bursts",
        focus: "Focus: short, common words",
        shortDesc: "Build raw speed by repeating short, extremely common English words.",
        tasks: [
            "the of and a to in is you that it he was for on are as with his they I at be this have from or one had by word but not what all were we when your can said there use an each which she do how",
            "their if will up other about out many then them these so some her would make like him into time has look two more write go see number no way could people my than first water been call who oil its now",
            "find long down day did get come made may part over new sound take only little work know place year live me back give most very after thing our just name good sentence man think say great where help through much",
            "before line right too mean old any same tell boy follow came want show also around form three small set put end does another well large must big even such because turn here why ask went men read need land different"
        ]
    },
    {
        id: 9,
        title: "Lesson 9: Tech & Code",
        focus: "Focus: html, css, logic",
        shortDesc: "Type specialized vocabulary used in modern technology roles.",
        tasks: [
            "function calculateTotal(price, taxRate) { return price + (price * taxRate); } const myVariable = true; let count = 0; console.log(\"Initialization complete\"); The modern web relies heavily on JavaScript.",
            "const user = { name: \"Alice\", role: \"Admin\", active: true }; if (user.role === \"Admin\") { grantAccess(); } else { throw new Error(\"Access Denied\"); } Arrays and objects are fundamental data structures.",
            "body { margin: 0; padding: 1rem; font-family: 'Inter', sans-serif; background-color: #f4f4f5; } .container { display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 20px; }",
            "async function fetchData(url) { try { const response = await fetch(url); const json = await response.json(); return json; } catch (error) { console.error(\"Fetch failed:\", error); } } Promises handle async behavior."
        ]
    },
    {
        id: 10,
        title: "Lesson 10: The Final Challenge",
        focus: "Focus: Full Keyboard Mastery",
        shortDesc: "Put everything together in a complex, multi-sentence paragraph.",
        tasks: [
            "This is your final test. An effective typist doesn't rely on sight, but entirely on muscle memory and rhythm. Touch typing is a superpower in the modern age, allowing you to transfer thoughts directly to the digital medium without friction. Keep a steady pace.",
            "If you can maintain over 90% accuracy while navigating capital letters, punctuation! (like so), and numbers like 1, 2, 3... you are well on your way. Do not let complex formatting disrupt your flow. Simply slow down, execute the keystroke, and accelerate back to cruising speed.",
            "Consider the history of the QWERTY keyboard. It was designed in 1873 by Christopher Latham Sholes for the Sholes and Glidden typewriter. The layout was specifically engineered to separate commonly used letter pairs (like 'st' or 'th') to prevent the mechanical striking arms from jamming together at high speeds.",
            "Despite entirely new digital interfaces and alternatives like the Dvorak layout (which claims greater efficiency), QWERTY remains the definitive global standard. The sheer momentum of muscle memory across billions of people makes it nearly impossible to replace. You are participating in a century-old tradition.",
            "Your journey ends here. You have conquered the home row, stretched to the numbers, adapted to capital letters, and mastered complex symbols. Take a deep breath, finish this final paragraph with exceptional accuracy, and prepare to earn your official certification! You are now a touch typist."
        ]
    }
];
