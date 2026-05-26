import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/routing";
import TypingGame from "@/components/TypingGame";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
    const { locale } = await params;

  const titles: Record<string, string> = {
        en: "Typing Game — Falling Words Challenge | Typingverified",
        fr: "Jeu de Frappe — Mots Tombants | Typingverified",
        es: "Juego de Escritura — Palabras Cayendo | Typingverified",
        de: "Tipp-Spiel — Fallende Wörter | Typingverified",
        pt: "Jogo de Digitação — Palavras Caindo | Typingverified",
  };

  const descriptions: Record<string, string> = {
        en: "Play the Typingverified typing game. Destroy falling words before they hit the bottom. Speed increases every 10 words — climb the leaderboard!",
        fr: "Jouez au jeu de frappe Typingverified. Détruisez les mots tombants avant qu'ils n'atteignent le bas. La vitesse augmente toutes les 10 mots !",
        es: "Juega al juego de escritura de Typingverified. Destruye palabras cayentes antes de que lleguen abajo. Â¡La velocidad aumenta cada 10 palabras!",
        de: "Spiele das Typingverified-Tippspiel. Zerstöre fallende Wörter bevor sie den Boden erreichen. Die Geschwindigkeit steigt alle 10 Wörter!",
        pt: "Jogue o jogo de digitação Typingverified. Destrua palavras caindo antes de chegarem ao fundo. A velocidade aumenta a cada 10 palavras!",
  };

  const basePath = locale === "en" ? "" : `/${locale}`;

  return {
        title: titles[locale] ?? titles.en,
        description: descriptions[locale] ?? descriptions.en,
        alternates: {
                canonical: `https://www.typingverified.com${basePath}/game`,
                languages: {
                          'x-default': 'https://www.typingverified.com/game',
                          en: "https://www.typingverified.com/game",
                          fr: "https://www.typingverified.com/fr/game",
                          es: "https://www.typingverified.com/es/game",
                          de: "https://www.typingverified.com/de/game",
                          pt: "https://www.typingverified.com/pt/game",
                },
        },
        robots: { index: true, follow: true },
  };
}

export default function GamePage() {
    return <TypingGame />;
}
