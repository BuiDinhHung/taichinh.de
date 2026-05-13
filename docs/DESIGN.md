# taichinh.de × DVAG — Design System

> **Hybrid clone:** Nội dung từ blog Hashnode tại https://taichinh.de/ (38 trang) được áp dụng visual identity của DVAG.de — gold theme, DVAG Type font, skew & marker decorations.
> Tech stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · shadcn/ui · base-ui**

---

## 1. Design Tokens

Tất cả token định nghĩa trong `:root` (light) và `.dark` (dark) của `src/app/globals.css`. Expose qua Tailwind v4 (`@theme inline`) — gọi bằng utility class `bg-brand-gold`, `text-text-strong`, v.v.

### 1.1 Colors — Light mode

#### Brand gold (DVAG signature, primary brand)

| Token | Hex | Vai trò |
|---|---|---|
| `--brand-gold` | `#c8aa22` | CTA chính, link nhấn, panel hero, divider |
| `--brand-gold-dark` | `#a0881b` | Button hover / pressed |
| `--brand-gold-darker` | `#786614` | Text gold đậm trên nền sáng (button outline, footer link) |
| `--brand-gold-deepest` | `#50440d` | Border đậm, text trên nền vàng nhạt |
| `--brand-gold-tint` | `#f9f6e9` | Background hover button outline, dropdown active |
| `--brand-gold-tint-2` | `#f4eed2` | Marker highlight, callout border accent |

#### Brand red

| Token | Hex |
|---|---|
| `--brand-red` | `#9d2235` |
| `--brand-red-tint` | `#f5e9eb` |

#### Brand blue

| Token | Hex |
|---|---|
| `--brand-blue-deep` | `#004663` |
| `--brand-blue` | `#00587c` |
| `--brand-blue-tint` | `#e6eef2` |

#### Greys / Surfaces / Text

| Token | Hex | Vai trò |
|---|---|---|
| `--text-strong` | `#333333` | Headings + text quan trọng |
| `--text-default` | `#4d4d4d` | Body text mặc định |
| `--text-muted` | `#666666` | Caption, date, secondary |
| `--text-subtle` | `#999999` | Disabled, tertiary |
| `--surface` | `#ffffff` | Background mặc định |
| `--surface-soft` | `#f2f2f2` | Footer, alt section |
| `--border-default` | `#d9d9d9` | Border viền card |
| `--divider` | `#e6e6e6` | Footer dividers |

#### shadcn-mapped tokens (cho tương thích với primitives)

| Token | Mapped to |
|---|---|
| `--primary` | `#c8aa22` (gold) |
| `--primary-foreground` | white |
| `--accent` | `#f9f6e9` (gold-tint) |
| `--accent-foreground` | `#50440d` (gold-deepest) |
| `--ring` | gold |

### 1.2 Colors — Dark mode

| Token | Light | Dark |
|---|---|---|
| `--background` | white | `#1a1a1a` |
| `--foreground` | `#4d4d4d` | `#e6e6e6` |
| `--surface-soft` | `#f2f2f2` | `#232323` |
| `--card` | white | `#232323` |
| `--primary` | `#c8aa22` | `#d4ba3d` (lightened gold) |
| `--primary-hover` | `#a0881b` | `#c8aa22` |
| `--accent` | `#f9f6e9` | `#2f2a18` (gold-tinted dark) |
| `--accent-foreground` | `#50440d` | `#f4eed2` |
| `--border` | `#d9d9d9` | `#333333` |
| Marker highlight bg | `#f4eed2` | `rgba(212, 186, 61, 0.25)` |

Dark mode toggle qua class `.dark` trên `<html>` (Header `useState(isDark)` + useEffect).

---

### 1.3 Typography

#### Font face — DVAG Type (proprietary, self-hosted)

- **Family:** `dvag-type` (DVAG Type, copy từ DVAG project sang `public/fonts/`)
- **Files (12 tổng):** woff2 + woff fallback cho mỗi weight × style:
  - `DVAGType_W_Lt` 300 + italic
  - `DVAGType_W_Rg` 400 + italic
  - `DVAGType_W_Bd` 700 + italic
- **Loaded via:** `next/font/local` ở `src/app/layout.tsx` với CSS variable `--font-dvag`
- **Fallback stack:** `dvag-type, "Helvetica Neue", Helvetica, Arial, sans-serif`

#### Scale

