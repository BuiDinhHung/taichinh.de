import Image from "next/image";
import type { Block } from "@/types/content";

function renderInline(text: string, key: string) {
  // Split on **bold** markers
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (/^\*\*[^*]+\*\*$/.test(part)) {
          return (
            <strong key={`${key}-${i}`} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={`${key}-${i}`}>{part}</span>;
      })}
    </>
  );
}

export function ArticleBody({
  blocks,
  unoptimizedImages = false,
}: {
  blocks: Block[];
  unoptimizedImages?: boolean;
}) {
  return (
    <div className="space-y-5">
      {blocks.map((block, idx) => {
        const key = `b-${idx}`;
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={key}
                className="mt-10 text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={key}
                className="mt-8 text-xl sm:text-2xl font-bold tracking-tight text-foreground"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={key} className="text-base sm:text-lg leading-relaxed text-foreground/85">
                {renderInline(block.text, key)}
              </p>
            );
          case "ul":
            return (
              <ul key={key} className="ml-5 list-disc space-y-2 text-base sm:text-lg leading-relaxed text-foreground/85 marker:text-primary">
                {block.items.map((item, i) => (
                  <li key={`${key}-${i}`}>{renderInline(item, `${key}-${i}`)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="ml-5 list-decimal space-y-2 text-base sm:text-lg leading-relaxed text-foreground/85 marker:text-primary marker:font-semibold">
                {block.items.map((item, i) => (
                  <li key={`${key}-${i}`}>{renderInline(item, `${key}-${i}`)}</li>
                ))}
              </ol>
            );
          case "img":
            return (
              <figure key={key} className="my-8">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={block.src}
                    alt={block.alt ?? ""}
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover"
                    unoptimized={unoptimizedImages}
                  />
                </div>
                {block.alt && (
                  <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <div
                key={key}
                className="my-8 rounded-lg border-l-4 border-primary bg-brand-gold-tint p-5 text-base font-medium leading-relaxed text-brand-gold-deepest dark:text-foreground dark:bg-accent"
              >
                {renderInline(block.text, key)}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
