/**
 * Injects a JSON-LD structured data block into the page.
 * Isolated into its own component to avoid TypeScript 5.9 TSX parser issues
 * with dangerouslySetInnerHTML inside larger page files.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