| Element | Mobile | Desktop | Weight | Line-height |
|---|---|---|---|---|
| H1 hero (article page) | 30px | 48px (`text-5xl`) | 700 | 1.15 |
| H2 section / article | 24px | 30px (`text-3xl`) | 700 | 1.15 |
| H3 article body | 20px | 24px (`text-2xl`) | 700 | 1.25 |
| H3 card | 18–20px | 18–20px | 700 | 1.3 |
| Body L (article paragraph) | 16px | 18px (`text-lg`) | 400 | ~1.5 |
| Body M | 14–16px | 14–16px | 400 | 1.45 |
| Caption / date / muted | 12–14px | 12–14px | 400 | 1.4 |
| Eyebrow / Series label | 14px (uppercase, tracking-wider) | 14px | 700 | 1 |
| Button / Nav item | 14px | 14px | 700 (DVAG bold) | 1 |
| Kbd ⌘K badge | 10px (mono) | 10px | 400 | 1 |

Letter-spacing: `-0.005em` trên headings (subtle tighten).

---

### 1.4 Spacing & Layout

| Token | Giá trị |
|---|---|
| `--container-max` | `1216px` (DVAG container) |
| `--header-height` | `72px` (DVAG height — bigger than Hashnode default 64) |
| Section padding (mobile) | `py-10` (40px) |
| Section padding (desktop) | `py-14` (56px) |
| Article body block spacing | `space-y-5` (20px) |
| Container side padding | `1.25rem` (mobile) → `2rem` (≥768px) |
| Card grid gap (x) | `gap-x-6` (24px) |
| Card grid gap (y) | `gap-y-10` (40px) |
| Card radius | `rounded-xl` (12px), `rounded-2xl` cho hero (16px) |
| Button radius | `rounded-md` (~6px) |
| Avatar / icon button | `rounded-full` |

#### Container utility (`.tc-container`)

```css
.tc-container {
  width: 100%;
  margin-inline: auto;
  padding-inline: 1.25rem;
  max-width: var(--container-max);
}
@media (min-width: 768px) {
  .tc-container { padding-inline: 2rem; }
}
```

---

### 1.5 DVAG signature decorations

#### Marker highlight (`.dvag-h-marker`)

Yellow underline phía sau text — DVAG chữ ký highlight bằng marker.

```css
.dvag-h-marker {
  background-image: linear-gradient(transparent 65%, var(--brand-gold-tint-2) 65%);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-inline: 0.05em;
}
```

Có sẵn để dùng selectively trong content (chưa auto-apply để tránh quá nhiễu).

#### Skew section divider (`.dvag-h-skew-top` / `.dvag-h-skew-bottom`)

Diagonal cắt góc — DVAG signature giữa các section màu khác nhau.

```css
.dvag-h-skew-top::before {
  content: ""; position: absolute; inset: 0 0 auto 0;
  height: clamp(20px, 3vw, 40px);
  background: inherit;
  clip-path: polygon(0 100%, 100% 0, 100% 100%);
  transform: translateY(-99%);
}
```

Có sẵn để áp dụng cho callout boxes / hero overlay nếu cần.

---

## 2. Components Inventory

### 2.1 Header (`src/components/Header.tsx`) — client

- **Role:** Sticky header **72px** (DVAG height), backdrop-blur, border-bottom, z-50
- **States:** `isDark`, `mobileOpen`, `openDropdown`
- **Side effects:** isDark → toggle `dark` class trên html; mobileOpen → lock body scroll
- **Composition (≥md):**
  - Logo: switch `logo-light.png` / `logo-dark.png` qua `dark:hidden` / `dark:block` (vẫn dùng taichinh.de logo, không thay DVAG logo)
  - Nav: 4 items (3 link + 1 dropdown "More") — **font-bold**, hover gold-darker text + gold-tint bg (DVAG style)
  - Search box: `h-9` với `bg-secondary/50` + ⌘K kbd
  - Theme toggle: sun/moon ghost button
  - **Write button: bg-brand-gold + text-white + bold** (DVAG CTA style, không còn blue)
- **Mobile:** burger → drawer fullscreen với `<details>` accordion

### 2.2 ArticleGrid (`src/components/ArticleGrid.tsx`) — client

- **Role:** Homepage grid 1/2/3 cột, "Load more" reveal full 23 bài
- **Card:** image 16:9 `rounded-xl`, hover `scale-[1.03]` 500ms; title hover → primary (gold)
- **Load more button:** `border-brand-gold + text-brand-gold-darker + hover:bg-brand-gold-tint` — DVAG outline button thay vì grey neutral

### 2.3 ArticleBody (`src/components/ArticleBody.tsx`) — server

Render `Block[]`:

