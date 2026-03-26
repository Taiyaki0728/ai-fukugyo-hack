/**
 * Enhanced markdown-to-HTML renderer
 *
 * Converts markdown into semantic HTML with rich styling:
 * - H2/H3 get anchor IDs for TOC navigation
 * - Lists get proper nesting
 * - Bold text in specific patterns becomes callout boxes
 * - Numbered steps become visual step cards
 */

let headingCounter = 0;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u3000-\u9fff\uff00-\uffef]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+$/, "");
}

export function renderMarkdown(md: string): string {
  headingCounter = 0;

  const lines = md.split("\n");
  const html: string[] = [];
  let inList = false;
  let inOrderedList = false;
  let listBuffer: string[] = [];

  function flushList() {
    if (listBuffer.length > 0) {
      const tag = inOrderedList ? "ol" : "ul";
      const listClass = inOrderedList
        ? "my-4 space-y-2 pl-0 list-none counter-reset-step"
        : "my-4 space-y-1.5 pl-5 list-disc";

      html.push(`<${tag} class="${listClass}">`);
      listBuffer.forEach((item, idx) => {
        if (inOrderedList) {
          html.push(
            `<li class="flex gap-3 items-start">` +
              `<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">${idx + 1}</span>` +
              `<span class="pt-0.5">${inlineFormat(item)}</span></li>`
          );
        } else {
          html.push(`<li class="leading-relaxed">${inlineFormat(item)}</li>`);
        }
      });
      html.push(`</${tag}>`);
      listBuffer = [];
      inList = false;
      inOrderedList = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Headings
    const h2Match = line.match(/^## (.+)$/);
    if (h2Match) {
      flushList();
      const text = h2Match[1];
      const id = `heading-${headingCounter++}`;
      html.push(
        `<h2 id="${id}" class="mt-12 mb-4 text-xl font-extrabold text-neutral-900 border-l-4 border-emerald-500 pl-4 scroll-mt-20">${inlineFormat(text)}</h2>`
      );
      continue;
    }

    const h3Match = line.match(/^### (.+)$/);
    if (h3Match) {
      flushList();
      const text = h3Match[1];
      const id = `heading-${headingCounter++}`;
      html.push(
        `<h3 id="${id}" class="mt-8 mb-3 text-lg font-bold text-neutral-800 scroll-mt-20">${inlineFormat(text)}</h3>`
      );
      continue;
    }

    // Unordered list
    const ulMatch = line.match(/^- (.+)$/);
    if (ulMatch) {
      if (!inList || inOrderedList) {
        flushList();
        inList = true;
        inOrderedList = false;
      }
      listBuffer.push(ulMatch[1]);
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      if (!inList || !inOrderedList) {
        flushList();
        inList = true;
        inOrderedList = true;
      }
      listBuffer.push(olMatch[1]);
      continue;
    }

    // If we were in a list and hit a non-list line, flush
    if (inList && line.trim() !== "") {
      flushList();
    }

    // Empty line
    if (line.trim() === "") {
      if (inList) flushList();
      continue;
    }

    // Callout detection: lines that are entirely bold become callout boxes
    const calloutMatch = line.match(/^\*\*(.+?)\*\*$/);
    if (calloutMatch) {
      const text = calloutMatch[1];

      // Determine callout type by keyword
      let type: "tip" | "warning" | "point" = "point";
      if (/注意|NG|ダメ|危険|詐欺|失敗/.test(text)) type = "warning";
      else if (/コツ|ポイント|おすすめ|ヒント/.test(text)) type = "tip";

      const styles = {
        point: "border-emerald-300 bg-emerald-50/60",
        tip: "border-blue-300 bg-blue-50/60",
        warning: "border-amber-300 bg-amber-50/60",
      };
      const icons = {
        point:
          '<svg class="h-5 w-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        tip: '<svg class="h-5 w-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
        warning:
          '<svg class="h-5 w-5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>',
      };

      // Check if next lines (until next heading/empty) are content for this callout
      const contentLines: string[] = [];
      let j = i + 1;
      while (j < lines.length && lines[j].trim() !== "" && !lines[j].match(/^#{2,3} /)) {
        contentLines.push(lines[j]);
        j++;
      }

      if (contentLines.length > 0) {
        html.push(
          `<div class="my-5 flex gap-3 rounded-lg border-l-4 ${styles[type]} p-4">` +
            `${icons[type]}` +
            `<div><p class="font-bold text-neutral-800 text-sm">${inlineFormat(text)}</p>` +
            `<p class="mt-1 text-sm leading-relaxed text-neutral-600">${contentLines.map(l => inlineFormat(l)).join(" ")}</p>` +
            `</div></div>`
        );
        i = j - 1; // skip consumed lines
        continue;
      }

      // Standalone bold line as a callout header
      html.push(
        `<div class="my-5 flex gap-3 rounded-lg border-l-4 ${styles[type]} p-4">` +
          `${icons[type]}` +
          `<p class="font-bold text-neutral-800 text-sm">${inlineFormat(text)}</p>` +
          `</div>`
      );
      continue;
    }

    // Regular paragraph
    html.push(
      `<p class="my-4 text-base leading-[1.85] text-neutral-700">${inlineFormat(line)}</p>`
    );
  }

  flushList();
  return html.join("\n");
}

function inlineFormat(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-neutral-900">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      (_match, label: string, href: string) => {
        const isExternal = /^https?:\/\//.test(href) && !href.includes("ai-fukugyo-hack.com");
        const attrs = isExternal
          ? ` target="_blank" rel="noopener noreferrer"`
          : "";
        return `<a href="${href}" class="text-blue-600 underline decoration-blue-200 underline-offset-2 hover:decoration-blue-400"${attrs}>${label}</a>`;
      }
    )
    .replace(/`(.+?)`/g, '<code class="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-emerald-700">$1</code>');
}
