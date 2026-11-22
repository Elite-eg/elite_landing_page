/** 412 → "6:52" (Latin digits in both languages, shown LTR). */
export function formatDuration(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/** 412 → "PT6M52S", the machine-readable length for <time dateTime>. */
export function isoDuration(seconds: number): string {
  return `PT${Math.floor(seconds / 60)}M${seconds % 60}S`;
}
