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
      title: "5 habitudes de frappe qui vous freinent secrètement",
      metaDescription:
        "Vous vous entraînez peut-être mal. Ces 5 habitudes de frappe courantes limitent silencieusement votre vitesse et votre précision — et la plupart des dactylographes ne savent même pas qu'ils les font.",
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
    "what-is-net-wpm": {
      title: "Qu’est-ce que le WPM net ? La métrique de frappe qui compte vraiment",
      metaDescription:
        "WPM brut et WPM net ne sont pas identiques. Voici ce qu’est le WPM net, comment il se calcule et pourquoi c’est le chiffre qui intéresse les employeurs.",
    },
    "how-to-pass-typing-test-job-interview": {
      title:
        "Comment réussir un test de frappe en entretien d'embauche (ce que les employeurs regardent vraiment)",
      metaDescription:
        "De nombreux employeurs utilisent des tests de frappe lors du recrutement. Voici ce qu'ils mesurent vraiment, les scores attendus, et comment vous préparer pour donner le meilleur de vous-même.",
    },
    "fastest-typists-in-history": {
      title:
        "Les 10 dactylos les plus rapides de l'histoire (et ce qu'on peut en apprendre)",
      metaDescription:
        "Des records à la machine à écrire en 1946 aux champions modernes du clavier : les 10 dactylos les plus rapides de l'histoire et ce qui les rendait exceptionnels.",
    },
    "typing-speed-percentile-chart": {
      title:
        "Tableau des percentiles de vitesse de frappe : êtes-vous dans le top 10 % ?",
      metaDescription:
        "Où se situe votre vitesse de frappe au niveau mondial ? Utilisez ce tableau complet des percentiles pour voir exactement comment vous vous comparez aux autres dactylos.",
    },
    "how-long-to-learn-touch-typing": {
      title:
        "Combien de temps faut-il pour apprendre la frappe au clavier ? (Calendrier réaliste)",
      metaDescription:
        "Vous vous demandez combien de temps il faut pour apprendre la frappe au clavier ? Voici un calendrier honnete et realiste - du debutant complet a la vitesse professionnelle - base sur une pratique quotidienne.",
    },
    "typing-speed-for-data-entry-jobs": {
      title:
        "Quelle vitesse de frappe pour les emplois de saisie de données ? (Exigences 2026)",
      metaDescription:
        "Les emplois de saisie de données imposent des exigences de WPM précises. Ce qu'attendent les employeurs en 2026, comment vous préparer et comment un certificat renforce votre candidature.",
    },
    "how-to-put-typing-speed-on-resume": {
      title:
        "Comment indiquer la vitesse de frappe sur un CV ? (avec exemples)",
      metaDescription:
        "Faut-il mentionner la vitesse de frappe sur un CV ? Oui — si vous le faites bien. Formulations, emplacement et crédibilité grâce à un certificat.",
    },
    "get-paid-to-type-work-from-home-2026": {
      title:
        "Être payé pour taper : 9 emplois de saisie sérieux à domicile en 2026",
      metaDescription:
        "Peut-on vraiment être payé pour taper depuis chez soi ? Oui — voici 9 emplois télétravail légitimes en 2026 avec salaires réels et comment démarrer.",
    },
    "typing-speed-medical-transcription": {
      title:
        "Vitesse de frappe en transcription médicale : ce qu'il faut savoir",
      metaDescription:
        "La transcription médicale impose des exigences précises de vitesse et de précision. Ce qu'il vous faut en 2026 et comment vous préparer à ce métier.",
    },
    "40-to-70-wpm-plan": {
      title:
        "Le moyen le plus rapide de passer de 40 à 70 WPM (plan sur 7 semaines)",
      metaDescription:
        "Vous voulez passer de 40 à 70 WPM ? Voici un plan structuré semaine par semaine — durées quotidiennes et jalons clairs.",
    },
    "typing-speed-customer-service": {
      title:
        "Vitesse de frappe pour les agents de service client : ce qu'il faut savoir",
      metaDescription:
        "Vous postulez à un poste de service client ? Voici la vitesse exacte requise pour le chat en direct, le support e-mail et d'autres rôles en 2026.",
    },
    "legal-typist-vs-court-reporter": {
      title:
        "Typiste juridique vs sténographe judiciaire : quel métier paye le plus ?",
      metaDescription:
        "Typistes juridiques et sténographes judiciaires travaillent tous deux avec les écrits légaux — mais diffèrent nettement en salaire, formation et vitesse de frappe requise.",
    },
    "is-typing-certificate-worth-it": {
      title:
        "Un certificat de frappe en vaut-il la peine ? Voici ce que disent les employeurs",
      metaDescription:
        "Obtenir un certificat de frappe vaut-il l'effort ? Voici ce que disent les employeurs, quels secteurs y accordent le plus d'importance et comment l'utiliser efficacement.",
    },
    "best-typing-test-sites-comparison": {
      title:
        "J'ai testé 5 sites de test de frappe — voici ce que j'ai trouvé (avis honnête)",
      metaDescription:
        "J'ai testé 5 des sites de test de frappe les plus populaires en 2026. Comparaison honnête des fonctionnalités, de la précision et lequel vaut vraiment votre temps.",
    },
    "can-ai-make-you-a-better-typist": {
      title:
        "L'IA peut-elle faire de vous un meilleur dactylographe ? Nous l'avons testé pour vous",
      metaDescription:
        "Les outils d'IA promettent d'améliorer tout — mais peuvent-ils vraiment vous faire taper plus vite ? Nous avons testé les outils de frappe assistés par l'IA et partageons les résultats.",
    },
    "what-100-wpm-feels-like": {
      title:
        "Ce que 100 MPM fait vraiment ressentir — et comment y arriver",
      metaDescription:
        "Taper à 100 MPM est un objectif que la plupart des gens n'atteignent jamais — mais c'est plus accessible qu'il n'y paraît. Voici ce que ça fait et le chemin exact pour y arriver.",
    },
    "phone-typing-vs-keyboard": {
      title:
        "Frappe sur téléphone vs clavier : lequel vous rend plus rapide ?",
      metaDescription:
        "Frappe sur téléphone vs frappe au clavier — lequel est vraiment plus rapide ? Nous comparons les vitesses moyennes, la précision et la productivité pour déterminer le gagnant en 2026.",
    },
    "best-keyboards-for-typing-speed-2026": {
      title:
        "Les meilleurs claviers pour la vitesse de frappe en 2026 (testés et classés)",
      metaDescription:
        "Votre clavier affecte-t-il votre vitesse de frappe ? Oui — de manière significative. Voici les meilleurs claviers pour taper vite en 2026, classés par performance et rapport qualité-prix.",
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
      title: "5 hábitos de mecanografía que te frenan en secreto",
      metaDescription:
        "Es posible que estés practicando mal. Estos 5 hábitos de mecanografía comunes están limitando silenciosamente tu velocidad y precisión — y la mayoría de los mecanógrafos ni siquiera saben que los hacen.",
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
    "what-is-net-wpm": {
      title: "¿Qué es el PPM neto? La métrica de mecanografía que realmente importa",
      metaDescription:
        "El PPM bruto y el PPM neto no son lo mismo. Aquí tienes qué es el PPM neto, cómo se calcula y por qué es el único número que les importa a los empleadores.",
    },
    "how-to-pass-typing-test-job-interview": {
      title:
        "Cómo superar un test de mecanografía en una entrevista de trabajo (lo que buscan de verdad los empleadores)",
      metaDescription:
        "Muchos empleadores usan pruebas de mecanografía en el proceso de selección. Esto es lo que miden, qué puntuaciones esperan y cómo prepararte para dar lo mejor de ti.",
    },
    "fastest-typists-in-history": {
      title:
        "Los 10 mecanógrafos más rápidos de la historia (y qué puedes aprender de ellos)",
      metaDescription:
        "Desde récords de máquina de escribir en 1946 hasta campeones modernos del teclado: los 10 mecanógrafos más rápidos de la historia y qué los hizo excepcionales.",
    },
    "typing-speed-percentile-chart": {
      title:
        "Tabla de percentiles de mecanografía: ¿estás en el 10% superior?",
      metaDescription:
        "¿En qué puesto global está tu velocidad de mecanografía? Usa esta tabla completa de percentiles para ver exactamente cómo te comparas con otros mecanógrafos.",
    },
    "how-long-to-learn-touch-typing": {
      title:
        "¿Cuánto tiempo se tarda en aprender mecanografía al tacto? (Cronograma realista)",
      metaDescription:
        "¿Te preguntas cuánto tarda en aprenderse la mecanografía al tacto? Aquí tienes un cronograma honesto y realista - desde principiante total hasta velocidad profesional - basado en la práctica diaria.",
    },
    "typing-speed-for-data-entry-jobs": {
      title:
        "¿Qué velocidad de mecanografía necesitas para trabajos de entrada de datos? (Requisitos 2026)",
      metaDescription:
        "Los trabajos de entrada de datos exigen un PPM concreto. Qué esperan los empleadores en 2026, cómo prepararte y cómo un certificado refuerza tu candidatura.",
    },
    "how-to-put-typing-speed-on-resume": {
      title:
        "Cómo poner la velocidad de mecanografía en el currículum (con ejemplos)",
      metaDescription:
        "¿Debes incluir la velocidad de mecanografía en tu CV? Sí — si lo haces bien. Cómo redactarla, dónde ponerla y cómo un certificado la hace creíble.",
    },
    "get-paid-to-type-work-from-home-2026": {
      title:
        "Gana dinero escribiendo: 9 trabajos de mecanografía en casa serios en 2026",
      metaDescription:
        "¿De verdad puedes cobrar por escribir desde casa? Sí — aquí tienes 9 trabajos remotos legítimos en 2026 con sueldos reales y cómo empezar.",
    },
    "typing-speed-medical-transcription": {
      title:
        "Requisitos de velocidad en transcripción médica: lo que debes saber",
      metaDescription:
        "La transcripción médica exige velocidad y precisión concretas. Qué necesitas en 2026 y cómo prepararte para esta carrera.",
    },
    "40-to-70-wpm-plan": {
      title:
        "La forma más rápida de pasar de 40 a 70 PPM (plan de 7 semanas)",
      metaDescription:
        "¿Quieres subir de 40 a 70 PPM? Aquí tienes un plan semana a semana con tiempos de práctica diarios y hitos claros.",
    },
    "typing-speed-customer-service": {
      title:
        "Velocidad de mecanografía para atención al cliente: ¿cuánto necesitas?",
      metaDescription:
        "¿Buscas trabajo en atención al cliente? Aquí tienes la velocidad exacta para chat en vivo, soporte por email y otros puestos en 2026.",
    },
    "legal-typist-vs-court-reporter": {
      title:
        "Mecanógrafo jurídico vs taquígrafo judicial: ¿cuál paga más?",
      metaDescription:
        "Los mecanógrafos jurídicos y los taquígrafos judiciales trabajan con los registros legales — pero difieren en sueldo, formación y requisitos de velocidad de escritura.",
    },
    "is-typing-certificate-worth-it": {
      title:
        "¿Vale la pena un certificado de mecanografía? Esto es lo que dicen los empleadores",
      metaDescription:
        "¿Merece la pena obtener un certificado de mecanografía? Analizamos qué dicen los empleadores, qué sectores lo valoran más y cómo utilizarlo de forma efectiva.",
    },
    "best-typing-test-sites-comparison": {
      title:
        "Probé 5 sitios de test de mecanografía — esto es lo que encontré (reseña honesta)",
      metaDescription:
        "Probé 5 de los sitios de test de mecanografía más populares en 2026. Comparativa honesta de características, precisión y cuál merece realmente tu tiempo.",
    },
    "can-ai-make-you-a-better-typist": {
      title:
        "¿Puede la IA hacerte mejor mecanógrafo? Lo probamos para que no tengas que hacerlo",
      metaDescription:
        "Las herramientas de IA prometen mejorar todo — pero ¿realmente pueden hacerte escribir más rápido? Probamos las herramientas de mecanografía asistidas por IA y compartimos los resultados.",
    },
    "what-100-wpm-feels-like": {
      title:
        "Cómo se siente realmente escribir a 100 PPM — y cómo lograrlo",
      metaDescription:
        "Escribir a 100 PPM es un hito que la mayoría nunca alcanza — pero es más alcanzable de lo que parece. Así se siente y el camino exacto para lograrlo.",
    },
    "phone-typing-vs-keyboard": {
      title:
        "Escribir en el teléfono vs. teclado: ¿cuál te hace más rápido?",
      metaDescription:
        "Escritura en teléfono vs teclado — ¿cuál es realmente más rápida? Comparamos velocidades medias, precisión y productividad para descubrir qué método gana en 2026.",
    },
    "best-keyboards-for-typing-speed-2026": {
      title:
        "Los mejores teclados para velocidad de escritura en 2026 (probados y clasificados)",
      metaDescription:
        "¿Tu teclado afecta tu velocidad de escritura? Sí — significativamente. Aquí están los mejores teclados para escribir rápido en 2026, clasificados por rendimiento y valor.",
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
      title: "5 Tippgewohnheiten, die Sie heimlich bremsen",
      metaDescription:
        "Vielleicht üben Sie falsch. Diese 5 häufigen Tippgewohnheiten schränken Ihre Geschwindigkeit und Genauigkeit still ein — und die meisten Schreibkräfte wissen nicht einmal, dass sie sie haben.",
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
    "what-is-net-wpm": {
      title: "Was ist Netto-WPM? Die Tippmetrik, die wirklich zählt",
      metaDescription:
        "Brutto-WPM und Netto-WPM sind nicht dasselbe. Hier erfahren Sie, was Netto-WPM ist, wie es berechnet wird und warum Arbeitgeber genau auf diese Zahl achten.",
    },
    "how-to-pass-typing-test-job-interview": {
      title:
        "So bestehen Sie den Tipp-Test im Vorstellungsgespräch (worauf Arbeitgeber wirklich achten)",
      metaDescription:
        "Viele Arbeitgeber nutzen Tipp-Tests in der Einstellung. Hier erfahren Sie, was gemessen wird, welche Werte erwartet werden und wie Sie sich optimal vorbereiten.",
    },
    "fastest-typists-in-history": {
      title:
        "Die 10 schnellsten Tipper der Geschichte (und was Sie von ihnen lernen können)",
      metaDescription:
        "Von Schreibmaschinenrekorden 1946 bis zu modernen Tastatur-Champions: die 10 schnellsten Tipper der Geschichte und was sie auszeichnete.",
    },
    "typing-speed-percentile-chart": {
      title:
        "Tippgeschwindigkeit-Perzentil-Tabelle: Sind Sie in den Top 10 %?",
      metaDescription:
        "Wo steht Ihre Tippgeschwindigkeit weltweit? Nutzen Sie diese vollständige Tippgeschwindigkeit-Perzentil-Tabelle, um genau zu sehen, wie Sie im Vergleich zu anderen abschneiden.",
    },
    "how-long-to-learn-touch-typing": {
      title:
        "Wie lange dauert es, Touch-Typing zu lernen? (Realistische Zeitleiste)",
      metaDescription:
        "Sie fragen sich, wie lange es dauert, Touch-Typing zu lernen? Hier ist eine ehrliche, realistische Zeitleiste - vom absoluten Anfang bis zur professionellen Geschwindigkeit - basierend auf taeglicher Uebung.",
    },
    "typing-speed-for-data-entry-jobs": {
      title:
        "Welche Tippgeschwindigkeit brauchen Sie für Datenerfassungsjobs? (Anforderungen 2026)",
      metaDescription:
        "Datenerfassungsjobs haben konkrete WPM-Anforderungen. Das erwarten Arbeitgeber 2026, wie Sie sich vorbereiten und wie ein Zertifikat Ihre Bewerbung stärkt.",
    },
    "how-to-put-typing-speed-on-resume": {
      title:
        "So geben Sie die Tippgeschwindigkeit im Lebenslauf an (mit Beispielen)",
      metaDescription:
        "Sollten Sie die Tippgeschwindigkeit im Lebenslauf nennen? Ja — wenn Sie es richtig machen. Formulierung, Platzierung und Glaubwürdigkeit durch ein Zertifikat.",
    },
    "get-paid-to-type-work-from-home-2026": {
      title:
        "Geld fürs Tippen: 9 seriöse Heimarbeits-Jobs zum Tippen 2026",
      metaDescription:
        "Kann man wirklich von zu Hause fürs Tippen bezahlt werden? Ja — hier sind 9 legitime Remote-Jobs 2026 mit echten Sätzen und Einstiegstipps.",
    },
    "typing-speed-medical-transcription": {
      title:
        "Tippgeschwindigkeit in der medizinischen Transkription: Was Sie wissen müssen",
      metaDescription:
        "Medizinische Transkription stellt klare Anforderungen an Geschwindigkeit und Genauigkeit. Was 2026 zählt und wie Sie sich vorbereiten.",
    },
    "40-to-70-wpm-plan": {
      title:
        "Am schnellsten von 40 auf 70 WPM: 7-Wochen-Plan",
      metaDescription:
        "Von 40 auf 70 WPM? Hier ist ein strukturierter Wochenplan mit täglicher Übungszeit und klaren Meilensteinen.",
    },
    "typing-speed-customer-service": {
      title:
        "Tippgeschwindigkeit im Kundenservice: Wie schnell müssen Sie sein?",
      metaDescription:
        "Bewerben Sie sich auf eine Kundenservice-Stelle? Hier ist die genaue Tippgeschwindigkeit für Chat-Support, E-Mail-Support und andere Positionen 2026.",
    },
    "legal-typist-vs-court-reporter": {
      title:
        "Rechtlicher Schreiber vs. Gerichtsreporter: Wer verdient mehr?",
      metaDescription:
        "Rechtliche Schreiber und Gerichtsreporter arbeiten beide mit juristischen Protokollen — unterscheiden sich jedoch erheblich in Gehalt, Ausbildung und Tippanforderungen.",
    },
    "is-typing-certificate-worth-it": {
      title:
        "Lohnt sich ein Tipp-Zertifikat? Das sagen Arbeitgeber wirklich",
      metaDescription:
        "Lohnt es sich wirklich, ein Tipp-Zertifikat zu erwerben? Wir schauen, was Arbeitgeber sagen, welche Branchen es am meisten schätzen und wie man es effektiv einsetzt.",
    },
    "best-typing-test-sites-comparison": {
      title:
        "Ich habe 5 Tipp-Test-Seiten ausprobiert — das habe ich herausgefunden (ehrlicher Test)",
      metaDescription:
        "Ich habe 5 der beliebtesten Tipp-Test-Seiten in 2026 getestet. Ehrlicher Vergleich von Funktionen, Genauigkeit und welche Seite wirklich Ihre Zeit wert ist.",
    },
    "can-ai-make-you-a-better-typist": {
      title:
        "Kann KI Sie zu einem besseren Schreibkraft machen? Wir haben es getestet, damit Sie es nicht müssen",
      metaDescription:
        "KI-Tools versprechen, alles zu verbessern — aber können sie Sie wirklich schneller tippen lassen? Wir haben KI-gestützte Tipp-Tools getestet und teilen die Ergebnisse.",
    },
    "what-100-wpm-feels-like": {
      title:
        "Wie sich 100 WPM wirklich anfühlen — und wie Sie dorthin gelangen",
      metaDescription:
        "100 WPM zu tippen ist ein Meilenstein, den die meisten nie erreichen — aber er ist erreichbarer als es klingt. So fühlt es sich an und der genaue Weg dorthin.",
    },
    "phone-typing-vs-keyboard": {
      title:
        "Tippen auf dem Handy vs. Tastatur: Was macht Sie schneller?",
      metaDescription:
        "Handy-Tippen vs. Tastatur-Tippen — was ist wirklich schneller? Wir vergleichen durchschnittliche Geschwindigkeiten, Genauigkeit und Produktivität, um herauszufinden, welche Methode 2026 gewinnt.",
    },
    "best-keyboards-for-typing-speed-2026": {
      title:
        "Die besten Tastaturen für Tippgeschwindigkeit 2026 (getestet und bewertet)",
      metaDescription:
        "Beeinflusst Ihre Tastatur Ihre Tippgeschwindigkeit? Ja — erheblich. Hier sind die besten Tastaturen für schnelles Tippen 2026, bewertet nach Leistung und Preis-Leistung.",
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
      title: "5 hábitos de digitação que o estão a abrandar secretamente",
      metaDescription:
        "Pode estar a praticar de forma errada. Estes 5 hábitos comuns de digitação estão a limitar silenciosamente a sua velocidade e precisão — e a maioria dos digitadores nem sequer sabe que os tem.",
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
    "what-is-net-wpm": {
      title: "O que é WPM líquido? A métrica de digitação que realmente importa",
      metaDescription:
        "WPM bruto e WPM líquido não são a mesma coisa. Veja o que é WPM líquido, como é calculado e por que é o único número que os empregadores realmente consideram.",
    },
    "how-to-pass-typing-test-job-interview": {
      title:
        "Como passar num teste de digitação numa entrevista de emprego (o que os empregadores realmente avaliam)",
      metaDescription:
        "Muitos empregadores usam testes de digitação na contratação. Saiba o que medem, que pontuações esperam e como se preparar para o seu melhor desempenho.",
    },
    "fastest-typists-in-history": {
      title:
        "Os 10 digitadores mais rápidos da história (e o que pode aprender com eles)",
      metaDescription:
        "Dos recordes de máquina de escrever em 1946 aos campeões modernos de velocidade no teclado: os 10 digitadores mais rápidos da história e o que os tornou excecionais.",
    },
    "typing-speed-percentile-chart": {
      title: "Tabela de percentis de velocidade de digitação: você está no top 10%?",
      metaDescription:
        "Onde a sua velocidade de digitação se posiciona globalmente? Use esta tabela completa de percentis para ver exatamente como se compara com outros digitadores.",
    },
    "how-long-to-learn-touch-typing": {
      title:
        "Quanto tempo demora para aprender digitacao ao toque? (Cronograma realista)",
      metaDescription:
        "Quer saber quanto tempo leva para aprender digitacao ao toque? Aqui esta um cronograma honesto e realista - do iniciante total a velocidade profissional - com base na pratica diaria.",
    },
    "typing-speed-for-data-entry-jobs": {
      title:
        "Que velocidade de digitação precisa para empregos de introdução de dados? (Requisitos 2026)",
      metaDescription:
        "Empregos de introdução de dados exigem PPM específicos. O que os empregadores esperam em 2026, como se preparar e como um certificado fortalece a sua candidatura.",
    },
    "how-to-put-typing-speed-on-resume": {
      title:
        "Como colocar a velocidade de digitação no currículo (com exemplos)",
      metaDescription:
        "Deve incluir a velocidade de digitação no currículo? Sim — se fizer certo. Como redigir, onde colocar e como um certificado torna a informação credível.",
    },
    "get-paid-to-type-work-from-home-2026": {
      title:
        "Ganhe a digitar: 9 trabalhos remotos sérios de digitação em 2026",
      metaDescription:
        "Dá mesmo para ganhar a digitar em casa? Sim — aqui estão 9 trabalhos remotos legítimos em 2026 com valores reais e como começar.",
    },
    "typing-speed-medical-transcription": {
      title:
        "Velocidade de digitação em transcrição médica: o que precisa de saber",
      metaDescription:
        "A transcrição médica exige velocidade e precisão específicas. O que precisa em 2026 e como se preparar para esta carreira.",
    },
    "40-to-70-wpm-plan": {
      title:
        "A forma mais rápida de passar de 40 a 70 PPM (plano de 7 semanas)",
      metaDescription:
        "Quer subir de 40 a 70 PPM? Eis um plano semana a semana com prática diária e marcos claros.",
    },
    "typing-speed-customer-service": {
      title:
        "Velocidade de digitação para atendimento ao cliente: o que precisa?",
      metaDescription:
        "A candidatar-se a um cargo de atendimento ao cliente? Eis a velocidade exacta para chat ao vivo, suporte por email e outros cargos em 2026.",
    },
    "legal-typist-vs-court-reporter": {
      title:
        "Dactilógrafo jurídico vs taquígrafo judicial: qual carreira paga mais?",
      metaDescription:
        "Os dactilógrafos jurídicos e os taquígrafos judiciais trabalham com registos legais — mas diferem significativamente em salário, formação e requisitos de digitação.",
    },
    "is-typing-certificate-worth-it": {
      title:
        "Vale a pena um certificado de digitação? Eis o que os empregadores dizem",
      metaDescription:
        "Vale mesmo a pena obter um certificado de digitação? Analisamos o que dizem os empregadores, quais os sectores que mais o valorizam e como utilizá-lo com eficácia.",
    },
    "best-typing-test-sites-comparison": {
      title:
        "Experimentei 5 sites de teste de digitação e eis o que encontrei (análise honesta)",
      metaDescription:
        "Testei 5 dos sites de teste de digitação mais populares em 2026. Comparação honesta de funcionalidades, precisão e qual deles realmente vale o seu tempo.",
    },
    "can-ai-make-you-a-better-typist": {
      title:
        "A IA pode torná-lo um melhor digitador? Testámos para que não tenha de o fazer",
      metaDescription:
        "As ferramentas de IA prometem melhorar tudo — mas podem realmente fazê-lo digitar mais rápido? Testámos ferramentas de digitação assistidas por IA e partilhamos os resultados.",
    },
    "what-100-wpm-feels-like": {
      title:
        "Como realmente se sente digitar a 100 PPM — e como lá chegar",
      metaDescription:
        "Digitar a 100 PPM é um marco que a maioria nunca alcança — mas é mais alcançável do que parece. Eis como se sente e o caminho exato para lá chegar.",
    },
    "phone-typing-vs-keyboard": {
      title:
        "Digitar no telemóvel vs. teclado: qual o torna mais rápido?",
      metaDescription:
        "Digitação no telemóvel vs teclado — qual é realmente mais rápida? Comparamos velocidades médias, precisão e produtividade para descobrir qual método vence em 2026.",
    },
    "best-keyboards-for-typing-speed-2026": {
      title:
        "Os melhores teclados para velocidade de digitação em 2026 (testados e classificados)",
      metaDescription:
        "O seu teclado afeta a sua velocidade de digitação? Sim — significativamente. Aqui estão os melhores teclados para digitar rápido em 2026, classificados por desempenho e valor.",
    },
  },
};
