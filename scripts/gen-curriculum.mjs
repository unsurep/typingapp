// Generates lessons-{en,fr,es,de,pt}.ts — a guided, beginner-first typing
// journey of 6 stages × 6 lessons (36 lessons). Drills/placement are
// language-neutral (letters are universal); instructions, titles and
// word/sentence content are localized.
import { writeFileSync } from "node:fs";

const LOCALES = ["en", "fr", "es", "de", "pt"];
const OUT = process.argv[2]; // target lib/content dir

/* ─── Finger map (QWERTY) ─────────────────────────────────────────── */
const FINGER = {
  q: "LP", a: "LP", z: "LP", "1": "LP", "`": "LP",
  w: "LR", s: "LR", x: "LR", "2": "LR",
  e: "LM", d: "LM", c: "LM", "3": "LM",
  r: "LI", f: "LI", v: "LI", t: "LI", g: "LI", b: "LI", "4": "LI", "5": "LI",
  y: "RI", h: "RI", n: "RI", u: "RI", j: "RI", m: "RI", "6": "RI", "7": "RI",
  i: "RM", k: "RM", ",": "RM", "8": "RM",
  o: "RR", l: "RR", ".": "RR", "9": "RR",
  p: "RP", ";": "RP", "/": "RP", "0": "RP", "-": "RP", "=": "RP", "'": "RP",
  " ": "TH",
};

const FINGER_NAMES = {
  en: { LP: "left pinkie", LR: "left ring finger", LM: "left middle finger", LI: "left index finger", RI: "right index finger", RM: "right middle finger", RR: "right ring finger", RP: "right pinkie", TH: "thumb" },
  fr: { LP: "petit doigt gauche", LR: "annulaire gauche", LM: "majeur gauche", LI: "index gauche", RI: "index droit", RM: "majeur droit", RR: "annulaire droit", RP: "petit doigt droit", TH: "pouce" },
  es: { LP: "meñique izquierdo", LR: "anular izquierdo", LM: "dedo medio izquierdo", LI: "índice izquierdo", RI: "índice derecho", RM: "dedo medio derecho", RR: "anular derecho", RP: "meñique derecho", TH: "pulgar" },
  de: { LP: "linker kleiner Finger", LR: "linker Ringfinger", LM: "linker Mittelfinger", LI: "linker Zeigefinger", RI: "rechter Zeigefinger", RM: "rechter Mittelfinger", RR: "rechter Ringfinger", RP: "rechter kleiner Finger", TH: "Daumen" },
  pt: { LP: "dedo mínimo esquerdo", LR: "anelar esquerdo", LM: "dedo médio esquerdo", LI: "indicador esquerdo", RI: "indicador direito", RM: "dedo médio direito", RR: "anelar direito", RP: "dedo mínimo direito", TH: "polegar" },
};

const keyDisplay = (k) => (k === " " ? "Space" : k.length === 1 && /[a-z]/.test(k) ? k.toUpperCase() : k);

/* ─── Instruction templates ───────────────────────────────────────── */
const TPL = {
  en: {
    place: (k, f) => `Rest your ${f} on the ${keyDisplay(k)} key. Find it without looking — the F and J keys have a small bump — then tap it a few times.`,
    key: (k, f) => `Tap ${keyDisplay(k)} with your ${f}. Keep your other fingers resting on the home row.`,
    drill: () => `Type the groups below, using the correct finger for each key. Keep your eyes on the screen, not your hands.`,
    words: () => `Now type real words using only the keys you have learned so far. Go slowly — accuracy comes first, speed follows.`,
    sentence: () => `Put it all together and type the full sentence at a steady, comfortable pace.`,
  },
  fr: {
    place: (k, f) => `Posez votre ${f} sur la touche ${keyDisplay(k)}. Repérez-la sans regarder — les touches F et J ont un petit repère — puis tapez-la plusieurs fois.`,
    key: (k, f) => `Tapez ${keyDisplay(k)} avec votre ${f}. Gardez vos autres doigts sur la rangée de repos.`,
    drill: () => `Tapez les groupes ci-dessous en utilisant le bon doigt pour chaque touche. Gardez les yeux sur l'écran, pas sur vos mains.`,
    words: () => `Tapez maintenant de vrais mots en n'utilisant que les touches déjà apprises. Allez doucement — la précision avant la vitesse.`,
    sentence: () => `Assemblez le tout et tapez la phrase complète à un rythme régulier et confortable.`,
  },
  es: {
    place: (k, f) => `Apoya tu ${f} sobre la tecla ${keyDisplay(k)}. Localízala sin mirar — las teclas F y J tienen un pequeño relieve — y púlsala varias veces.`,
    key: (k, f) => `Pulsa ${keyDisplay(k)} con tu ${f}. Mantén los demás dedos apoyados en la fila central.`,
    drill: () => `Escribe los grupos de abajo usando el dedo correcto para cada tecla. Mira la pantalla, no tus manos.`,
    words: () => `Ahora escribe palabras reales usando solo las teclas que ya aprendiste. Hazlo despacio: primero la precisión, luego la velocidad.`,
    sentence: () => `Júntalo todo y escribe la frase completa a un ritmo constante y cómodo.`,
  },
  de: {
    place: (k, f) => `Lege deinen ${f} auf die Taste ${keyDisplay(k)}. Ertaste sie ohne hinzusehen — die Tasten F und J haben eine kleine Markierung — und tippe sie ein paar Mal.`,
    key: (k, f) => `Tippe ${keyDisplay(k)} mit deinem ${f}. Lass die anderen Finger auf der Grundreihe liegen.`,
    drill: () => `Tippe die Gruppen unten mit dem richtigen Finger für jede Taste. Schau auf den Bildschirm, nicht auf deine Hände.`,
    words: () => `Tippe nun echte Wörter und benutze nur die bereits gelernten Tasten. Mach langsam – Genauigkeit zuerst, Tempo kommt von selbst.`,
    sentence: () => `Füge alles zusammen und tippe den ganzen Satz in einem gleichmäßigen, angenehmen Tempo.`,
  },
  pt: {
    place: (k, f) => `Apoie o seu ${f} na tecla ${keyDisplay(k)}. Encontre-a sem olhar — as teclas F e J têm uma pequena saliência — e toque algumas vezes.`,
    key: (k, f) => `Toque ${keyDisplay(k)} com o seu ${f}. Mantenha os outros dedos apoiados na linha de descanso.`,
    drill: () => `Digite os grupos abaixo usando o dedo certo para cada tecla. Mantenha os olhos na tela, não nas mãos.`,
    words: () => `Agora digite palavras reais usando apenas as teclas que já aprendeu. Vá devagar — precisão primeiro, a velocidade vem depois.`,
    sentence: () => `Junte tudo e digite a frase completa em um ritmo constante e confortável.`,
  },
};

