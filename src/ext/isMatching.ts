export function isMatching(ext: string, ignore: string[], maxLength: number | undefined): boolean {
	if (maxLength && ext.length > maxLength) {
		return false;
	}

	return !ignore.includes(ext);
}
