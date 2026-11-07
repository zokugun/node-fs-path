import { calculateDepth } from './calculateDepth.js';

export function normalizeIgnore(option: string[] | undefined, depth: number | undefined): { depth: number | undefined; ignore: string[] } {
	if (!option) {
		return { depth, ignore: [] };
	}

	const ignore: string[] = [];

	depth ??= 1;

	for (let ext of option) {
		ext = ext.trim();

		if (ext.length === 0) {
			continue;
		}

		if (ext[0] !== '.') {
			ignore.push('.' + ext);
		}

		ignore.push(ext);

		depth = Math.max(depth, calculateDepth(ext));
	}

	return { depth, ignore };
}
