import Image from "next/image";
import Link from "next/link";
import { author } from "@/lib/content";
import { FacebookIcon } from "@/components/icons";

export function AuthorCard() {
  return (
    <section className="border-t border-divider py-10 lg:py-14">
      <div className="tc-container">
        <div className="tc-card mx-auto max-w-2xl rounded-lg p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left sm:gap-5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-border">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-extrabold tracking-tight text-text-strong dark:text-foreground">{author.name}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{author.postCount} posts</p>
              <p className="mt-3 text-sm leading-relaxed text-text-default dark:text-foreground/80">{author.bio}</p>
              <div className="mt-4 flex items-center justify-center gap-2 sm:justify-start">
                <Link
                  href={author.facebook}
                  aria-label={`${author.name} trên Facebook`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                >
                  <FacebookIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