| Block type | Render |
|---|---|
| `h2` | `text-2xl sm:text-3xl font-bold` |
| `h3` | `text-xl sm:text-2xl font-bold` |
| `p` | Body L với inline `**bold**` parsed → `<strong text-foreground font-semibold>` |
| `ul` | `list-disc marker:text-primary` (gold markers) |
| `ol` | `list-decimal marker:text-primary marker:font-semibold` |
| `img` | `<figure>` 16:9 + caption |
| **`callout`** | **`border-l-4 border-primary bg-brand-gold-tint p-5 text-brand-gold-deepest`** — DVAG-flavor callout (gold-tint bg với gold left border thay vì primary/5 generic) |

`renderInline` parse `**text**` → `<strong>` (chưa apply marker auto vì có thể quá noisy).

### 2.4 AuthorCard / Footer — server

- **AuthorCard:** card border + avatar 64px + bio + Facebook icon button (gold outline qua border-default + hover:bg-accent = gold-tint)
- **Footer:** `bg-surface-soft` (`#f2f2f2`), brand block + 7 links + bottom bar với Hashnode credit. Social icons gold-themed qua tokens.

### 2.5 Icons (`src/components/icons.tsx`)

10 icons — không thay đổi: Search, Pencil, Sun, Moon, Chevron(Down/Left), Menu, Close, Facebook, Rss, Hashnode. Tất cả `currentColor` để pickup color từ Tailwind class.

---

## 3. Page Routes

13 routes / 38 static pages (giống như clone trước, visual đã reskin):

```
src/app/
├ page.tsx                  → /                   (homepage)
├ archive/page.tsx          → /archive            (23 bài group by month)
├ recommendations/page.tsx  → /recommendations    (empty Hashnode page)
├ [slug]/page.tsx           → /<slug>             (23 article details, SSG)
├ page/[slug]/page.tsx      → /page/<slug>        (3 static: contact, gioi-thieu, impressum)
└ series/[slug]/page.tsx    → /series/<slug>      (7 series)
```

| Loại | Số trang |
|---|---|
| Homepage + archive + recommendations | 3 |
| Article detail (`[slug]`) | 23 |
| Static page (`page/[slug]`) | 3 |
| Series page (`series/[slug]`) | 7 |
| 404 | 2 |
| **Tổng** | **38 SSG pages** |

---

## 4. Content Architecture

Source of truth ở `src/lib/`:

| File | Nội dung |
|---|---|
| `content.ts` | `siteName`, `headerNav`, `articles[]` (23), `author`, `footerLinks`, `copyright` |
| `articles-content.ts` | `articleBodies: Record<slug, Block[]>` cho 23 bài |
| `static-pages.ts` | `staticPages` cho contact / gioi-thieu / impressum |
| `series.ts` | `seriesList[]` — 7 series với `articleSlugs[]` |

Block discriminated union ở `src/types/content.ts`: `h2 | h3 | p | ul | ol | img | callout`.

Series mapping (như cũ):

| Series | Tên | Số bài |
|---|---|---|
| consult | Tư vấn | 1 |
| invest | Đầu tư – Tiết kiệm | 4 |
| credit | Tín dụng | 2 |
| insurance | Bảo hiểm | 12 |
| bauspar | Quỹ xây dựng | 2 |
| energy | Năng lượng | 2 |
| partner | Đối tác | 0 (empty) |

---

## 5. Asset Inventory

### 5.1 Fonts (`public/fonts/`)

12 file DVAG Type (woff2 + woff fallback) — copy từ DVAG project:
- `DVAGType_W_Lt.woff2` (300)
- `DVAGType_W_LtIt.woff2` (300 italic)
- `DVAGType_W_Rg.woff2` (400)
- `DVAGType_W_It.woff2` (400 italic)
- `DVAGType_W_Bd.woff2` (700)
- `DVAGType_W_BdIt.woff2` (700 italic)

### 5.2 Images (`public/images/`)

13 file local — 2 logos taichinh.de + 11 hero của batch 1 articles.

### 5.3 Hashnode CDN (remote)

12 hero của batch 2 + tất cả inline images trong article bodies. `next.config.ts`:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "cdn.hashnode.com" },
  ],
}
```

---

## 6. Code Organization

```
src/
├ app/
│  ├ layout.tsx              ← DVAG Type localFont, lang="vi"
│  ├ globals.css             ← DVAG tokens (gold/red/blue/grey), dark mode, dvag-h-marker, dvag-h-skew-*
│  ├ page.tsx                ← homepage assembly
│  ├ archive/page.tsx
│  ├ recommendations/page.tsx
│  ├ [slug]/page.tsx         ← article detail (SSG 23)
│  ├ page/[slug]/page.tsx    ← static pages (SSG 3)
│  └ series/[slug]/page.tsx  ← series listing (SSG 7)
├ components/
│  ├ Header.tsx              ← client, DVAG-themed (gold hover, gold Write button)
│  ├ ArticleGrid.tsx         ← client, gold "Load more"
│  ├ ArticleBody.tsx         ← server, DVAG callout style
│  ├ AuthorCard.tsx
│  ├ Footer.tsx
│  ├ icons.tsx
│  └ ui/button.tsx           ← shadcn primitive (chưa dùng)
├ lib/
│  ├ utils.ts                ← cn()
│  ├ content.ts              ← nav + 23 article metadata + footer + author
│  ├ articles-content.ts     ← body của 23 bài
│  ├ static-pages.ts         ← 3 static page bodies
│  └ series.ts               ← 7 series với articleSlugs
└ types/
   └ content.ts              ← Block, Article, NavItem, Series interfaces