const STAGE_NAMES = {
  en: ["Home Row", "Top Row", "Bottom Row", "Capitals & Punctuation", "Numbers", "Fluency"],
  fr: ["Rangée de repos", "Rangée supérieure", "Rangée inférieure", "Majuscules et ponctuation", "Chiffres", "Aisance"],
  es: ["Fila central", "Fila superior", "Fila inferior", "Mayúsculas y puntuación", "Números", "Fluidez"],
  de: ["Grundreihe", "Obere Reihe", "Untere Reihe", "Großbuchstaben & Satzzeichen", "Zahlen", "Flüssigkeit"],
  pt: ["Linha de descanso", "Linha superior", "Linha inferior", "Maiúsculas e pontuação", "Números", "Fluência"],
};

const KEYS_PREFIX = { en: "Keys", fr: "Touches", es: "Teclas", de: "Tasten", pt: "Teclas" };

// Short descriptions, generated per "kind" so we don't hand-translate 36×.
const DESC = {
  en: { keys: (K) => `Learn the ${K} keys and the finger that reaches each one.`, words: () => `Combine the keys you know into real words.`, sentence: () => `Type complete sentences and find your rhythm.`, caps: () => `Use the Shift key to type capital letters smoothly.`, numbers: (K) => `Reach the ${K} keys on the number row and snap back to home.`, fluency: () => `Bring the whole keyboard together in flowing text.` },
  fr: { keys: (K) => `Apprenez les touches ${K} et le doigt qui atteint chacune.`, words: () => `Combinez les touches connues pour former de vrais mots.`, sentence: () => `Tapez des phrases complètes et trouvez votre rythme.`, caps: () => `Utilisez la touche Maj pour taper les majuscules avec aisance.`, numbers: (K) => `Atteignez les touches ${K} de la rangée des chiffres et revenez au repos.`, fluency: () => `Réunissez tout le clavier dans un texte fluide.` },
  es: { keys: (K) => `Aprende las teclas ${K} y el dedo que alcanza cada una.`, words: () => `Combina las teclas que conoces en palabras reales.`, sentence: () => `Escribe frases completas y encuentra tu ritmo.`, caps: () => `Usa la tecla Mayús para escribir mayúsculas con soltura.`, numbers: (K) => `Alcanza las teclas ${K} de la fila de números y vuelve al descanso.`, fluency: () => `Reúne todo el teclado en un texto fluido.` },
  de: { keys: (K) => `Lerne die Tasten ${K} und den Finger, der sie erreicht.`, words: () => `Verbinde die bekannten Tasten zu echten Wörtern.`, sentence: () => `Tippe ganze Sätze und finde deinen Rhythmus.`, caps: () => `Nutze die Umschalttaste für flüssige Großbuchstaben.`, numbers: (K) => `Erreiche die Tasten ${K} der Zahlenreihe und kehr zur Grundreihe zurück.`, fluency: () => `Bring die ganze Tastatur in flüssigem Text zusammen.` },
  pt: { keys: (K) => `Aprenda as teclas ${K} e o dedo que alcança cada uma.`, words: () => `Combine as teclas que você conhece em palavras reais.`, sentence: () => `Digite frases completas e encontre seu ritmo.`, caps: () => `Use a tecla Shift para digitar maiúsculas com fluidez.`, numbers: (K) => `Alcance as teclas ${K} da linha de números e volte à base.`, fluency: () => `Una todo o teclado em um texto fluido.` },
};

