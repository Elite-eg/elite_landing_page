export interface JobTitleTextProps {
  /** Translated role title, e.g. "مهندس Backend أول (Senior Backend Engineer)". */
  title: string;
}

/** A trailing "(…)" part, e.g. the English name after an Arabic title. */
const TRAILING_PARENTHETICAL = /^(.*\S)\s+(\([^()]+\))$/;

/**
 * Role title with its trailing parenthetical isolated (<bdi>), so in Arabic the English name keeps its own
 * direction and its brackets stay on the right sides even when the title wraps inside them.
 */
export function JobTitleText({ title }: JobTitleTextProps) {
  const match = title.match(TRAILING_PARENTHETICAL);
  if (!match) return title;

  return (
    <>
      {match[1]} <bdi>{match[2]}</bdi>
    </>
  );
}