public/
├ fonts/                     ← 12 DVAG Type files
├ images/                    ← 13 image assets
└ ...
```

---

## 7. Build & Verify

```bash
npm install
npm run dev        # Next dev (Turbopack)
npm run build      # 38 static pages prerendered
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck + build
```

Hiện trạng: **38/38 static pages**, 0 errors, 0 warnings (chỉ `metadataBase` non-blocking).

---

## 8. Visual changes vs. Hashnode-style original

So sánh trước (Hashnode) và sau (DVAG-skinned):

| Khía cạnh | Trước (Hashnode) | Sau (DVAG visual) |
|---|---|---|
| Primary color | `#2962ff` (Hashnode blue) | `#c8aa22` (DVAG gold) |
| Font | Inter | DVAG Type (proprietary) |
| Header height | 64px | 72px |
| Container max | 1200px | 1216px |
| Nav font weight | medium | **bold** |
| Nav hover | grey accent | gold-tint bg + gold-darker text |
| Write button | blue filled | gold filled |
| Load more button | grey outline | gold outline |
| Article callout | blue-tint border + light blue bg | gold-tint bg + gold left-border (DVAG cài) |
| List markers | accent | gold (primary) |
| Title hover | blue | gold |
| Available decorations | (none) | `dvag-h-marker`, `dvag-h-skew-top/bottom` |

---

## 9. Known Gaps & TODO

1. **Skew decorations chưa apply** trên page-level — utilities có sẵn nhưng layout hiện chưa có section transitions cần skew. Có thể thêm trên hero (article page) nếu muốn DVAG hơn.
2. **Marker highlight chưa auto-apply** — utility `.dvag-h-marker` có sẵn nhưng renderInline trong ArticleBody chưa apply automatically vào `**bold**`. Bài taichinh.de có nhiều bold nên auto-apply sẽ noisy.
3. **Logo vẫn là taichinh.de wordmark** (logo-light.png / logo-dark.png) — không phải DVAG logo. Đây là intentional vì content vẫn là taichinh.de.
4. **Search palette chưa wire** — chỉ ⌘K kbd visual.
5. **`fingerhaus` body** là reconstruction (Vercel Security Checkpoint chặn fetch).
6. **`partner` series** rỗng — empty state.
7. **`/sitemap.xml` & `/rss.xml`** chưa generate — chỉ link placeholder.
8. **Visual QA chưa làm** — không có browser MCP để diff với DVAG.de hoặc taichinh.de live.
9. **Dark mode tokens** đã định nghĩa nhưng chưa visually verified — chuyển dark mode lần đầu có thể có chỗ low-contrast.
10. **Typography hierarchy** — DVAG typically dùng heavier weights và size lớn hơn cho hero. Hiện đang dùng default Tailwind sizes phù hợp với readable blog content. Có thể bump nếu muốn DVAG-rõ hơn.

---

## 10. Customization Guide

**Đổi từ DVAG visual sang khác:** edit `--brand-gold*` ở `globals.css` `:root` block.

**Đổi font:** thay font files trong `public/fonts/` và update `localFont({src: [...]})` trong `layout.tsx`.

**Apply marker highlight tự động cho mọi bold:** edit `renderInline` trong `ArticleBody.tsx`:

```tsx
return (
  <strong key={...} className="dvag-h-marker font-semibold text-foreground">
    {part.slice(2, -2)}
  </strong>
);
```

**Add skew section divider:** wrap section bằng `<div className="relative dvag-h-skew-top">...</div>` với background-color set trên div đó.

**Đổi tất cả bài về local images thay vì Hashnode CDN:** chạy lại `scripts/download-assets.mjs` (mở rộng array với inline image URLs từ `articles-content.ts`), sau đó replace `https://cdn.hashnode.com/...` URLs trong article bodies.

**Thêm bài/page/series:** giống như guide ở DVAG/docs/DESIGN.md — edit `content.ts`, `articles-content.ts`, `static-pages.ts`, `series.ts`.