// Titles for the non key-introduction lessons (others are auto: "Stage: K & K").
const TITLE = {
  6:  { en: "Home Row Words", fr: "Mots de la rangée de repos", es: "Palabras de la fila central", de: "Wörter der Grundreihe", pt: "Palavras da linha de descanso" },
  12: { en: "Top Row Words", fr: "Mots de la rangée supérieure", es: "Palabras de la fila superior", de: "Wörter der oberen Reihe", pt: "Palavras da linha superior" },
  18: { en: "Bottom Row Words", fr: "Mots de la rangée inférieure", es: "Palabras de la fila inferior", de: "Wörter der unteren Reihe", pt: "Palavras da linha inferior" },
  19: { en: "Capitals: Right Hand", fr: "Majuscules : main droite", es: "Mayúsculas: mano derecha", de: "Großbuchstaben: rechte Hand", pt: "Maiúsculas: mão direita" },
  20: { en: "Capitals: Left Hand", fr: "Majuscules : main gauche", es: "Mayúsculas: mano izquierda", de: "Großbuchstaben: linke Hand", pt: "Maiúsculas: mão esquerda" },
  21: { en: "Capitals: Both Hands", fr: "Majuscules : deux mains", es: "Mayúsculas: ambas manos", de: "Großbuchstaben: beide Hände", pt: "Maiúsculas: as duas mãos" },
  22: { en: "Punctuation Marks", fr: "Signes de ponctuation", es: "Signos de puntuación", de: "Satzzeichen", pt: "Sinais de pontuação" },
  23: { en: "Quotes & Apostrophe", fr: "Guillemets et apostrophe", es: "Comillas y apóstrofo", de: "Anführungszeichen & Apostroph", pt: "Aspas e apóstrofo" },
  24: { en: "Capital Sentences", fr: "Phrases avec majuscules", es: "Frases con mayúsculas", de: "Sätze mit Großbuchstaben", pt: "Frases com maiúsculas" },
  30: { en: "Numbers in Context", fr: "Les chiffres en contexte", es: "Números en contexto", de: "Zahlen im Kontext", pt: "Números no contexto" },
};
const FLUENCY_TITLE = { en: "Everyday Typing", fr: "Frappe quotidienne", es: "Escritura diaria", de: "Alltägliches Tippen", pt: "Digitação diária" };

