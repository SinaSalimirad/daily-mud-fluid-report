/**
 * Builds a "contains" pattern for LIKE/ILIKE: "bar" -> "%bar%".
 * The characters %, _ and \ have a special meaning in LIKE, so they are
 * escaped first; otherwise searching for "100%" would match every row.
 */

export function containsPattern(text: string) {
	const escaped = text.replace(/[\\%_]/g, "\\$&");

	return `%${escaped}%`;
}
