#!/usr/bin/env node
/**
 * Static checks for the hard rules in elite-design-rules.txt (MUST / NEVER items).
 * Run: npm run check:rules   (exit code 1 when a rule is broken)
 *
 * 1. Messages: ar/en have the same keys, valid ICU syntax and the same {arguments}.
 * 2. Every literal t("key") / t(`prefix.${x}`) used in code exists in the messages.
 * 3. Source rules: design-system colors only (palette shades that exist, no Tailwind defaults, no hex),
 *    logical (RTL-safe) utilities, locale-aware links,
 *    no console / any, no Arabic copy in components, routes from ROUTES, reduced-motion-safe loops,
 *    no undefined animate-* classes.
 * Keys passed as variables (t(item.labelKey)) can't be checked here: the smoke test catches those.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const require = createRequire(import.meta.url);
const read = (file) => readFileSync(join(ROOT, file), "utf8");
const problems = [];
const report = (rule, file, line, detail) => problems.push({ rule, file, line, detail });

/* ── Files ──────────────────────────────────────────────────────────── */

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    if (name === "node_modules" || name.startsWith(".")) return [];
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

/** Blanks out comments (same length, newlines kept) so prose like "left-to-right" isn't checked. */
const stripComments = (text) =>
  text
    .replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, " "))
    .replace(/(^|[^:"'`\\])(\/\/.*)$/gm, (_, before, comment) => before + " ".repeat(comment.length));

const sources = [...["app", "lib", "i18n"].flatMap((dir) => walk(join(ROOT, dir))), join(ROOT, "middleware.ts")]
  .filter((path) => /\.(ts|tsx)$/.test(path))
  .map((path) => ({ path: relative(ROOT, path).split(sep).join("/"), text: stripComments(readFileSync(path, "utf8")) }));

const lineOf = (text, index) => text.slice(0, index).split("\n").length;

/* ── 1. Messages ────────────────────────────────────────────────────── */

const LOCALES = ["ar", "en"];
const messages = Object.fromEntries(LOCALES.map((locale) => [locale, JSON.parse(read(`messages/${locale}.json`))]));
const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([key, value]) =>
    value && typeof value === "object" ? flatten(value, `${prefix}${key}.`) : [[`${prefix}${key}`, value]]
  );
const flat = Object.fromEntries(LOCALES.map((locale) => [locale, new Map(flatten(messages[locale]))]));

for (const locale of LOCALES) {
  for (const other of LOCALES.filter((l) => l !== locale)) {
    for (const key of flat[locale].keys()) {
      if (!flat[other].has(key)) report("i18n/parity", `messages/${other}.json`, 0, `missing "${key}" (exists in ${locale}.json)`);
    }
  }
}

let parseIcu = null;
try {
  // Transitive dependency of next-intl (use-intl → intl-messageformat): the same parser the site uses.
  parseIcu = require("@formatjs/icu-messageformat-parser").parse;
} catch {
  console.warn("! @formatjs/icu-messageformat-parser not found: ICU syntax check skipped");
}

/**
 * Argument names ({brand}, {count, plural, …}) including nested branches. Rich-text tags (<br>) are
 * formatting, so they may differ between languages and are not compared.
 */
function icuArguments(ast, names = new Set()) {
  for (const el of ast) {
    if (el.type >= 1 && el.type <= 6) names.add(el.value);
    if (el.type === 8) icuArguments(el.children, names);
    if (el.options) Object.values(el.options).forEach((option) => icuArguments(option.value, names));
  }
  return names;
}

if (parseIcu) {
  const namesByLocale = {};
  for (const locale of LOCALES) {
    namesByLocale[locale] = new Map();
    for (const [key, value] of flat[locale]) {
      if (typeof value !== "string") continue;
      try {
        namesByLocale[locale].set(key, [...icuArguments(parseIcu(value))].sort().join(" "));
      } catch (error) {
        report("i18n/icu-syntax", `messages/${locale}.json`, 0, `"${key}": ${error.message}`);
      }
    }
  }
  for (const [key, names] of namesByLocale.ar) {
    const enNames = namesByLocale.en.get(key);
    if (enNames !== undefined && enNames !== names) {
      report("i18n/arguments", "messages/*.json", 0, `"${key}" uses [${names}] in ar but [${enNames}] in en`);
    }
  }
}

/* ── 2. Translation keys used in code ───────────────────────────────── */

const leafKeys = [...flat.en.keys()];
const escapeRe = (s) => s.replace(/[.*+?^()|[\]\\{}$]/g, "\\$&");

for (const { path, text } of sources) {
  const translators = new Map();
  const declaration =
    /const\s+(\w+)\s*=\s*(?:await\s+)?(?:useTranslations|getTranslations)\(\s*(?:(["'`])([^"'`]*)\2|\{[^}]*namespace:\s*(["'`])([^"'`]*)\4[^}]*\})?\s*\)/g;
  for (const m of text.matchAll(declaration)) translators.set(m[1], m[3] ?? m[5] ?? "");

  for (const [name, namespace] of translators) {
    const call = new RegExp(`\\b${name}(?:\\.rich|\\.markup|\\.raw|\\.has)?\\(\\s*(["'\`])((?:(?!\\1).)*)\\1`, "g");
    for (const m of text.matchAll(call)) {
      const key = namespace ? `${namespace}.${m[2]}` : m[2];
      const line = lineOf(text, m.index);
      if (key.includes("${")) {
        // Dynamic: `items.${key}.title` → at least one message must match items.<x>.title
        const pattern = new RegExp(`^${escapeRe(key).replace(/\\\$\\\{[^}]*\\\}/g, "[^.]+")}$`);
        if (!leafKeys.some((k) => pattern.test(k)) && !leafKeys.some((k) => k.startsWith(key.split("${")[0]))) {
          report("i18n/missing-key", path, line, `no message matches \`${key}\``);
        }
      } else if (namespace.includes("${")) {
        continue; // namespace itself is dynamic (e.g. guides.${guide}); covered by the call above when literal
      } else {
        for (const locale of LOCALES) {
          if (!flat[locale].has(key)) report("i18n/missing-key", path, line, `"${key}" not in ${locale}.json`);
        }
      }
    }
  }
}

