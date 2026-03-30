import type { AppLocale } from "@/i18n/routing";

const EN = [
  "A swift movement of the fingers ensures that words appear flawlessly on the screen. Programming is the process of creating a set of instructions that tell a computer how to perform a task. Typing fast and accurately is an essential skill for modern jobs.",
  "JavaScript is a high-level, often just-in-time compiled language that conforms to the ECMAScript standard. It has dynamic typing, prototype-based object-orientation, and first-class functions.",
  "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
  "Every single keystroke brings you closer to mastery. Consistent daily practice transforms conscious effort into effortless muscle memory. Keep your focus sharp and always trust your hands to find the right path.",
  "Water is the most common liquid on Earth. It covers about 71% of the Earth's surface. Safe drinking water is essential to humans and other lifeforms even though it provides no calories or organic nutrients.",
  "The Milky Way is the galaxy that includes our Solar System. The name describes the galaxy's appearance from Earth: a hazy band of light seen in the night sky formed from stars that cannot be individually distinguished by the naked eye.",
  "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It adds static type definitions to JavaScript, allowing developers to catch errors early.",
  "In computer science, a data structure is a data organization, management, and storage format that enables efficient access and modification. More precisely, a data structure is a collection of data values.",
  "Photography is the art, application and practice of creating durable images by recording light, either electronically by means of an image sensor, or chemically by means of a light-sensitive material.",
  "Artificial intelligence is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans. AI research has been defined as the field of study of intelligent agents.",
];

const FR = [
  "Un mouvement rapide des doigts assure que les mots apparaissent sans faute à l’écran. La programmation consiste à créer des instructions pour qu’un ordinateur accomplisse une tâche. La dactylographie rapide et précise est une compétence essentielle.",
  "JavaScript est un langage de haut niveau, souvent compilé à la volée, conforme à la norme ECMAScript. Il offre un typage dynamique, une orientation prototype et des fonctions de première classe.",
  "React facilite la création d’interfaces interactives. Concevez des vues simples pour chaque état ; React met à jour et rend les bons composants au bon moment.",
  "Chaque frappe vous rapproche de la maîtrise. Une pratique quotidienne transforme l’effort conscient en mémoire musculaire. Gardez votre concentration et faites confiance à vos mains.",
  "L’eau est le liquide le plus répandu sur Terre. Elle couvre environ 71 % de la surface. L’eau potable est vitale pour les humains, même sans calories ni nutriments organiques.",
  "La Voie lactée est la galaxie qui contient notre Système solaire. Son nom évoque la bande lumineuse laiteuse observée dans le ciel nocturne.",
  "TypeScript est un langage typé statiquement qui s’appuie sur JavaScript et améliore l’outillage à toute échelle. Il permet de repérer les erreurs plus tôt.",
  "En informatique, une structure de données organise des données pour permettre un accès et une modification efficaces. C’est une collection de valeurs structurées.",
  "La photographie est l’art de créer des images durables en capturant la lumière, par capteur ou par réaction chimique.",
  "L’intelligence artificielle est l’intelligence manifestée par des machines, par opposition à l’intelligence naturelle des organismes vivants.",
];

const ES = [
  "Un movimiento rápido de los dedos hace que las palabras aparezcan sin fallos en pantalla. La programación es crear instrucciones para que un ordenador ejecute una tarea. Escribir rápido y con precisión es esencial.",
  "JavaScript es un lenguaje de alto nivel, a menudo compilado en tiempo de ejecución, que cumple el estándar ECMAScript. Tiene tipado dinámico, orientación a prototipos y funciones de primera clase.",
  "React facilita crear interfaces interactivas. Diseña vistas simples para cada estado y React actualizará los componentes necesarios.",
  "Cada pulsación te acerca a la maestría. La práctica diaria convierte el esfuerzo en memoria muscular. Mantén la concentración y confía en tus manos.",
  "El agua es el líquido más común en la Tierra. Cubre alrededor del 71 % de la superficie. El agua potable es esencial para los humanos.",
  "La Vía Láctea es la galaxia que incluye nuestro Sistema Solar. Su nombre describe la banda lechosa en el cielo nocturno.",
  "TypeScript es un lenguaje de tipado estático basado en JavaScript que mejora las herramientas y ayuda a detectar errores antes.",
  "En informática, una estructura de datos organiza la información para facilitar el acceso y la modificación.",
  "La fotografía es el arte de crear imágenes duraderas capturando la luz con sensores o medios químicos.",
  "La inteligencia artificial es la inteligencia mostrada por máquinas, frente a la inteligencia natural de los seres vivos.",
];

