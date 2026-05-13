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
            <strong key={`${key}-${i}`} className="font-extrabold text-text-strong dark:text-foreground">
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
    <div className="space-y-6">
      {blocks.map((block, idx) => {
        const key = `b-${idx}`;
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={key}
                className="tc-heading-lg mt-12 text-[clamp(1.75rem,3vw,2.25rem)] dark:text-foreground"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={key}
                className="tc-heading-md mt-9 dark:text-foreground"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={key} className="tc-body-lg">
                {renderInline(block.text, key)}
              </p>
            );
          case "ul":
            return (
              <ul key={key} className="tc-body-lg ml-5 list-disc space-y-2 marker:text-brand-blue">
                {block.items.map((item, i) => (
                  <li key={`${key}-${i}`}>{renderInline(item, `${key}-${i}`)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="tc-body-lg ml-5 list-decimal space-y-2 marker:text-brand-blue marker:font-semibold">
                {block.items.map((item, i) => (
                  <li key={`${key}-${i}`}>{renderInline(item, `${key}-${i}`)}</li>
                ))}
              </ol>
            );
          case "img":
            return (
              <figure key={key} className="my-8">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
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
                className="my-8 rounded-lg border-l-4 border-brand-blue bg-brand-blue-tint p-5 text-base font-semibold leading-relaxed text-brand-blue-deep dark:bg-accent dark:text-foreground"
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
