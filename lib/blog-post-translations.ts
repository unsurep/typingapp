import type { AppLocale } from "@/i18n/routing";

/** Localized listing/SEO fields. Article `content` in locale files remains English until full posts are translated. */
export const blogPostTranslations: {
  [K in Exclude<AppLocale, "en">]: Record<
    string,
    { title: string; metaDescription: string }
  >;
} = {
  fr: {
    "average-typing-speed-2026": {
      title:
        "La vitesse moyenne de frappe en 2026 est étonnamment basse — où vous situez-vous ?",
      metaDescription:
        "La vitesse moyenne mondiale est plus basse qu’on ne le croit. Voici où vous vous situez selon le métier, l’âge et l’expérience en 2026.",
    },
    "typing-speed-by-age-2026": {
      title: "Vitesse de frappe et âge : où se classe votre génération en 2026 ?",
      metaDescription:
        "Quelle génération tape le plus vite ? La réponse peut surprendre. Voici la répartition de la vitesse moyenne par tranche d’âge en 2026.",
    },
    "what-is-a-good-typing-speed": {
      title: "Qu’est-ce qu’une bonne vitesse de frappe ? (et comment améliorer la vôtre)",
      metaDescription:
        "Qu’est-ce qu’un bon WPM ? Moyennes par contexte et pistes pour progresser avec un entraînement ciblé.",
    },
    "is-40-wpm-good": {
      title: "40 WPM, c’est bien ? Réponse honnête (et comment progresser vite)",
      metaDescription:
        "40 WPM est-elle une bonne vitesse ? Repères métiers et plan simple pour monter rapidement.",
    },
    "typing-speed-vs-accuracy-math": {
      title:
        "Pourquoi taper vite sans précision est en réalité plus lent (la math expliquée)",
      metaDescription:
        "Taper plus vite n’est pas toujours mieux : pourquoi la précision bat la vitesse brute et comment fonctionne le WPM net.",
    },
    "touch-typing-vs-hunt-and-peck": {
      title: "Dactylo au toucher ou « chasse‑et‑pic » — lequel choisir ?",
      metaDescription:
        "Toucher au clavier ou chercher les touches du regard ? Comparaison honnête et pourquoi le toucher gagne presque toujours sur la durée.",
    },
    "typing-habits-slowing-you-down": {
      title: "5 habitudes de frappe qui vous freinent",
      metaDescription:
        "De mauvaises habitudes peuvent plafonner votre WPM et fatiguer vos mains. Voici 5 erreurs fréquentes et comment les corriger.",
    },
    "30-day-typing-speed-challenge-results": {
      title:
        "J’ai testé ma vitesse de frappe tous les jours pendant 30 jours — ce qui s’est vraiment passé",
      metaDescription:
        "Défi honnête sur 30 jours : journal de progression, ce qui a marché, ce qui non, et combien de WPM j’ai vraiment gagnés.",
    },
    "remote-jobs-that-require-typing-2026": {
      title: "10 emplois à distance qui recrutent et exigent une frappe rapide (2026)",
      metaDescription:
        "Vous cherchez du télétravail axé sur la frappe ? Voici 10 postes en 2026 qui demandent vitesse et précision — et comment vous qualifier.",
    },
    "how-to-earn-typing-certificate": {
      title: "Comment obtenir un certificat de dactylographie (et pourquoi ça vaut le coup)",
      metaDescription:
        "Un certificat de frappe renforce votre CV et prouve vos compétences aux employeurs. Comment l’obtenir et où il aide le plus.",
    },
    "typing-certificate-helped-land-remote-job": {
      title: "Comment un certificat de frappe m’a aidé à décrocher un job à distance (témoignage)",
      metaDescription:
        "Un candidat raconte comment un certificat de frappe a changé ses candidatures. Histoire réelle sur compétence, confiance et embauche.",
    },
    "prepare-for-typing-test-job-interview": {
      title: "Comment se préparer à un test de frappe en entretien",
      metaDescription:
        "Beaucoup d’employeurs imposent un test de frappe. Comment vous préparer, à quoi vous attendre et rester calme le jour J.",
    },
  },
  es: {
    "average-typing-speed-2026": {
      title:
        "La velocidad media de mecanografía en 2026 es sorprendentemente baja — ¿dónde te sitúas?",
      metaDescription:
        "La velocidad media mundial es más baja de lo que la gente cree. Aquí verás cómo te sitúas por profesión, edad y experiencia en 2026.",
    },
    "typing-speed-by-age-2026": {
      title: "Velocidad de mecanografía por edad: ¿cómo queda tu generación en 2026?",
      metaDescription:
        "¿Qué generación escribe más rápido? La respuesta puede sorprenderte. Desglose de la velocidad media por grupo de edad en 2026.",
    },
    "what-is-a-good-typing-speed": {
      title: "¿Qué es una buena velocidad de mecanografía? (y cómo mejorar la tuya)",
      metaDescription:
        "¿Te preguntas qué cuenta como buen WPM? Promedios por contexto y cómo mejorar con práctica enfocada.",
    },
    "is-40-wpm-good": {
      title: "¿Son buenos 40 PPM? Respuesta honesta (y cómo mejorar rápido)",
      metaDescription:
        "¿Es 40 PPM una buena velocidad? Referencias del sector y un plan claro para subir rápido.",
    },
    "typing-speed-vs-accuracy-math": {
      title:
        "Por qué escribir rápido sin precisión es en realidad más lento (la matemática explicada)",
      metaDescription:
        "¿Crees que más velocidad siempre es mejor? La matemática dice lo contrario: por qué la precisión gana y cómo funciona el PPM neto.",
    },
    "touch-typing-vs-hunt-and-peck": {
      title: "Mecanografía al tacto frente a buscar teclas — ¿cuál es mejor?",
      metaDescription:
        "¿Aprender mecanografía al tacto o seguir buscando teclas? Comparación honesta y por qué el tacto gana casi siempre a largo plazo.",
    },
    "typing-habits-slowing-you-down": {
      title: "5 hábitos de mecanografía que te frenan",
      metaDescription:
        "Los malos hábitos pueden limitar tus PPM y cansar las manos. Aquí tienes 5 errores frecuentes y cómo corregirlos.",
    },
    "30-day-typing-speed-challenge-results": {
      title:
        "Probé mi velocidad de mecanografía todos los días durante 30 días — esto es lo que pasó de verdad",
      metaDescription:
        "Reto honesto de 30 días: bitácora de progreso, qué funcionó, qué no y cuánto subieron realmente mis PPM.",
    },
    "remote-jobs-that-require-typing-2026": {
      title: "10 trabajos remotos que buscan gente y exigen mecanografía rápida (2026)",
      metaDescription:
        "¿Buscas trabajo desde casa basado en mecanografía? Aquí tienes 10 roles en 2026 que piden velocidad y precisión — y cómo encajar.",
    },
    "how-to-earn-typing-certificate": {
      title: "Cómo conseguir un certificado de mecanografía (y por qué merece la pena)",
      metaDescription:
        "Un certificado de mecanografía puede reforzar tu CV y demostrar tus habilidades. Cómo obtenerlo y dónde ayuda más.",
    },
    "typing-certificate-helped-land-remote-job": {
      title: "Cómo un certificado de mecanografía me ayudó a conseguir trabajo remoto (historia real)",
      metaDescription:
        "Un candidato cuenta cómo cambió un certificado de mecanografía sus resultados. Historia real sobre habilidad, confianza y contratación.",
    },
    "prepare-for-typing-test-job-interview": {
      title: "Cómo prepararte para un test de mecanografía en una entrevista de trabajo",
      metaDescription:
        "Muchos empleadores exigen un test de mecanografía. Cómo prepararte, qué esperar y mantener la calma el día de la prueba.",
    },
  },
  de: {
    "average-typing-speed-2026": {
      title:
        "Die durchschnittliche Tippgeschwindigkeit 2026 ist erschreckend niedrig — wo stehen Sie?",
      metaDescription:
        "Die weltweite Durchschnittsgeschwindigkeit ist niedriger als viele denken. So schneiden Sie nach Beruf, Alter und Erfahrung 2026 ab.",
    },
    "typing-speed-by-age-2026": {
      title: "Tippgeschwindigkeit nach Alter: Wo steht Ihre Generation 2026?",
      metaDescription:
        "Welche Generation tippt am schnellsten? Die Antwort kann überraschen. Durchschnittswerte nach Altersgruppe in 2026.",
    },
    "what-is-a-good-typing-speed": {
      title: "Was ist eine gute Tippgeschwindigkeit? (Und wie Sie sie verbessern)",
      metaDescription:
        "Was zählt als guter WPM? Durchschnittswerte nach Kontext und wie Sie mit gezieltem Training verbessern.",
    },
    "is-40-wpm-good": {
      title: "Sind 40 WPM gut? Eine ehrliche Antwort (plus schnelle Verbesserung)",
      metaDescription:
        "Sind 40 WPM eine gute Geschwindigkeit? Branchenbenchmarks und ein klarer Plan für schnelle Fortschritte.",
    },
    "typing-speed-vs-accuracy-math": {
      title:
        "Warum schnelles Tippen ohne Genauigkeit in Wirklichkeit langsamer ist (die Mathe erklärt)",
      metaDescription:
        "Schneller ist nicht immer besser: Warum Genauigkeit schlägt und wie Netto‑WPM funktioniert.",
    },
    "touch-typing-vs-hunt-and-peck": {
      title: "Zehnfingersystem vs. Suchen und Hacken — was ist besser?",
      metaDescription:
        "Zehnfingersystem lernen oder Tasten suchen? Ein ehrlicher Vergleich und warum Touch-Typing langfristig fast immer gewinnt.",
    },
    "typing-habits-slowing-you-down": {
      title: "5 Tippgewohnheiten, die Sie bremsen",
      metaDescription:
        "Schlechte Gewohnheiten können Ihren WPM deckeln und die Hände ermüden. Fünf häufige Fehler und wie Sie sie beheben.",
    },
    "30-day-typing-speed-challenge-results": {
      title:
        "Ich habe 30 Tage lang täglich meine Tippgeschwindigkeit getestet — was wirklich passiert ist",
      metaDescription:
        "Ehrliche 30‑Tage‑Challenge: Fortschrittslog, was half, was nicht und wie viel WPM es wirklich brachte.",
    },
    "remote-jobs-that-require-typing-2026": {
      title: "10 Remote-Jobs mit Nachfrage, die schnelles Tippen verlangen (2026)",
      metaDescription:
        "Sie suchen Heimarbeit mit Fokus auf Tippen? Zehn Rollen in 2026, die Tempo und Genauigkeit verlangen — und wie Sie sich qualifizieren.",
    },
    "how-to-earn-typing-certificate": {
      title: "So erhalten Sie ein Tippzertifikat (und warum es sich lohnt)",
      metaDescription:
        "Ein Tippzertifikat stärkt den Lebenslauf und belegt Ihre Fähigkeiten. So erhalten Sie es und wo es am meisten hilft.",
    },
    "typing-certificate-helped-land-remote-job": {
      title: "Wie mir ein Tippzertifikat half, einen Remote-Job zu bekommen (echte Geschichte)",
      metaDescription:
        "Ein Bewerber erzählt, wie ein Tippzertifikat seine Ergebnisse veränderte. Echte Geschichte über Kompetenz, Selbstvertrauen und Einstellung.",
    },
    "prepare-for-typing-test-job-interview": {
      title: "So bereiten Sie sich auf einen Tipp-Test im Vorstellungsgespräch vor",
      metaDescription:
        "Viele Arbeitgeber verlangen Tipp-Tests. So üben Sie, was Sie erwarten und wie Sie ruhig bleiben.",
    },
  },
  pt: {
    "average-typing-speed-2026": {
      title:
        "A velocidade média de digitação em 2026 é surpreendentemente baixa — onde você se encaixa?",
      metaDescription:
        "A média global é mais baixa do que as pessoas esperam. Veja como você se compara por profissão, idade e experiência em 2026.",
    },
    "typing-speed-by-age-2026": {
      title: "Velocidade de digitação por idade: como fica a sua geração em 2026?",
      metaDescription:
        "Qual geração digita mais rápido? A resposta pode surpreender. Médias por faixa etária em 2026.",
    },
    "what-is-a-good-typing-speed": {
      title: "O que é uma boa velocidade de digitação? (e como melhorar a sua)",
      metaDescription:
        "O que conta como bom PPM? Médias por contexto e como melhorar com prática focada.",
    },
    "is-40-wpm-good": {
      title: "40 PPM é bom? Resposta honesta (e como melhorar rápido)",
      metaDescription:
        "40 PPM é uma boa velocidade? Referências do setor e um plano claro para subir rápido.",
    },
    "typing-speed-vs-accuracy-math": {
      title:
        "Por que digitar rápido sem precisão é, na prática, mais lento (a matemática explicada)",
      metaDescription:
        "Mais rápido nem sempre é melhor: por que a precisão ganha e como funciona o PPM líquido.",
    },
    "touch-typing-vs-hunt-and-peck": {
      title: "Digitação ao toque vs. caça às teclas — qual é melhor?",
      metaDescription:
        "Aprender ao toque ou continuar a procurar teclas? Comparação honesta e por que o toque quase sempre ganha a longo prazo.",
    },
    "typing-habits-slowing-you-down": {
      title: "5 hábitos de digitação que o estão a abrandar",
      metaDescription:
        "Maus hábitos podem limitar o seu PPM e cansar as mãos. Cinco erros comuns e como corrigi-los.",
    },
    "30-day-typing-speed-challenge-results": {
      title:
        "Testei a minha velocidade de digitação todos os dias durante 30 dias — o que aconteceu de verdade",
      metaDescription:
        "Desafio honesto de 30 dias: registo de progresso, o que funcionou, o que não e quanto o PPM subiu de facto.",
    },
    "remote-jobs-that-require-typing-2026": {
      title: "10 empregos remotos a recrutar que exigem digitação rápida (2026)",
      metaDescription:
        "Procura trabalho em casa focado em digitação? Eis 10 funções em 2026 que pedem velocidade e precisão — e como se qualificar.",
    },
    "how-to-earn-typing-certificate": {
      title: "Como obter um certificado de digitação (e por que vale a pena)",
      metaDescription:
        "Um certificado de digitação reforça o CV e prova competências. Como obtê-lo e onde mais ajuda.",
    },
    "typing-certificate-helped-land-remote-job": {
      title: "Como um certificado de digitação me ajudou a arranjar emprego remoto (história real)",
      metaDescription:
        "Um candidato conta como um certificado mudou os resultados. História real sobre competência, confiança e contratação.",
    },
    "prepare-for-typing-test-job-interview": {
      title: "Como se preparar para um teste de digitação numa entrevista de emprego",
      metaDescription:
        "Muitos empregadores exigem teste de digitação. Como se preparar, o que esperar e manter a calma no dia.",
    },
  },
};