/* ─── Localized word / sentence content (typed text per step) ─────── */
const C = {
  // Stage 1
  w_l4: { en: `as ask add all lad dad fall flask`, fr: `la sa as gala salade fade`, es: `la las sal ala gala dale`, de: `das als also lag sah als`, pt: `la as asa sala gala lada` },
  w_l5: { en: `gas hash half flag glad gash dash sash shall hall`, fr: `gala halage glas flash gaga`, es: `haga gala sala dalas algas hadas`, de: `Glas Saal Hagel flach als sah`, pt: `gala sala asa laga gaga lada` },
  w_l6a: { en: `ask dad lad fall hall half`, fr: `salade gala halle dalle fade`, es: `sala gala dale falla halla`, de: `Saal Glas Hagel fad als`, pt: `sala gala dada fada lada` },
  w_l6b: { en: `glass flask salad gash shall alas`, fr: `flash glas alfa hadas saga`, es: `algas hadas dalas gala sala`, de: `Glas flach Saal als sah`, pt: `gala fada asa sala lada` },
  s_l6: { en: `a glad lass had a salad; dad shall ask all`, fr: `papa a sa salade; la halle est la`, es: `papa da la sala; ella halla la sal`, de: `Glas und Saal, alles ganz fad`, pt: `papa da a sala; a fada esta la` },
  // Stage 2
  w_l7: { en: `see fee lie die kid lid desk like field aside`, fr: `idee aide fidele defile assied lie`, es: `idea sede lia dia fiel feliz`, de: `die sie fies Idee Diele lieies`, pt: `ideia fede lide dia fiel sede` },
  w_l8: { en: `red rug fur jar far her fire ride side user hire`, fr: `rue dur sur jure aire faire dire`, es: `red sur dura jura aire furia rie`, de: `rude ruder Feuer dir hier ihr`, pt: `rua dura juro fui aqui rir dir` },
  w_l9: { en: `try the that they this rest fast last test site kite`, fr: `the tarte reste tete liste rite`, es: `este tate rita lata sita reta`, de: `Tat Rate Tritt Liste reist statt`, pt: `tati teia reta lata trato rita` },
  w_l10: { en: `two who how owl word work slow flow row low tow`, fr: `loto mot rot toile route rose`, es: `todo loro toro rosa rato sola`, de: `wo wow Wort Floss los Rolle`, pt: `todo loro toro rosa lado roxo` },
  w_l11: { en: `quit quip pour pure plus play part pair quiet paper`, fr: `papier pour pure plaque parle pire`, es: `para pulir popa pera pisa plano`, de: `Papier pur plus Platte Paar parkt`, pt: `papel pura puro pera para plano` },
  w_l12a: { en: `type your quiet pair power equal write spare`, fr: `taper votre paire pouvoir egal ecrire`, es: `teclear tu par poder igual escribir`, de: `tippen dein Paar Kraft gleich schreiben`, pt: `digitar seu par poder igual escrever` },
  w_l12b: { en: `first water trade sleep adore output report`, fr: `eau premier echange sommeil sortie rapport`, es: `agua primero sueno adoro salida informe`, de: `Wasser erste Handel Schlaf Ausgabe Bericht`, pt: `agua primeiro troca sono saida relatorio` },
  s_l12: { en: `a polite typist writes the report at her own pace`, fr: `une dactylo polie ecrit son rapport a son rythme`, es: `una mecanografa amable escribe a su propio ritmo`, de: `eine hofliche Tipperin schreibt in eigenem Tempo`, pt: `uma digitadora gentil escreve no proprio ritmo` },
  // Stage 3
  w_l13: { en: `van vim mad map move main game time more vote`, fr: `main jambe game mime move avive`, es: `mano vivo mama mima move ave`, de: `Vase Mime mehr Move Mama vier`, pt: `mao vivo mama mima move ave` },
  w_l14: { en: `ban bun nap nib bend bone nine band brain begin`, fr: `banc nez nuage neige bien bonne`, es: `banco nube nido nene bien bonito`, de: `Bann Nabe neben Bein Bohne neun`, pt: `banco nuvem nove bem bonito neto` },
  w_l15: { en: `cat cap car cane cave dice race, nice, voice,`, fr: `chat cave canne creme race, ici, voici,`, es: `casa cara cama cena creer, cinco, dice,`, de: `Cafe creme Creme Ecke acht, dice, nice,`, pt: `casa cara cama cena creme, cinco, doce,` },
  w_l16: { en: `fix fox box mix six exit. apex. relax. index.`, fr: `taxi luxe fixe noix index. exact. relax.`, es: `taxi examen exito sexto exacto. relax.`, de: `Taxi Hexe fix Box sechs. exakt. relax.`, pt: `taxi exato fixo sexto exame. relax. index.` },
  w_l17: { en: `zip zoo zap zero dozen lazy crazy a/b c/d and/or`, fr: `zone zero zele gazon douze a/b c/d et/ou`, es: `zona cero zumo lazo doce a/b c/d y/o`, de: `Zoo Zone null Salz Pilz a/b c/d und/oder`, pt: `zona zero zumo lazo doze a/b c/d e/ou` },
  w_l18a: { en: `the lazy zebra naps by the cozy maze`, fr: `le zebre paresseux dort pres du labyrinthe`, es: `la cebra perezosa duerme junto al laberinto`, de: `das faule Zebra schlaft nahe dem Labyrinth`, pt: `a zebra preguicosa dorme perto do labirinto` },
  w_l18b: { en: `brave foxes move quickly over wide canyons`, fr: `des renards braves traversent les vallees`, es: `zorros valientes cruzan amplios canones`, de: `mutige Fuchse queren weite Schluchten flink`, pt: `raposas corajosas cruzam vales largos rapido` },
  s_l18: { en: `my brave neighbor packed six dozen vans, quickly.`, fr: `mon voisin brave a charge six camions, vite.`, es: `mi vecino valiente cargo seis furgonetas, ya.`, de: `mein mutiger Nachbar packte sechs Wagen, flink.`, pt: `meu vizinho corajoso encheu seis vans, rapido.` },
  // Stage 4
  s_l19: { en: `Julie Knows Karl. Holly Likes Lemons. Kip Jumps.`, fr: `Julie Connait Karl. Lou Aime Le Lait. Kim Joue.`, es: `Julia Conoce A Karl. Lola Lee Libros. Kiko Juega.`, de: `Julia Kennt Karl. Lena Liebt Honig. Kai Joggt.`, pt: `Julia Conhece Karl. Lara Le Livros. Kiko Pula.` },
  s_l20: { en: `Fred And Sara Read. Wendy Eats Apples. Greg Waves.`, fr: `Fred Et Sara Lisent. Eva Ecrit. Greg Salue Wendy.`, es: `Fede Y Sara Leen. Eva Escribe. Gabi Saluda A Wendy.`, de: `Fred Und Sara Lesen. Eva Isst. Georg Winkt Wendy.`, pt: `Fred E Sara Leem. Eva Escreve. Gui Acena A Wendy.` },
  s_l21: { en: `The Bright Yellow Kite Flew Over Green Valleys.`, fr: `Le Cerf-Volant Jaune Vole Au-Dessus Des Vallees.`, es: `La Cometa Amarilla Volo Sobre Verdes Valles.`, de: `Der Gelbe Drachen Flog Uber Grune Taler.`, pt: `A Pipa Amarela Voou Sobre Vales Verdes.` },
  s_l22: { en: `Is it ready? Yes, it is! Wait, really? Of course.`, fr: `Est-ce pret ? Oui ! Attends, vraiment ? Bien sur.`, es: `Esta listo? Si! Espera, en serio? Claro que si.`, de: `Ist es fertig? Ja! Warte, wirklich? Aber sicher.`, pt: `Esta pronto? Sim! Espera, serio? Claro que sim.` },
  s_l23: { en: `She said, "Let's begin now." It's a bright day.`, fr: `Elle dit : "Commencons." C'est une belle journee.`, es: `Ella dijo: "Empecemos." Es un dia brillante.`, de: `Sie sagte: "Fangen wir an." Es ist ein heller Tag.`, pt: `Ela disse: "Vamos comecar." E um dia claro.` },
  s_l24a: { en: `On Monday, Anna and Ben visited Paris, France.`, fr: `Lundi, Anna et Ben ont visite Paris, en France.`, es: `El lunes, Ana y Ben visitaron Paris, Francia.`, de: `Am Montag besuchten Anna und Ben Paris, Frankreich.`, pt: `Na segunda, Ana e Ben visitaram Paris, na Franca.` },
  s_l24b: { en: `"Type slowly," she said, "and you will improve."`, fr: `"Tape lentement," dit-elle, "et tu progresseras."`, es: `"Escribe despacio," dijo, "y vas a mejorar."`, de: `"Tippe langsam," sagte sie, "dann wirst du besser."`, pt: `"Digite devagar," disse ela, "e voce vai melhorar."` },
  // Stage 5 — numbers in context
  s_l30a: { en: `I have 12 pens, 7 books, and 3 bags today.`, fr: `J'ai 12 stylos, 7 livres et 3 sacs aujourd'hui.`, es: `Tengo 12 bolis, 7 libros y 3 bolsas hoy.`, de: `Ich habe heute 12 Stifte, 7 Bucher und 3 Taschen.`, pt: `Tenho 12 canetas, 7 livros e 3 bolsas hoje.` },
  s_l30b: { en: `Call 555 0192 before 2024, room 48, at 9 sharp.`, fr: `Appelle le 555 0192 avant 2024, salle 48, a 9 h.`, es: `Llama al 555 0192 antes de 2024, sala 48, a las 9.`, de: `Ruf 555 0192 vor 2024 an, Raum 48, um 9 Uhr.`, pt: `Ligue 555 0192 antes de 2024, sala 48, as 9.` },
  // Stage 6 — fluency
  f31a: { en: `Touch typing lets you write without looking at your hands.`, fr: `La frappe au toucher permet d'ecrire sans regarder ses mains.`, es: `Escribir al tacto te deja teclear sin mirar las manos.`, de: `Zehnfingerschreiben heisst tippen, ohne auf die Hande zu sehen.`, pt: `Digitar ao toque deixa voce escrever sem olhar as maos.` },
  f31b: { en: `Keep your fingers on the home row and always return to it.`, fr: `Gardez les doigts sur la rangee de repos et revenez-y toujours.`, es: `Manten los dedos en la fila central y vuelve siempre a ella.`, de: `Halte die Finger auf der Grundreihe und kehre immer zuruck.`, pt: `Mantenha os dedos na linha de descanso e volte sempre a ela.` },
  f31c: { en: `Slow, accurate practice builds fast and reliable speed.`, fr: `Une pratique lente et precise construit une vitesse fiable.`, es: `La practica lenta y precisa crea una velocidad fiable.`, de: `Langsames, genaues Uben schafft schnelles, sicheres Tempo.`, pt: `A pratica lenta e precisa cria uma velocidade confiavel.` },
  f32a: { en: `Good posture keeps your wrists relaxed and your back straight.`, fr: `Une bonne posture detend les poignets et garde le dos droit.`, es: `Una buena postura relaja las munecas y endereza la espalda.`, de: `Gute Haltung halt die Handgelenke locker und den Rucken gerade.`, pt: `Boa postura relaxa os pulsos e mantem as costas retas.` },
  f32b: { en: `Take a short break every twenty minutes to rest your eyes.`, fr: `Faites une pause toutes les vingt minutes pour reposer vos yeux.`, es: `Toma un descanso cada veinte minutos para descansar la vista.`, de: `Mach alle zwanzig Minuten eine kurze Pause fur die Augen.`, pt: `Faca uma pausa a cada vinte minutos para descansar os olhos.` },
  f32c: { en: `Trust your fingers and resist the urge to look down.`, fr: `Faites confiance a vos doigts et ne regardez pas en bas.`, es: `Confia en tus dedos y resiste las ganas de mirar abajo.`, de: `Vertraue deinen Fingern und sieh nicht nach unten.`, pt: `Confie nos seus dedos e nao olhe para baixo.` },
  f33a: { en: `The quick brown fox jumps over the lazy dog.`, fr: `Portez ce vieux whisky au juge blond qui fume.`, es: `El veloz murcielago hindu comia feliz cardillo.`, de: `Franz jagt im komplett verwahrlosten Taxi quer.`, pt: `Um pequeno jabuti xereta viu dez cegonhas felizes.` },
  f33b: { en: `Pack my box with five dozen liquor jugs.`, fr: `Le coeur decu mais l'ame plutot naive.`, es: `Jovencillo emponzonado de whisky que figura.`, de: `Zwolf Boxkampfer jagen Viktor quer uber den Deich.`, pt: `A rapida raposa marrom salta sobre o cao.` },
  f33c: { en: `How vexingly quick daft zebras jump!`, fr: `Voix ambigue d'un coeur qui zozote.`, es: `La ciguena toca el saxofon detras del palenque.`, de: `Falsches Uben von Xylophonmusik qualt jeden.`, pt: `Bach toca o saxofone, e Jung vexa Freud.` },
  f34a: { en: `In 2024, the team typed 95 words per minute on average.`, fr: `En 2024, l'equipe a tape 95 mots par minute en moyenne.`, es: `En 2024, el equipo escribio 95 palabras por minuto.`, de: `2024 tippte das Team im Schnitt 95 Worter pro Minute.`, pt: `Em 2024, a equipe digitou 95 palavras por minuto.` },
  f34b: { en: `Room 7 opens at 8 and closes near 10 each night.`, fr: `La salle 7 ouvre a 8 h et ferme vers 10 h chaque soir.`, es: `La sala 7 abre a las 8 y cierra cerca de las 10.`, de: `Raum 7 offnet um 8 und schliesst gegen 10 Uhr.`, pt: `A sala 7 abre as 8 e fecha perto das 10 toda noite.` },
  f34c: { en: `She saved 50, spent 12, and kept the other 38.`, fr: `Elle a garde 50, depense 12 et garde les 38 restants.`, es: `Ella ahorro 50, gasto 12 y guardo los otros 38.`, de: `Sie sparte 50, gab 12 aus und behielt die anderen 38.`, pt: `Ela guardou 50, gastou 12 e ficou com os outros 38.` },
  f35a: { en: `Learning to type well is a skill that rewards patience and steady daily practice.`, fr: `Bien apprendre a taper est une competence qui recompense la patience et la regularite.`, es: `Aprender a escribir bien es una destreza que premia la paciencia y la constancia.`, de: `Gut tippen zu lernen ist eine Fahigkeit, die Geduld und tagliche Ubung belohnt.`, pt: `Aprender a digitar bem e uma habilidade que recompensa paciencia e pratica diaria.` },
  f35b: { en: `Soon you will type whole emails and notes without slowing down to search for letters.`, fr: `Bientot vous taperez des courriels entiers sans ralentir pour chercher les lettres.`, es: `Pronto escribiras correos enteros sin frenar para buscar las letras.`, de: `Bald tippst du ganze E-Mails, ohne nach den Buchstaben zu suchen.`, pt: `Em breve voce digitara e-mails inteiros sem parar para procurar as letras.` },
  f36a: { en: `Congratulations on reaching the final lesson of this course.`, fr: `Felicitations, vous avez atteint la derniere lecon de ce cours.`, es: `Felicidades por llegar a la ultima leccion de este curso.`, de: `Gluckwunsch, du hast die letzte Lektion dieses Kurses erreicht.`, pt: `Parabens por chegar a ultima licao deste curso.` },
  f36b: { en: `You can now type with all ten fingers across the whole keyboard with confidence.`, fr: `Vous tapez maintenant avec dix doigts sur tout le clavier avec assurance.`, es: `Ahora escribes con los diez dedos por todo el teclado con confianza.`, de: `Du tippst nun mit zehn Fingern sicher uber die ganze Tastatur.`, pt: `Agora voce digita com os dez dedos por todo o teclado com confianca.` },
  f36c: { en: `Keep practicing a little each day and your skills will keep growing.`, fr: `Continuez a pratiquer un peu chaque jour et vos competences grandiront.`, es: `Sigue practicando un poco cada dia y tus habilidades seguiran creciendo.`, de: `Ube weiter jeden Tag ein wenig, dann wachsen deine Fahigkeiten.`, pt: `Continue praticando um pouco por dia e suas habilidades vao crescer.` },
};

