export function toPersianDate(date: Date) {
	const dateFormat = new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
		timeZone: "Asia/Tehran",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});

	return dateFormat.format(date);
}

export function toEnglishDate(date: Date) {
	const dateFormat = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});

	return dateFormat.format(date);
}