const DE = [
  "Eine schnelle Fingerbewegung lässt Wörter fehlerfrei auf dem Bildschirm erscheinen. Programmieren heißt, Anweisungen zu erstellen, die ein Computer ausführt. Schnelles und genaues Tippen ist eine wichtige Fähigkeit.",
  "JavaScript ist eine Hochsprache, oft JIT-kompiliert, die dem ECMAScript-Standard entspricht. Sie bietet dynamische Typisierung, prototypbasierte Objektorientierung und First-Class-Funktionen.",
  "React erleichtert interaktive Benutzeroberflächen. Entwerfen Sie einfache Ansichten pro Zustand; React aktualisiert die passenden Komponenten.",
  "Jeder Tastendruck bringt Sie der Meisterschaft näher. Tägliches Üben verwandelt bewusste Anstrengung in Muskelgedächtnis. Bleiben Sie fokussiert und vertrauen Sie Ihren Händen.",
  "Wasser ist die häufigste Flüssigkeit auf der Erde. Es bedeckt etwa 71 % der Oberfläche. Trinkwasser ist lebenswichtig.",
  "Die Milchstraße ist die Galaxie mit unserem Sonnensystem. Ihr Name beschreibt das milchige Band am Nachthimmel.",
  "TypeScript ist eine streng typisierte Sprache auf JavaScript-Basis, die bessere Werkzeuge bietet und Fehler früher findet.",
  "In der Informatik strukturiert eine Datenorganisation Daten für effizienten Zugriff und Änderung.",
  "Fotografie ist die Kunst, dauerhafte Bilder durch Lichtaufzeichnung zu erzeugen.",
  "Künstliche Intelligenz ist von Maschinen gezeigte Intelligenz, im Gegensatz zu natürlicher Intelligenz.",
];

const PT = [
  "Um movimento rápido dos dedos faz as palavras aparecerem sem falhas no ecrã. Programar é criar instruções para que um computador execute uma tarefa. Digitar rápido e com precisão é essencial.",
  "JavaScript é uma linguagem de alto nível, muitas vezes compilada em tempo de execução, alinhada ao padrão ECMAScript. Tem tipagem dinâmica, orientação a protótipos e funções de primeira classe.",
  "React torna simples criar interfaces interativas. Desenhe vistas simples para cada estado e o React atualiza os componentes certos.",
  "Cada tecla aproxima-o da maestria. A prática diária transforma esforço em memória muscular. Mantenha o foco e confie nas mãos.",
  "A água é o líquido mais comum na Terra. Cobre cerca de 71 % da superfície. Água potável é essencial para os humanos.",
  "A Via Láctea é a galáxia que inclui o nosso Sistema Solar. O nome descreve a faixa leitosa no céu noturno.",
  "TypeScript é uma linguagem com tipagem estática sobre JavaScript, com melhor ferramentação e erros detetados mais cedo.",
  "Em ciência da computação, uma estrutura de dados organiza informação para acesso e modificação eficientes.",
  "A fotografia é a arte de criar imagens duráveis capturando luz, eletronicamente ou quimicamente.",
  "Inteligência artificial é a inteligência demonstrada por máquinas, em contraste com a inteligência natural.",
];

const BY_LOCALE: Record<AppLocale, string[]> = {
  en: EN,
  fr: FR,
  es: ES,
  de: DE,
  pt: PT,
};

export function getTypingTexts(locale: AppLocale): string[] {
  return BY_LOCALE[locale] ?? EN;
}

/** @deprecated Use getTypingTexts(locale) */
export const TYPING_TEXTS = EN;