/* ── 3. Source rules ────────────────────────────────────────────────── */

const isComponent = (path) => /^app\/.*\/(components\/.*|page|layout|not-found)\.tsx$/.test(path);

/** Files allowed to contain hex colors, each for a stated reason. */
const HEX_ALLOWED = new Set([
  // Third-party brand marks use their official colors.
  "app/components/shared/footer/FooterSocialLinks.tsx",
  "app/components/shared/footer/GooglePlayLogo.tsx",
  // viewport.themeColor needs a literal value.
  "app/[locale]/layout.tsx",
  // Jobs apply modal keeps its original backdrop color (owner decision).
  "app/[locale]/jobs/components/JobApplyModal.tsx",
]);

const RULES = [
  {
    id: "color/default-palette",
    re: /\b(?:bg|text|border|from|via|to|ring|fill|stroke|outline|divide|shadow|decoration|caret|placeholder)-(?:slate|gray|zinc|neutral|stone|red|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
    hint: "Tailwind default palette: use a design-system color (tailwind.config.js)",
  },
  {
    id: "color/hex",
    re: /\[#[0-9a-fA-F]{3,8}\]|(?<![\w&])#[0-9a-fA-F]{6}\b/g,
    hint: "hex color in code: add a token to globals.css + tailwind.config.js",
    skip: (path) => HEX_ALLOWED.has(path),
  },
  {
    id: "rtl/physical",
    re: /(?<![\w-])-?(?:ml|mr|pl|pr|left|right)-[\w[\]./]+|(?<![\w-])(?:text-(?:left|right)|float-(?:left|right)|rounded-(?:l|r|tl|tr|bl|br)(?:-[\w[\]]+)?|border-(?:l|r)(?:-[\w[\]]+)?)(?![\w-])/g,
    hint: "physical direction: use ms/me, ps/pe, start/end, text-start/end, rounded-s/e, border-s/e",
    skip: (path) => !path.endsWith(".tsx"),
  },
  {
    id: "i18n/next-link",
    re: /from\s+["']next\/link["']/g,
    hint: "import Link from @/i18n/navigation (locale-aware)",
  },
  {
    id: "i18n/next-navigation",
    re: /import\s*\{[^}]*\b(?:useRouter|usePathname|redirect)\b[^}]*\}\s*from\s*["']next\/navigation["']/g,
    hint: "use useRouter / usePathname / redirect from @/i18n/navigation",
  },
  {
    id: "code/console",
    re: /\bconsole\.(?:log|info|warn|error|debug)\(/g,
    hint: "use log from app/services/logger",
    skip: (path) => path === "app/services/logger.ts",
  },
  {
    id: "code/any",
    re: /:\s*any\b|\bas\s+any\b|<any>/g,
    hint: "no any: type it",
  },
  {
    id: "i18n/hardcoded-arabic",
    re: /[؀-ۿ]+/g,
    hint: "Arabic copy in a component: move it to messages/ar.json (+ en.json)",
    skip: (path) => !isComponent(path),
  },
  {
    id: "routes/hardcoded-href",
    re: /\bhref=["']\/[^"']*["']/g,
    hint: "internal route literal: use ROUTES from lib/constants",
  },
  {
    id: "motion/reduced-motion",
    re: /(?<!motion-safe:)\banimate-(?:pulse|ping|bounce)\b/g,
    hint: "looping Tailwind animation: prefix with motion-safe:",
  },
];

for (const { path, text } of sources) {
  for (const rule of RULES) {
    if (rule.skip?.(path)) continue;
    for (const m of text.matchAll(rule.re)) {
      report(rule.id, path, lineOf(text, m.index), `"${m[0]}": ${rule.hint}`);
    }
  }
}

// Palette shades that are not in the design system (globals.css). A typo like navy-400 renders no color,
// and orange-200 silently falls back to Tailwind's default orange.
const PALETTE_SHADES = {
  navy: [50, 100, 200, 300, 500, 700, 900, 950],
  orange: [50, 500, 600],
  ink: [400, 700, 900],
  bareeq: [50, 200, 950],
};
const shadeRe =
  /(?<![\w-])(?:[\w-]+:)*(?:bg|text|border|from|via|to|ring|ring-offset|fill|stroke|outline|divide|shadow|decoration|caret|placeholder)-(navy|orange|ink|bareeq)-(\d{2,3})\b/g;
for (const { path, text } of sources) {
  for (const m of text.matchAll(shadeRe)) {
    if (!PALETTE_SHADES[m[1]].includes(Number(m[2]))) {
      report("color/unknown-shade", path, lineOf(text, m.index), `"${m[0]}": ${m[1]} has shades ${PALETTE_SHADES[m[1]].join(", ")}`);
    }
  }
}

// Undefined animate-* classes (e.g. a typo'd animate-fadeIn silently does nothing).
const tailwindConfig = require(join(ROOT, "tailwind.config.js"));
const knownAnimations = new Set([
  "none", "spin", "ping", "pulse", "bounce",
  ...Object.keys(tailwindConfig.theme?.extend?.animation ?? {}),
  ...[...read("app/globals.css").matchAll(/\.animate-([\w-]+)/g)].map((m) => m[1]),
]);
for (const { path, text } of sources.filter((s) => s.path.endsWith(".tsx"))) {
  for (const m of text.matchAll(/(?<![\w-])animate-([\w-]+)/g)) {
    if (!knownAnimations.has(m[1])) {
      report("css/unknown-animation", path, lineOf(text, m.index), `"animate-${m[1]}" is not defined (tailwind.config.js / globals.css)`);
    }
  }
}

/* ── Report ─────────────────────────────────────────────────────────── */

if (problems.length === 0) {
  console.log(`✓ check-rules: ${sources.length} source files and ${flat.en.size} message keys follow the rules`);
  process.exit(0);
}

const byRule = Map.groupBy(problems, (p) => p.rule);
for (const [rule, items] of byRule) {
  console.log(`\n✗ ${rule} (${items.length})`);
  for (const { file, line, detail } of items) console.log(`  ${file}${line ? `:${line}` : ""}  ${detail}`);
}
console.log(`\n${problems.length} problem(s). Rules: elite-design-rules.txt`);
process.exit(1);
