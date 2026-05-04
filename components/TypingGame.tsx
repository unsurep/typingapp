"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Word list ────────────────────────────────────────────────────────────────
const WORD_LIST = [
  // 3–4 letters
  "ace","add","age","aid","aim","air","and","any","are","arm","art","ask",
  "bad","bag","ban","bar","bat","bay","bed","big","bit","bow","box","boy",
  "bug","bus","but","buy","can","cap","car","cat","cry","cup","cut","day",
  "did","dig","dog","dot","dry","due","ear","eat","egg","end","era","eye",
  "far","fat","few","fit","fix","fly","fog","for","fun","fur","gap","gas",
  "get","god","got","gun","gut","guy","had","has","hat","her","him","hip",
  "his","hit","hop","hot","how","hug","ice","ink","its","jar","jaw","jet",
  "job","joy","key","kid","kit","lag","lap","law","lay","led","leg","let",
  "lid","lip","lit","log","lot","low","mad","man","map","mat","may","men",
  "met","mix","mob","mom","mud","mug","net","new","nod","not","now","odd",
  "off","oil","old","one","opt","our","out","own","pad","pan","pat","pay",
  "pet","pie","pig","pin","pit","pod","pop","pot","pub","put","raw","ray",
  "red","rid","rig","rip","rod","row","rub","rug","run","sad","sat","saw",
  "say","sea","set","she","sin","sip","sit","six","sky","sob","son","spa",
  "spy","sub","sum","sun","tab","tag","tan","tap","tar","tax","tip","toe",
  "top","toy","try","tub","tug","two","use","van","vet","war","was","web",
  "wet","who","why","win","wit","won","wow","yes","yet","you","zap","zip",
  "able","acid","aged","also","arch","area","army","atom","auto","axis",
  "baby","back","bake","ball","band","bank","bare","barn","base","bath",
  "bear","beat","beer","bell","best","bike","bill","bind","bird","bite",
  "blue","blur","boat","body","bold","bolt","bomb","bond","bone","book",
  "born","boss","both","brew","buck","bulk","bull","burn","byte","cage",
  "cake","call","calm","came","camp","card","care","case","cash","cast",
  "cave","cell","chat","chef","chin","chip","chop","city","clap","clay",
  "clip","club","clue","coal","coat","code","coil","cold","cola","come",
  "cone","cook","cool","cope","copy","cord","core","corn","cost","cozy",
  "crew","crop","cube","cure","curl","dame","dare","dark","dart","data",
  "date","dawn","dead","deal","dear","deck","deed","deep","deer","deny",
  "desk","dial","dice","diet","dirt","disc","dish","disk","dive","dock",
  "does","done","doom","door","dose","dove","down","draw","drip","drop",
  "drum","dump","dune","dusk","dust","duty","each","earn","ease","edge",
  "emit","epic","euro","even","ever","evil","exam","exit","face","fact",
  "fail","fake","fall","fame","farm","fast","fate","fear","feat","feed",
  "feel","feet","fell","felt","file","fill","film","find","fine","fire",
  "firm","fish","fist","flag","flat","flaw","fled","flew","flip","flow",
  "foam","fold","folk","fond","font","food","fool","foot","ford","fork",
  "form","fort","foul","four","free","from","full","fume","fund","fuse",
  "gain","game","gate","gave","gaze","gear","gene","gift","girl","give",
  "glad","glow","glue","goal","goes","gold","golf","good","gown","grab",
  "gray","grew","grid","grim","grip","grow","guru","hack","half","hall",
  "halt","hand","hang","hard","hare","harm","have","hawk","head","heal",
  "heap","heat","held","hell","help","here","hero","high","hill","hint",
  "hire","hold","hole","holy","home","hook","hope","horn","host","hour",
  "huge","hull","hung","hunt","hurt","idea","idle","inch","into","iron",
  "item","jack","jade","jail","jazz","jerk","join","joke","jump","junk",
  "jury","just","keen","keep","kill","kind","king","knee","knew","knot",
  "know","lack","lake","lamp","land","lane","last","late","lawn","lead",
  "leaf","lean","leap","left","lend","less","levy","like","lime","line",
  "link","lion","list","live","load","loan","lock","loft","lone","long",
  "look","loop","lord","lore","lose","loss","lost","loud","love","luck",
  "lure","lurk","lush","made","mail","main","make","male","mall","many",
  "mark","mask","mass","mast","mate","meal","mean","meat","meet","melt",
  "memo","menu","mesh","mild","mile","milk","mill","mind","mine","mint",
  "miss","mist","mode","mold","mole","moon","more","most","move","much",
  "mule","muse","mute","myth","nail","name","neat","neck","need","nest",
  "next","nice","nine","node","none","noon","note","null","numb","oath",
  "once","only","open","oral","oven","over","pace","pack","page","paid",
  "pair","pale","palm","park","part","pass","past","path","peak","pear",
  "peel","peer","perk","pick","pill","pink","pipe","plan","play","plea",
  "plot","plow","plug","plus","poem","pole","poll","pond","pool","poor",
  "pore","port","pose","post","pour","prey","prod","puff","pull","pump",
  "pure","push","quiz","race","rack","rage","raid","rail","rain","rake",
  "ramp","rank","rant","rare","rate","read","real","reap","rear","reed",
  "reel","rely","rent","rest","rice","rich","ride","ring","riot","rise",
  "risk","road","roam","roar","rock","role","roll","roof","room","root",
  "rope","rose","ruin","rule","rush","rust","safe","sage","sail","sake",
  "sale","salt","same","sand","sane","save","scan","scar","seal","seed",
  "seek","seem","seen","self","sell","send","sent","shed","ship","shop",
  "shot","show","shut","side","sift","sigh","silk","sing","sink","site",
  "size","skin","skip","slam","slim","slip","slot","slow","slug","snap",
  "snow","soak","soap","sock","sofa","soil","sole","some","song","soon",
  "sort","soul","sour","span","spin","spit","spot","spur","stab","star",
  "stay","stem","step","stew","stir","stop","stub","stud","such","suit",
  "sung","sunk","sway","sync","tale","tall","tame","tank","tape","task",
  "team","tear","tell","temp","tend","tent","term","test","text","than",
  "that","them","then","they","thin","this","tilt","time","tiny","tire",
  "told","toll","tomb","tome","tone","took","tool","torn","toss","tour",
  "town","trap","tree","trek","trim","trip","true","tube","tune","turf",
  "turn","type","ugly","undo","unit","unto","upon","urge","used","user",
  "vary","vast","veil","vein","verb","very","vest","vibe","view","vine",
  "visa","void","volt","wade","wage","wait","wake","walk","wall","wand",
  "want","ward","warm","warn","wash","wave","weak","wear","weed","week",
  "well","went","were","wide","wiki","wild","will","wind","wine","wing",
  "wink","wire","wise","wish","with","woke","wolf","wood","word","work",
  "worm","wrap","yard","yarn","year","yell",
  // 5–6 letters
  "about","above","abuse","actor","acute","after","again","agent","agree",
  "ahead","alarm","album","alien","align","alive","alley","allow","alone",
  "along","alpha","alter","angel","angle","angry","anime","ankle","apart",
  "apple","apply","arena","argue","arise","array","arrow","aside","asset",
  "atlas","attic","audit","avoid","await","aware","badge","badly","basic",
  "basis","batch","beach","began","begin","being","below","bench","black",
  "blade","blame","blank","blast","blaze","bleed","blend","bless","blind",
  "block","blood","bloom","blown","board","boost","bound","brace","brain",
  "brand","brave","bread","break","breed","brick","bride","brief","bring",
  "brisk","broad","broke","brown","brute","build","built","burst","buyer",
  "cabin","cargo","carry","catch","cause","chain","chair","chalk","chaos",
  "charm","chart","chase","cheap","check","cheek","cheer","chess","chest",
  "chief","child","chill","chord","chose","chunk","civic","civil","claim",
  "class","clean","clear","clerk","click","cliff","climb","cling","clock",
  "clone","close","cloud","coach","coast","cobra","codec","comet","comic",
  "coral","could","count","court","cover","crack","craft","crane","crash",
  "crazy","cream","crest","crime","crisp","cross","crowd","crown","cruel",
  "crush","curve","cyber","cycle","daily","dance","debug","delta","dense",
  "depot","depth","digit","ditch","dodge","doing","draft","drain","drama",
  "drawn","dream","dress","drill","drink","drone","drove","dwarf","eagle",
  "earth","eight","elite","email","embed","empty","enemy","enjoy","enter",
  "entry","equal","error","essay","event","every","exact","extra","faint",
  "faith","false","fancy","ferry","fever","fiber","field","fifth","fifty",
  "fight","final","first","fixed","flame","flash","fleet","flesh","float",
  "flock","flood","floor","flour","flute","focus","force","forge","forum",
  "found","frame","fresh","front","froze","fruit","fully","fuzzy","giant",
  "given","glare","glass","gleam","glide","gloom","glory","globe","grace",
  "grade","grain","grand","grant","graph","grasp","grass","grave","great",
  "greed","green","greet","grief","grind","groan","gross","group","grove",
  "grown","guard","guest","guide","guild","guilt","gusto","habit","hands",
  "happy","harsh","haven","hatch","heart","heavy","hence","hinge","honor",
  "hooks","hours","house","human","humor","hyper","ideal","image","imply",
  "inbox","index","indie","inner","input","intro","issue","jewel","joint",
  "joker","judge","juice","juicy","jumbo","knife","knock","known","label",
  "large","laser","later","laugh","layer","learn","leave","legal","lemon",
  "level","light","limit","liner","links","local","logic","login","loose",
  "lower","loyal","lucky","lunar","lyric","magic","major","maker","march",
  "match","mayor","mercy","merit","metal","meter","might","minor","minus",
  "model","money","month","moral","motor","mount","mouse","mouth","moved",
  "movie","music","nerve","never","night","noble","noise","north","novel",
  "nudge","ocean","offer","often","omega","onset","orbit","order","other",
  "outer","owner","ozone","panic","paper","party","patch","pause","peace",
  "phase","phone","photo","pixel","pizza","place","plain","plane","plant",
  "plate","plaza","pluck","plumb","plume","point","polar","popup","porch",
  "pound","power","press","price","pride","prime","print","prior","probe",
  "prone","proof","prose","proud","prove","prune","pulse","punch","purse",
  "query","queue","quick","quiet","quota","quote","radar","radio","raise",
  "rally","range","rapid","ratio","reach","realm","rebel","remix","renew",
  "reply","reset","rider","ridge","rifle","rigid","risky","river","robot",
  "rocky","rough","round","route","royal","ruler","rural","rusty","sadly",
  "saint","salad","sauce","scale","scene","scope","score","scout","seize",
  "sense","serve","seven","shaft","shake","shame","shape","share","sharp",
  "shelf","shell","shift","shine","shirt","shock","shore","short","shout",
  "sight","silly","since","sixth","sixty","skill","skull","sleep","slice",
  "slide","slope","small","smart","smell","smile","smoke","snack","snake",
  "solar","solid","solve","sorry","sound","south","space","spare","spark",
  "spawn","speak","spear","speed","spend","spice","spill","spine","split",
  "spoke","sport","spray","stack","staff","stage","stake","stale","stall",
  "stand","stare","start","state","stays","steel","steep","steer","stern",
  "still","sting","stock","stone","stood","store","storm","story","stove",
  "strip","study","style","sugar","suite","super","surge","swamp","swear",
  "sweep","sweet","swept","swift","swing","swipe","sword","syrup","table",
  "tango","taste","teach","tears","tenth","tense","terms","their","there",
  "these","thick","thing","think","third","those","three","throw","tiger",
  "timed","timer","tired","title","token","topic","total","touch","tough",
  "tower","track","trade","trail","train","trait","trash","tread","treat",
  "trend","trial","trick","tried","troop","trove","truce","truck","truly",
  "trunk","trust","truth","turbo","twice","twist","ultra","under","unify",
  "union","unity","until","upper","upset","urban","usage","users","usual",
  "utter","valid","value","valve","vault","vibes","video","viral","visit",
  "vital","vivid","vocal","voice","voter","waltz","watch","water","weave",
  "wedge","weigh","weird","whale","where","which","while","white","whole",
  "whose","wired","witch","woman","women","woods","world","worry","worse",
  "worst","worth","would","wound","wrath","write","wrong","yacht","yield",
  "young","yours","youth","zesty",
  // 7–9 letters
  "account","achieve","acquire","address","advance","against","already",
  "amazing","another","attempt","balance","because","becomes","between",
  "brought","browser","builder","capture","careful","central","certain",
  "chapter","circuit","climate","collect","college","combine","command",
  "comment","company","compare","compile","complex","compute","confirm",
  "connect","content","context","control","convert","correct","country",
  "current","dataset","decided","default","defense","defined","deliver",
  "desktop","digital","discuss","display","distant","divided","dynamic",
  "element","enabled","enhance","exactly","example","execute","explain",
  "explore","express","extract","failure","feature","finally","finding",
  "follows","forever","forward","founded","freedom","generic","getting",
  "graphic","greater","growing","handled","heading","helping","history",
  "hundred","illegal","include","initial","instead","integer","invalid",
  "invoice","isolate","journey","justice","keyboard","kitchen","landing",
  "largest","learned","library","limited","loading","located","machine",
  "manages","mapping","maximum","measure","mention","message","minimum",
  "missing","monitor","morning","network","nothing","numbers","options",
  "outcome","outside","package","patient","payment","perfect","perform",
  "perhaps","picture","playing","popular","present","primary","problem",
  "process","produce","product","program","project","promise","provide",
  "quality","quarter","quickly","reading","receive","rebuild","records",
  "recover","refresh","regular","related","replace","require","resolve",
  "restore","results","returns","running","runtime","scaling","section",
  "service","setting","showing","similar","sorting","special","storage",
  "success","support","surface","systems","testing","through","timeout",
  "toolbar","traffic","trigger","typical","unified","unknown","updates",
  "version","virtual","visible","welcome","without","working","writing",
  "absolute","accuracy","achieved","alphabet","argument","attached",
  "audience","behavior","bookmark","breaking","calendar","callback",
  "capacity","category","centered","checkbox","children","circular",
  "clicking","collapse","complete","composed","computer","consider",
  "contains","currency","database","deadline","decrease","dispatch",
  "download","dropdown","duration","elements","embedded","enabling",
  "encoding","endpoint","entirely","estimate","everyone","existing",
  "external","feedback","filtered","finished","flexible","followed",
  "function","generate","globally","gradient","handling","hostname",
  "improved","incident","increase","industry","infinite","instance",
  "language","markdown","material","maximize","memorize","minimize",
  "navigate","observed","optional","overflow","paginate","parallel",
  "password","platform","position","practice","priority","progress",
  "property","protocol","provider","redirect","register","relative",
  "released","rendered","repeated","required","research","response",
  "schedule","selected","sequence","skeleton","snapshot","software",
  "solution","standard","strategy","tailwind","template","terminal",
  "throttle","timezone","together","tracking","transfer","triangle",
  "tutorial","ultimate","username","validate","variable","verified",
  "viewport","workflow",
];

