/*
 * Tags for `t.rich` in home messages. Titles keep the Figma's line breaks from sm up; on phones they wrap on their
 * own (the messages put a space before every <br>, so words don't run together when the break is hidden).
 */

export const lineBreak = () => <br className="max-sm:hidden" />;

/** A break kept at every width (short centred labels). */
export const hardBreak = () => <br />;