/* ─── Lesson specs (language-neutral structure) ───────────────────── */
// kind: keys | words | sentence | caps | numbers | fluency  (drives title/desc)
const place = (k) => ({ t: "place", k });
const key = (k) => ({ t: "key", k });
const drill = (keys, text) => ({ t: "drill", keys, text });
const words = (cid) => ({ t: "words", cid });
const sent = (cid) => ({ t: "sentence", cid });
const introPair = (a, b) => [place(a), place(b), key(a), key(b)];

const SPEC = {
  // ── Stage 1: Home Row ──
  1:  { stage: 1, goal: 10, kind: "keys", keys: ["f", "j"], steps: [...introPair("f", "j"), drill(["f", "j"], "fff jjj fjf jfj fj jf ffj jjf"), drill(["f", "j"], "fj fj jf jf ff jj fjj jff fj jf")] },
  2:  { stage: 1, goal: 12, kind: "keys", keys: ["d", "k"], steps: [...introPair("d", "k"), drill(["d", "k"], "ddd kkk dkd kdk dk kd"), drill(["d", "k", "f", "j"], "dk fj kd jf dfk jkd fjdk kdjf")] },
  3:  { stage: 1, goal: 14, kind: "keys", keys: ["s", "l"], steps: [...introPair("s", "l"), drill(["s", "l"], "sss lll sls lsl sl ls"), drill(["s", "l", "d", "k", "f", "j"], "sl dk fj ls kd jf sdf jkl lkj fds")] },
  4:  { stage: 1, goal: 16, kind: "keys", keys: ["a", ";"], steps: [...introPair("a", ";"), drill(["a", ";"], "aaa ;;; a;a ;a; a; ;a"), words("w_l4")] },
  5:  { stage: 1, goal: 18, kind: "keys", keys: ["g", "h"], steps: [...introPair("g", "h"), drill(["g", "h"], "ggg hhh ghg hgh gh hg"), words("w_l5")] },
  6:  { stage: 1, goal: 20, kind: "words", keys: [], steps: [words("w_l6a"), words("w_l6b"), sent("s_l6")] },
  // ── Stage 2: Top Row ──
  7:  { stage: 2, goal: 20, kind: "keys", keys: ["e", "i"], steps: [...introPair("e", "i"), drill(["e", "i"], "eee iii eie iei ei ie ded kik"), words("w_l7")] },
  8:  { stage: 2, goal: 22, kind: "keys", keys: ["r", "u"], steps: [...introPair("r", "u"), drill(["r", "u"], "rrr uuu rur uru ru ur frf juj"), words("w_l8")] },
  9:  { stage: 2, goal: 24, kind: "keys", keys: ["t", "y"], steps: [...introPair("t", "y"), drill(["t", "y"], "ttt yyy tyt yty ty yt ftf jyj"), words("w_l9")] },
  10: { stage: 2, goal: 26, kind: "keys", keys: ["w", "o"], steps: [...introPair("w", "o"), drill(["w", "o"], "www ooo wow owo wo ow sws lol"), words("w_l10")] },
  11: { stage: 2, goal: 28, kind: "keys", keys: ["q", "p"], steps: [...introPair("q", "p"), drill(["q", "p"], "qqq ppp qpq pqp qp pq aqa ;p;"), words("w_l11")] },
  12: { stage: 2, goal: 30, kind: "words", keys: [], steps: [words("w_l12a"), words("w_l12b"), sent("s_l12")] },
  // ── Stage 3: Bottom Row ──
  13: { stage: 3, goal: 26, kind: "keys", keys: ["v", "m"], steps: [...introPair("v", "m"), drill(["v", "m"], "vvv mmm vmv mvm vm mv fvf jmj"), words("w_l13")] },
  14: { stage: 3, goal: 26, kind: "keys", keys: ["b", "n"], steps: [...introPair("b", "n"), drill(["b", "n"], "bbb nnn bnb nbn bn nb fbf jnj"), words("w_l14")] },
  15: { stage: 3, goal: 28, kind: "keys", keys: ["c", ","], steps: [...introPair("c", ","), drill(["c", ","], "ccc ,,, c,c ,c, c, ,c dcd k,k"), words("w_l15")] },
  16: { stage: 3, goal: 28, kind: "keys", keys: ["x", "."], steps: [...introPair("x", "."), drill(["x", "."], "xxx ... x.x .x. x. .x sxs l.l"), words("w_l16")] },
  17: { stage: 3, goal: 30, kind: "keys", keys: ["z", "/"], steps: [...introPair("z", "/"), drill(["z", "/"], "zzz /// z/z /z/ z/ /z aza ;/;"), words("w_l17")] },
  18: { stage: 3, goal: 30, kind: "words", keys: [], steps: [words("w_l18a"), words("w_l18b"), sent("s_l18")] },
  // Stage 4: Capitals & Punctuation
  19: { stage: 4, goal: 26, kind: "caps", keys: ["j", "k", "l", "h", "u", "i", "o", "p"], steps: [drill(["j", "k", "l"], "Jj Kk Ll Hh Uu Ii Oo Pp"), drill(["j", "k", "l"], "Joy Kim Leo Hal Uma Ian Oak Pam"), sent("s_l19")] },
  20: { stage: 4, goal: 26, kind: "caps", keys: ["f", "d", "s", "a", "g", "r", "e", "w", "q"], steps: [drill(["f", "d", "s", "a"], "Ff Dd Ss Aa Gg Rr Ee Ww Qq"), drill(["f", "d", "s", "a"], "Fox Dan Sam Ada Gus Ray Eve Wes"), sent("s_l20")] },
  21: { stage: 4, goal: 28, kind: "caps", keys: ["t", "y", "b", "n", "v", "m", "c"], steps: [drill(["t", "y", "b", "n"], "Tt Yy Bb Nn Vv Mm Cc Zz Xx"), sent("s_l21")] },
  22: { stage: 4, goal: 28, kind: "caps", keys: [".", ",", "/", ";"], steps: [drill([".", ",", "/"], ". , ? ! . , ? ! ; : - ."), sent("s_l22")] },
  23: { stage: 4, goal: 28, kind: "caps", keys: ["'", ";"], steps: [drill(["'"], "'' '' a'a it's I'm don't can't we'll"), sent("s_l23")] },
  24: { stage: 4, goal: 30, kind: "sentence", keys: [], steps: [sent("s_l24a"), sent("s_l24b")] },
  // Stage 5: Numbers
  25: { stage: 5, goal: 22, kind: "numbers", keys: ["4", "7"], steps: [...introPair("4", "7"), drill(["4", "7"], "444 777 474 747 47 74 f4f j7j"), drill(["4", "7"], "44 77 4747 7474 474 747 47 74")] },
  26: { stage: 5, goal: 22, kind: "numbers", keys: ["3", "8"], steps: [...introPair("3", "8"), drill(["3", "8"], "333 888 383 838 38 83 d3d k8k"), drill(["3", "8"], "33 88 3838 8383 383 838 38 83")] },
  27: { stage: 5, goal: 24, kind: "numbers", keys: ["2", "9"], steps: [...introPair("2", "9"), drill(["2", "9"], "222 999 292 929 29 92 s2s l9l"), drill(["2", "9"], "22 99 2929 9292 292 929 29 92")] },
  28: { stage: 5, goal: 24, kind: "numbers", keys: ["1", "0"], steps: [...introPair("1", "0"), drill(["1", "0"], "111 000 101 010 10 01 a1a ;0;"), drill(["1", "0"], "11 00 1010 0101 101 010 10 01")] },
  29: { stage: 5, goal: 26, kind: "numbers", keys: ["5", "6"], steps: [...introPair("5", "6"), drill(["5", "6"], "555 666 565 656 56 65 f5f j6j"), drill(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], "1234567890 13 57 90 24 68")] },
  30: { stage: 5, goal: 28, kind: "numbers", keys: [], steps: [drill(["1", "2", "3", "4", "5"], "12 34 56 78 90 19 28 37 46 50"), sent("s_l30a"), sent("s_l30b")] },
  // Stage 6: Fluency
  31: { stage: 6, goal: 32, kind: "fluency", keys: [], steps: [sent("f31a"), sent("f31b"), sent("f31c")] },
  32: { stage: 6, goal: 34, kind: "fluency", keys: [], steps: [sent("f32a"), sent("f32b"), sent("f32c")] },
  33: { stage: 6, goal: 36, kind: "fluency", keys: [], steps: [sent("f33a"), sent("f33b"), sent("f33c")] },
  34: { stage: 6, goal: 34, kind: "fluency", keys: [], steps: [sent("f34a"), sent("f34b"), sent("f34c")] },
  35: { stage: 6, goal: 38, kind: "fluency", keys: [], steps: [sent("f35a"), sent("f35b")] },
  36: { stage: 6, goal: 40, kind: "fluency", keys: [], steps: [sent("f36a"), sent("f36b"), sent("f36c")] },
};

