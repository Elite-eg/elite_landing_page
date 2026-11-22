import type { LearnTopic } from "@/app/components/shared/learn/learnData";

export interface SearchableTopic {
  key: LearnTopic;
  name: string;
  articles: readonly { key: string; title: string }[];
}

/**
 * Lowercases and folds the spellings people mix up, so "الفاتوره" finds "الفاتورة": drops diacritics and hamza
 * marks (NFKD splits أ / إ / آ / ؤ / ئ into a base letter + mark), tatweel, and maps taa marbuta → haa,
 * alif maqsura → yaa. Latin accents go too.
 */
export function normalizeSearchText(text: string): string {
  return text
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\p{M}ـ]/gu, "")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/\s+/g, " ")
    .trim();
}

/** Arabic definite article "ال" at the start of a query word. */
const ARABIC_ARTICLE = /^ال/;

/**
 * Topics with the articles that match every word of the query (in the title or the topic's name). A topic whose
 * name matches keeps all its articles. An empty query returns everything. Query words drop a leading "ال" (when
 * at least three letters remain), so "الفاتورة" also finds "فاتورة مرفوضة".
 */
export function searchKnowledgeBase(topics: readonly SearchableTopic[], query: string): SearchableTopic[] {
  const words = normalizeSearchText(query)
    .split(" ")
    .filter(Boolean)
    .map((word) => (word.length >= 5 ? word.replace(ARABIC_ARTICLE, "") : word));
  if (words.length === 0) return [...topics];

  const matches = (text: string) => {
    const normalized = normalizeSearchText(text);
    return words.every((word) => normalized.includes(word));
  };

  return topics.flatMap((topic) => {
    if (matches(topic.name)) return [topic];
    const articles = topic.articles.filter((article) => matches(`${article.title} ${topic.name}`));
    return articles.length > 0 ? [{ ...topic, articles }] : [];
  });
}
