export function add(path: string, ext: string): string {
	const trim = ext.trim();

	if(trim.length === 0) {
		return path;
	}

	if(trim[0] !== '.') {
		return path + '.' + trim;
	}
	else {
		return path + ext;
	}
}