const keyText = (k, n) => Array.from({ length: n }, () => k).join("");
const placeText = (k) => `${k} ${k} ${k}`;
const drillKeyText = (k) => `${keyText(k, 3)} ${keyText(k, 3)} ${keyText(k, 3)} ${keyText(k, 3)}`;

function buildStep(spec, loc) {
  const tpl = TPL[loc];
  if (spec.t === "place") {
    const f = FINGER_NAMES[loc][FINGER[spec.k]];
    return { type: "place", instruction: tpl.place(spec.k, f), text: placeText(spec.k), keys: [spec.k], newKeys: [spec.k] };
  }
  if (spec.t === "key") {
    const f = FINGER_NAMES[loc][FINGER[spec.k]];
    return { type: "key", instruction: tpl.key(spec.k, f), text: drillKeyText(spec.k), keys: [spec.k], newKeys: [spec.k] };
  }
  if (spec.t === "drill") {
    return { type: "drill", instruction: tpl.drill(), text: spec.text, keys: spec.keys };
  }
  const text = C[spec.cid][loc];
  return { type: spec.t, instruction: spec.t === "words" ? tpl.words() : tpl.sentence(), text, keys: Array.from(new Set(text.toLowerCase().split("").filter((ch) => FINGER[ch]))) };
}