// ─── Constants ────────────────────────────────────────────────────────────────
const GAME_HEIGHT = 520;
const MAX_LIVES = 3;
const BASE_SPEED = 48; // px/s at level 1

function spawnInterval(level: number): number {
  return Math.max(650, 2300 - (level - 1) * 170);
}

function wordSpeed(level: number, len: number): number {
  const base = BASE_SPEED + (level - 1) * 11;
  return base + (len <= 3 ? 7 : len >= 7 ? -7 : 0);
}

function wordPool(level: number): string[] {
  if (level <= 2) return WORD_LIST.filter((w) => w.length <= 4);
  if (level <= 4) return WORD_LIST.filter((w) => w.length <= 6);
  if (level <= 6) return WORD_LIST.filter((w) => w.length <= 8);
  return WORD_LIST;
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface FallingWord {
  id: number;
  text: string;
  x: number;   // % from left (css left)
  y: number;   // px from top
  speed: number;
}

type Phase = "idle" | "playing" | "gameover";

interface LeaderboardEntry {
  player_name: string;
  score: number;
  words_typed: number;
  created_at: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function TypingGame() {
  // ── Display state ──
  const [phase, setPhase] = useState<Phase>("idle");
  const [displayWords, setDisplayWords] = useState<FallingWord[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [level, setLevel] = useState(1);
  const [wordsDestroyed, setWordsDestroyed] = useState(0);
  const [typed, setTyped] = useState("");
  const [targetId, setTargetId] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // ── Game-loop refs (no stale-closure issues) ──
  const wordsRef        = useRef<FallingWord[]>([]);
  const scoreRef        = useRef(0);
  const livesRef        = useRef(MAX_LIVES);
  const levelRef        = useRef(1);
  const destroyedRef    = useRef(0);
  const phaseRef        = useRef<Phase>("idle");
  const targetIdRef     = useRef<number | null>(null);
  const nextIdRef       = useRef(0);
  const rafRef          = useRef<number>(0);
  const lastTimeRef     = useRef(0);
  const spawnTimerRef   = useRef(0);
  const inputRef        = useRef<HTMLInputElement>(null);
  const usedRef         = useRef(new Set<string>());

  // ── Helpers ──
  const loadLeaderboard = useCallback(async () => {
    try {
      const res = await fetch("/api/game/scores");
      if (res.ok) setLeaderboard(await res.json());
    } catch { /* silent */ }
  }, []);

  useEffect(() => { loadLeaderboard(); }, [loadLeaderboard]);

  const pickWord = useCallback((): string => {
    const pool = wordPool(levelRef.current);
    const fresh = pool.filter((w) => !usedRef.current.has(w));
    const src = fresh.length > 0 ? fresh : pool;
    const word = src[Math.floor(Math.random() * src.length)];
    usedRef.current.add(word);
    return word;
  }, []);

  const spawnWord = useCallback(() => {
    const text = pickWord();
    const id = nextIdRef.current++;
    const word: FallingWord = {
      id,
      text,
      x: 4 + Math.random() * 80,
      y: -30,
      speed: wordSpeed(levelRef.current, text.length),
    };
    wordsRef.current = [...wordsRef.current, word];
    setDisplayWords([...wordsRef.current]);
  }, [pickWord]);

  const endGame = useCallback(() => {
    phaseRef.current = "gameover";
    cancelAnimationFrame(rafRef.current);
    wordsRef.current = [];
    setDisplayWords([]);
    setPhase("gameover");
    loadLeaderboard();
  }, [loadLeaderboard]);

  const tick = useCallback((ts: number) => {
    if (phaseRef.current !== "playing") return;

    const delta = lastTimeRef.current ? (ts - lastTimeRef.current) / 1000 : 0.016;
    lastTimeRef.current = ts;

    // Spawn
    spawnTimerRef.current += delta * 1000;
    if (
      spawnTimerRef.current >= spawnInterval(levelRef.current) &&
      wordsRef.current.length < 12
    ) {
      spawnTimerRef.current = 0;
      spawnWord();
    }

    // Move and check bottom boundary
    let lostLife = false;
    const alive = wordsRef.current
      .map((w) => ({ ...w, y: w.y + w.speed * delta }))
      .filter((w) => {
        if (w.y >= GAME_HEIGHT) {
          if (targetIdRef.current === w.id) {
            targetIdRef.current = null;
            setTargetId(null);
            setTyped("");
            if (inputRef.current) inputRef.current.value = "";
          }
          lostLife = true;
          return false;
        }
        return true;
      });

    if (lostLife) {
      livesRef.current -= 1;
      setLives(livesRef.current);
      setFlash(true);
      setTimeout(() => setFlash(false), 350);
      if (livesRef.current <= 0) {
        wordsRef.current = alive;
        endGame();
        return;
      }
    }

    wordsRef.current = alive;
    setDisplayWords([...alive]);
    rafRef.current = requestAnimationFrame(tick);
  }, [spawnWord, endGame]);

  const startGame = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    wordsRef.current     = [];
    scoreRef.current     = 0;
    livesRef.current     = MAX_LIVES;
    levelRef.current     = 1;
    destroyedRef.current = 0;
    phaseRef.current     = "playing";
    targetIdRef.current  = null;
    nextIdRef.current    = 0;
    lastTimeRef.current  = 0;
    spawnTimerRef.current = -500;
    usedRef.current.clear();

    setDisplayWords([]);
    setScore(0);
    setLives(MAX_LIVES);
    setLevel(1);
    setWordsDestroyed(0);
    setTyped("");
    setTargetId(null);
    setFlash(false);
    setSaved(false);
    setSaving(false);
    setPhase("playing");

    setTimeout(() => {
      inputRef.current?.focus();
      rafRef.current = requestAnimationFrame(tick);
    }, 60);
  }, [tick]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (phaseRef.current !== "playing") return;

      const value = e.target.value.toLowerCase().replace(/[^a-z]/g, "");

      if (!value) {
        setTyped("");
        targetIdRef.current = null;
        setTargetId(null);
        e.target.value = "";
        return;
      }

      setTyped(value);

      const words = wordsRef.current;

      // Keep current target if it still matches
      let target =
        targetIdRef.current !== null
          ? words.find(
              (w) => w.id === targetIdRef.current && w.text.startsWith(value)
            )
          : undefined;

      // Otherwise pick the lowest matching word (most urgent)
      if (!target) {
        const matches = words.filter((w) => w.text.startsWith(value));
        target = matches.sort((a, b) => b.y - a.y)[0];
        targetIdRef.current = target?.id ?? null;
        setTargetId(targetIdRef.current);
      }

      if (!target) return;

      // Word complete!
      if (value === target.text) {
        wordsRef.current = wordsRef.current.filter((w) => w.id !== target!.id);
        setDisplayWords([...wordsRef.current]);

        const points = target.text.length * levelRef.current * 10;
        scoreRef.current += points;
        setScore(scoreRef.current);

        destroyedRef.current += 1;
        setWordsDestroyed(destroyedRef.current);

        const newLevel = Math.floor(destroyedRef.current / 10) + 1;
        if (newLevel > levelRef.current) {
          levelRef.current = newLevel;
          setLevel(newLevel);
        }

        targetIdRef.current = null;
        setTargetId(null);
        setTyped("");
        e.target.value = "";
      }
    },
    []
  );

  const saveScore = useCallback(async () => {
    const name = playerName.trim();
    if (!name || saved || saving) return;
    setSaving(true);
    try {
      await fetch("/api/game/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player_name: name,
          score: scoreRef.current,
          words_typed: destroyedRef.current,
        }),
      });
      setSaved(true);
      loadLeaderboard();
    } catch { /* silent */ }
    setSaving(false);
  }, [playerName, saved, saving, loadLeaderboard]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const hearts = Array.from({ length: MAX_LIVES }, (_, i) =>
    i < lives ? "❤️" : "🖤"
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">

      {/* ── Playing ─────────────────────────────────────────────────────────── */}
      {phase === "playing" && (
        <div className="flex flex-col gap-3">
          {/* HUD */}
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 dark:bg-zinc-950 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-0.5 text-lg">{hearts}</div>
            <div className="text-center">
              <span className="text-2xl font-mono font-bold text-white">
                {score.toLocaleString()}
              </span>
              <span className="ml-1.5 text-xs text-zinc-500">pts</span>
            </div>
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-wider">Lv </span>
              <span className="text-lg font-bold text-yellow-400">{level}</span>
            </div>
          </div>

          {/* Game canvas */}
          <div
            className={`relative overflow-hidden rounded-2xl border transition-all duration-150 ${
              flash
                ? "border-red-500 bg-red-950/40 shadow-[0_0_30px_rgba(239,68,68,0.3)]"
                : "border-zinc-800 bg-zinc-950"
            }`}
            style={{ height: GAME_HEIGHT }}
          >
            {/* Subtle scanlines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 2px,#fff 2px,#fff 3px)",
              }}
            />

            {/* Falling words */}
            {displayWords.map((word) => {
              const isTarget = word.id === targetId;
              return (
                <span
                  key={word.id}
                  className="absolute select-none font-mono font-bold text-lg whitespace-nowrap"
                  style={{ left: `${word.x}%`, top: word.y, transform: "translateX(-50%)" }}
                >
                  {isTarget ? (
                    <>
                      <span className="text-green-400">{word.text.slice(0, typed.length)}</span>
                      <span
                        className="text-yellow-300"
                        style={{ textShadow: "0 0 8px rgba(253,224,71,0.9)" }}
                      >
                        {word.text.slice(typed.length)}
                      </span>
                    </>
                  ) : (
                    <span
                      className="text-white"
                      style={{ textShadow: "0 0 6px rgba(255,255,255,0.25)" }}
                    >
                      {word.text}
                    </span>
                  )}
                </span>
              );
            })}

            {/* Danger line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-red-800/60" />
          </div>

          {/* Typing input */}
          <input
            ref={inputRef}
            type="text"
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === " ") e.preventDefault();
            }}
            placeholder="Type the falling words…"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="w-full px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-lg placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 caret-yellow-400"
          />
          <p className="text-xs text-center text-zinc-600">
            {wordsDestroyed} words destroyed · type to target the matching word
          </p>
        </div>
      )}

      {/* ── Idle ────────────────────────────────────────────────────────────── */}
      {phase === "idle" && (
        <div className="flex flex-col items-center gap-6 py-10">
          <div className="text-center space-y-3">
            <div className="text-5xl">⌨️</div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Falling Words
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm text-sm leading-relaxed">
              Words fall from the top of the screen. Type them before they
              hit the bottom — each miss costs a life. Speed increases every
              10 words.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs w-full max-w-xs">
            {[
              { icon: "❤️❤️❤️", label: "3 lives" },
              { icon: "⚡", label: "Speed up" },
              { icon: "🏆", label: "Leaderboard" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              >
                <div className="text-lg mb-1">{icon}</div>
                <div className="text-zinc-500 dark:text-zinc-400">{label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={startGame}
            className="px-10 py-3 bg-yellow-400 text-black font-bold text-lg rounded-full hover:bg-yellow-300 transition-colors shadow-sm"
          >
            Start Game
          </button>
        </div>
      )}

      {/* ── Game Over ───────────────────────────────────────────────────────── */}
      {phase === "gameover" && (
        <div className="flex flex-col items-center gap-5 py-8">
          <div className="text-center space-y-1">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Game Over
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Level {level} · {wordsDestroyed} words destroyed
            </p>
          </div>

          <div className="text-6xl font-mono font-black text-yellow-400">
            {score.toLocaleString()}
          </div>
          <p className="text-xs text-zinc-400 -mt-3">points</p>

          {/* Save score */}
          {!saved ? (
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-sm">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value.slice(0, 20))}
                onKeyDown={(e) => e.key === "Enter" && saveScore()}
                placeholder="Your name (max 20 chars)"
                maxLength={20}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-yellow-400"
              />
              <button
                onClick={saveScore}
                disabled={!playerName.trim() || saving}
                className="px-5 py-2.5 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saving ? "Saving…" : "Save Score"}
              </button>
            </div>
          ) : (
            <p className="text-green-500 font-semibold text-sm">✓ Score saved!</p>
          )}

          <button
            onClick={startGame}
            className="px-8 py-2.5 bg-zinc-900 dark:bg-zinc-800 text-white font-bold rounded-full hover:bg-zinc-700 transition-colors border border-zinc-700 text-sm"
          >
            Play Again
          </button>
        </div>
      )}

      {/* ── Leaderboard ─────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            🏆 Leaderboard
          </h3>
          <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
        </div>

        {leaderboard.length === 0 ? (
          <p className="text-sm text-zinc-400 text-center py-6">
            No scores yet — be the first!
          </p>
        ) : (
          <ol className="space-y-2">
            {leaderboard.map((entry, i) => (
              <li
                key={i}
                className={`flex items-center justify-between px-5 py-3 rounded-xl border ${
                  i === 0
                    ? "bg-yellow-50 dark:bg-yellow-400/10 border-yellow-200 dark:border-yellow-400/30"
                    : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base font-bold w-7 text-center text-zinc-400 dark:text-zinc-500">
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {entry.player_name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-400">{entry.words_typed} words</span>
                  <span className="font-mono font-bold text-yellow-500">
                    {entry.score.toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
