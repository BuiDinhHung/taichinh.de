import type { Block } from "@/types/content";

export function blocksToMarkdown(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "h2":
          return `## ${b.text}`;
        case "h3":
          return `### ${b.text}`;
        case "p":
          return b.text;
        case "ul":
          return b.items.map((i) => `- ${i}`).join("\n");
        case "ol":
          return b.items.map((i, idx) => `${idx + 1}. ${i}`).join("\n");
        case "img":
          return `![${b.alt ?? ""}](${b.src})`;
        case "callout":
          return `> ${b.text}`;
      }
    })
    .join("\n\n");
}

// Tiny markdown → Block[] parser. Supports:
//   ## Heading 2
//   ### Heading 3
//   - bullet item
//   1. ordered item
//   ![alt](url) image
//   > callout
//   regular paragraphs
//   **bold** inline (rendered by ArticleBody)
export function parseMarkdown(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];

  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  function flushPara() {
    if (para.length) {
      blocks.push({ type: "p", text: para.join(" ").trim() });
      para = [];
    }
  }
  function flushList() {
    if (list) {
      blocks.push({ type: list.ordered ? "ol" : "ul", items: list.items });
      list = null;
    }
  }

  for (const raw of lines) {
    const line = raw.trim();

    if (line === "") {
      flushPara();
      flushList();
      continue;
    }

    const h2 = /^##\s+(.+)$/.exec(line);
    const h3 = /^###\s+(.+)$/.exec(line);
    const h1 = /^#\s+(.+)$/.exec(line); // treat H1 as H2
    const img = /^!\[(.*?)\]\((.+?)\)$/.exec(line);
    const ul = /^[-*]\s+(.+)$/.exec(line);
    const ol = /^\d+\.\s+(.+)$/.exec(line);
    const callout = /^>\s+(.+)$/.exec(line);

    if (h2 || h3 || h1 || img || callout) {
      flushPara();
      flushList();
      if (h2) blocks.push({ type: "h2", text: h2[1] });
      else if (h3) blocks.push({ type: "h3", text: h3[1] });
      else if (h1) blocks.push({ type: "h2", text: h1[1] });
      else if (img) blocks.push({ type: "img", src: img[2], alt: img[1] || undefined });
      else if (callout) blocks.push({ type: "callout", text: callout[1] });
      continue;
    }

    if (ul) {
      flushPara();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(ul[1]);
      continue;
    }
    if (ol) {
      flushPara();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(ol[1]);
      continue;
    }

    flushList();
    para.push(line);
  }

  flushPara();
  flushList();
  return blocks;
}