function titleFor(id, spec, loc) {
  if (TITLE[id]) return TITLE[id][loc];
  if (spec.kind === "fluency") {
    const within = spec.stage === 6 ? id - 30 : 1;
    return `${FLUENCY_TITLE[loc]} ${within}`;
  }
  return `${STAGE_NAMES[loc][spec.stage - 1]}: ${spec.keys.map(keyDisplay).join(" & ")}`;
}

function descFor(spec, loc) {
  const d = DESC[loc];
  const K = spec.keys.map(keyDisplay).join(" & ");
  if (spec.kind === "keys") return d.keys(K);
  if (spec.kind === "numbers") return spec.keys.length ? d.numbers(K) : d.sentence();
  if (spec.kind === "words") return d.words();
  if (spec.kind === "caps") return d.caps();
  if (spec.kind === "fluency") return d.fluency();
  return d.sentence();
}

function buildLessons(loc) {
  return Object.entries(SPEC).map(([idStr, spec]) => {
    const id = Number(idStr);
    const focus = spec.keys.length
      ? `${KEYS_PREFIX[loc]}: ${spec.keys.map(keyDisplay).join(" ")}`
      : STAGE_NAMES[loc][spec.stage - 1];
    return {
      id,
      stageId: spec.stage,
      stage: STAGE_NAMES[loc][spec.stage - 1],
      title: titleFor(id, spec, loc),
      focus,
      shortDesc: descFor(spec, loc),
      goalWpm: spec.goal,
      steps: spec.steps.map((s) => buildStep(s, loc)),
    };
  });
}

const VAR = { en: "lessonsEn", fr: "lessonsFr", es: "lessonsEs", de: "lessonsDe", pt: "lessonsPt" };
for (const loc of LOCALES) {
  const lessons = buildLessons(loc);
  const body = `import type { Lesson } from "../lesson-types";\n\n// AUTO-GENERATED beginner typing journey (6 stages x 6 lessons).\n// Do not edit by hand. Regenerate via scripts/gen-curriculum.mjs.\nexport const ${VAR[loc]}: Lesson[] = ${JSON.stringify(lessons, null, 2)};\n`;
  writeFileSync(`${OUT}/lessons-${loc}.ts`, body, "utf8");
  console.log(`wrote lessons-${loc}.ts (${lessons.length} lessons, ${lessons.reduce((a, l) => a + l.steps.length, 0)} steps)`);
}
